import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Star, MessageSquare } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar_url: string;
  rating: number;
  text: string;
  location: string;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
}

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const emptyTestimonial: Partial<Testimonial> = {
    name: '',
    role: '',
    company: '',
    avatar_url: '',
    rating: 5,
    text: '',
    location: '',
    is_featured: false,
    is_active: true,
    sort_order: 0,
  };

  useEffect(() => {
    fetchTestimonials();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('testimonials-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'testimonials' }, () => {
        fetchTestimonials();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast({
        title: "Error",
        description: "Failed to fetch testimonials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (testimonialData: Partial<Testimonial>) => {
    try {
      if (editingTestimonial?.id) {
        // Update existing testimonial
        const { error } = await supabase
          .from('testimonials')
          .update(testimonialData)
          .eq('id', editingTestimonial.id);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Testimonial updated successfully",
        });
      } else {
        // Create new testimonial
        const { error } = await supabase
          .from('testimonials')
          .insert(testimonialData as any);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Testimonial created successfully",
        });
      }

      setIsDialogOpen(false);
      setEditingTestimonial(null);
    } catch (error) {
      console.error('Error saving testimonial:', error);
      toast({
        title: "Error",
        description: "Failed to save testimonial",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Testimonial deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast({
        title: "Error",
        description: "Failed to delete testimonial",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (testimonial?: Testimonial) => {
    setEditingTestimonial(testimonial || null);
    setIsDialogOpen(true);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-muted rounded w-1/3" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="h-20 bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-primary" />
            Customer Testimonials
          </h2>
          <p className="text-muted-foreground">Manage customer reviews and testimonials</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openEditDialog()} className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
              </DialogTitle>
              <DialogDescription>
                {editingTestimonial ? 'Update testimonial information' : 'Create a new customer testimonial'}
              </DialogDescription>
            </DialogHeader>
            <TestimonialForm
              testimonial={editingTestimonial || emptyTestimonial}
              onSave={handleSave}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className={`${!testimonial.is_active ? 'opacity-60' : ''}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-3">
                    {testimonial.name}
                    {testimonial.is_featured && <Badge variant="secondary">Featured</Badge>}
                    {!testimonial.is_active && <Badge variant="outline">Inactive</Badge>}
                  </CardTitle>
                  <CardDescription>
                    {testimonial.role}
                    {testimonial.company && ` at ${testimonial.company}`}
                    {testimonial.location && ` • ${testimonial.location}`}
                  </CardDescription>
                  <div className="flex items-center gap-1 mt-2">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(testimonial)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(testimonial.id)}
                    className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground italic">"{testimonial.text}"</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Testimonial Form Component
const TestimonialForm: React.FC<{
  testimonial: Partial<Testimonial>;
  onSave: (data: Partial<Testimonial>) => void;
  onCancel: () => void;
}> = ({ testimonial, onSave, onCancel }) => {
  const [formData, setFormData] = useState(testimonial);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="rating">Rating</Label>
          <Input
            id="rating"
            type="number"
            min="1"
            max="5"
            value={formData.rating || 5}
            onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="role">Role/Position</Label>
          <Input
            id="role"
            value={formData.role || ''}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={formData.company || ''}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location || ''}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="San Francisco, CA"
          />
        </div>
        <div>
          <Label htmlFor="avatar_url">Avatar URL</Label>
          <Input
            id="avatar_url"
            value={formData.avatar_url || ''}
            onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="text">Testimonial Text</Label>
        <Textarea
          id="text"
          value={formData.text || ''}
          onChange={(e) => setFormData({ ...formData, text: e.target.value })}
          rows={4}
          required
        />
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="is_featured"
            checked={formData.is_featured || false}
            onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
          />
          <Label htmlFor="is_featured">Featured</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="is_active"
            checked={formData.is_active !== false}
            onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
          />
          <Label htmlFor="is_active">Active</Label>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          Save Testimonial
        </Button>
      </div>
    </form>
  );
};

export default AdminTestimonials;