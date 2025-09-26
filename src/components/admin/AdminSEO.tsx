import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Save, Search, Globe, Image, Hash, Loader2 } from 'lucide-react';

interface PageSEO {
  id: string;
  page_slug: string;
  meta_title: string;
  meta_description: string;
  canonical_url: string;
  og_title: string;
  og_description: string;
  og_image: string;
  keywords: string[];
  is_active: boolean;
}

const AdminSEO = () => {
  const [seoData, setSeoData] = useState<PageSEO[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const { toast } = useToast();

  const pages = [
    { slug: 'home', name: 'Homepage', description: 'Main landing page' },
    { slug: 'scooters', name: 'Scooters', description: 'Product listing page' },
    { slug: 'technology', name: 'Technology', description: 'Technology features page' },
    { slug: 'gallery', name: 'Gallery', description: 'Image gallery page' },
    { slug: 'about', name: 'About', description: 'About us page' },
    { slug: 'contact', name: 'Contact', description: 'Contact information page' },
  ];

  useEffect(() => {
    fetchSEOData();
  }, []);

  const fetchSEOData = async () => {
    try {
      setLoading(true);
      const { data, error } = await (supabase as any)
        .from('page_seo')
        .select('*')
        .order('page_slug');

      if (error) throw error;
      setSeoData(data || []);
    } catch (error) {
      console.error('Error fetching SEO data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch SEO data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveSEO = async (pageSlug: string) => {
    const pageData = seoData.find(item => item.page_slug === pageSlug);
    if (!pageData) return;

    try {
      setSaving(pageSlug);
      const { error } = await (supabase as any)
        .from('page_seo')
        .upsert({
          page_slug: pageData.page_slug,
          meta_title: pageData.meta_title,
          meta_description: pageData.meta_description,
          canonical_url: pageData.canonical_url,
          og_title: pageData.og_title,
          og_description: pageData.og_description,
          og_image: pageData.og_image,
          keywords: pageData.keywords,
          is_active: pageData.is_active,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "SEO settings updated successfully",
      });
    } catch (error) {
      console.error('Error saving SEO data:', error);
      toast({
        title: "Error",
        description: "Failed to save SEO data",
        variant: "destructive",
      });
    } finally {
      setSaving(null);
    }
  };

  const updateSEO = (pageSlug: string, field: keyof PageSEO, value: any) => {
    setSeoData(prev => prev.map(item => 
      item.page_slug === pageSlug ? { ...item, [field]: value } : item
    ));
  };

  const addKeyword = (pageSlug: string, keyword: string) => {
    if (!keyword.trim()) return;
    
    const pageData = seoData.find(item => item.page_slug === pageSlug);
    if (!pageData) return;
    
    const newKeywords = [...(pageData.keywords || []), keyword.trim()];
    updateSEO(pageSlug, 'keywords', newKeywords);
  };

  const removeKeyword = (pageSlug: string, index: number) => {
    const pageData = seoData.find(item => item.page_slug === pageSlug);
    if (!pageData) return;
    
    const newKeywords = pageData.keywords.filter((_, i) => i !== index);
    updateSEO(pageSlug, 'keywords', newKeywords);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">SEO Management</h2>
        <p className="text-muted-foreground">Optimize your website for search engines</p>
      </div>

      <div className="space-y-6">
        {pages.map((page) => {
          const pageData = seoData.find(item => item.page_slug === page.slug) || {
            id: '',
            page_slug: page.slug,
            meta_title: '',
            meta_description: '',
            canonical_url: '',
            og_title: '',
            og_description: '',
            og_image: '',
            keywords: [],
            is_active: true,
          } as PageSEO;

          return (
            <Card key={page.slug} className="border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      {page.name}
                    </CardTitle>
                    <CardDescription>{page.description}</CardDescription>
                  </div>
                  <Button
                    onClick={() => saveSEO(page.slug)}
                    disabled={saving === page.slug}
                    className="flex items-center gap-2"
                  >
                    {saving === page.slug ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    Save
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Meta Tags */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    Meta Tags
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor={`title-${page.slug}`}>Meta Title</Label>
                      <Input
                        id={`title-${page.slug}`}
                        value={pageData.meta_title}
                        onChange={(e) => updateSEO(page.slug, 'meta_title', e.target.value)}
                        placeholder="Page title for search results"
                        maxLength={60}
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        {pageData.meta_title?.length || 0}/60 characters
                      </p>
                    </div>
                    <div>
                      <Label htmlFor={`description-${page.slug}`}>Meta Description</Label>
                      <Textarea
                        id={`description-${page.slug}`}
                        value={pageData.meta_description}
                        onChange={(e) => updateSEO(page.slug, 'meta_description', e.target.value)}
                        placeholder="Brief description for search results"
                        rows={3}
                        maxLength={160}
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        {pageData.meta_description?.length || 0}/160 characters
                      </p>
                    </div>
                    <div>
                      <Label htmlFor={`canonical-${page.slug}`}>Canonical URL</Label>
                      <Input
                        id={`canonical-${page.slug}`}
                        value={pageData.canonical_url}
                        onChange={(e) => updateSEO(page.slug, 'canonical_url', e.target.value)}
                        placeholder="https://evolutionev.com/page"
                      />
                    </div>
                  </div>
                </div>

                {/* Open Graph */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold flex items-center gap-2">
                    <Image className="w-4 h-4" />
                    Open Graph (Social Media)
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor={`og-title-${page.slug}`}>OG Title</Label>
                      <Input
                        id={`og-title-${page.slug}`}
                        value={pageData.og_title}
                        onChange={(e) => updateSEO(page.slug, 'og_title', e.target.value)}
                        placeholder="Title for social media shares"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`og-description-${page.slug}`}>OG Description</Label>
                      <Textarea
                        id={`og-description-${page.slug}`}
                        value={pageData.og_description}
                        onChange={(e) => updateSEO(page.slug, 'og_description', e.target.value)}
                        placeholder="Description for social media shares"
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`og-image-${page.slug}`}>OG Image URL</Label>
                      <Input
                        id={`og-image-${page.slug}`}
                        value={pageData.og_image}
                        onChange={(e) => updateSEO(page.slug, 'og_image', e.target.value)}
                        placeholder="https://evolutionev.com/image.jpg"
                      />
                    </div>
                  </div>
                </div>

                {/* Keywords */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold flex items-center gap-2">
                    <Hash className="w-4 h-4" />
                    Keywords
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {pageData.keywords?.map((keyword, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => removeKeyword(page.slug, index)}
                      >
                        {keyword} ×
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add keyword"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addKeyword(page.slug, (e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = '';
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={(e) => {
                        const input = e.currentTarget.parentElement?.querySelector('input') as HTMLInputElement;
                        if (input) {
                          addKeyword(page.slug, input.value);
                          input.value = '';
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AdminSEO;