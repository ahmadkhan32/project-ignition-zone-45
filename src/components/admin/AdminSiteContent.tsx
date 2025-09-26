import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Save, Plus, Trash2, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SiteContent {
  id: string;
  page_slug: string;
  section_key: string;
  content_type: string;
  content_value: string;
  meta_data: any;
  is_active: boolean;
  updated_at: string;
}

const AdminSiteContent = () => {
  const [content, setContent] = useState<SiteContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [selectedPage, setSelectedPage] = useState('home');
  const { toast } = useToast();

  const pages = [
    { value: 'home', label: 'Homepage' },
    { value: 'scooters', label: 'Scooters' },
    { value: 'technology', label: 'Technology' },
    { value: 'gallery', label: 'Gallery' },
    { value: 'about', label: 'About' },
    { value: 'contact', label: 'Contact' },
  ];

  const contentTypes = [
    { value: 'text', label: 'Text' },
    { value: 'html', label: 'HTML' },
    { value: 'image', label: 'Image URL' },
    { value: 'json', label: 'JSON Data' },
  ];

  useEffect(() => {
    fetchContent();
  }, [selectedPage]);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await (supabase as any)
        .from('site_content')
        .select('*')
        .eq('page_slug', selectedPage)
        .order('section_key');

      if (error) throw error;
      setContent(data || []);
    } catch (error) {
      console.error('Error fetching content:', error);
      toast({
        title: "Error",
        description: "Failed to fetch content",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async (item: SiteContent) => {
    try {
      setSaving(item.id);
      const { error } = await (supabase as any)
        .from('site_content')
        .upsert({
          id: item.id,
          page_slug: item.page_slug,
          section_key: item.section_key,
          content_type: item.content_type,
          content_value: item.content_value,
          is_active: item.is_active,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Content updated successfully",
      });
      
      // Refresh content
      fetchContent();
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Error",
        description: "Failed to save content",
        variant: "destructive",
      });
    } finally {
      setSaving(null);
    }
  };

  const addContent = async () => {
    const newContent: Partial<SiteContent> = {
      page_slug: selectedPage,
      section_key: `new_section_${Date.now()}`,
      content_type: 'text',
      content_value: '',
      is_active: true,
    };

    try {
      const { error } = await (supabase as any)
        .from('site_content')
        .insert(newContent);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "New content section added",
      });
      
      fetchContent();
    } catch (error) {
      console.error('Error adding content:', error);
      toast({
        title: "Error",
        description: "Failed to add content",
        variant: "destructive",
      });
    }
  };

  const deleteContent = async (id: string) => {
    try {
      const { error } = await (supabase as any)
        .from('site_content')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Content deleted successfully",
      });
      
      fetchContent();
    } catch (error) {
      console.error('Error deleting content:', error);
      toast({
        title: "Error",
        description: "Failed to delete content",
        variant: "destructive",
      });
    }
  };

  const updateContent = (id: string, field: keyof SiteContent, value: any) => {
    setContent(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Site Content Management</h2>
          <p className="text-muted-foreground">Manage dynamic content across your website</p>
        </div>
        <Button onClick={addContent} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Content
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Page Content</CardTitle>
              <CardDescription>Edit content for different pages</CardDescription>
            </div>
            <Select value={selectedPage} onValueChange={setSelectedPage}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pages.map((page) => (
                  <SelectItem key={page.value} value={page.value}>
                    {page.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {content.map((item) => (
              <Card key={item.id} className="border-l-4 border-l-primary">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-lg">{item.section_key}</CardTitle>
                      <Badge variant={item.is_active ? "default" : "secondary"}>
                        {item.is_active ? "Active" : "Inactive"}
                      </Badge>
                      <Badge variant="outline">{item.content_type}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateContent(item.id, 'is_active', !item.is_active)}
                      >
                        {item.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => saveContent(item)}
                        disabled={saving === item.id}
                      >
                        {saving === item.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteContent(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`section-${item.id}`}>Section Key</Label>
                      <Input
                        id={`section-${item.id}`}
                        value={item.section_key}
                        onChange={(e) => updateContent(item.id, 'section_key', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`type-${item.id}`}>Content Type</Label>
                      <Select
                        value={item.content_type}
                        onValueChange={(value) => updateContent(item.id, 'content_type', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {contentTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor={`content-${item.id}`}>Content</Label>
                    {item.content_type === 'text' ? (
                      <Textarea
                        id={`content-${item.id}`}
                        value={item.content_value}
                        onChange={(e) => updateContent(item.id, 'content_value', e.target.value)}
                        rows={3}
                      />
                    ) : (
                      <Textarea
                        id={`content-${item.id}`}
                        value={item.content_value}
                        onChange={(e) => updateContent(item.id, 'content_value', e.target.value)}
                        rows={item.content_type === 'html' ? 6 : 3}
                        className="font-mono text-sm"
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {content.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No content found for this page.</p>
                <Button onClick={addContent} className="mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Content Section
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSiteContent;