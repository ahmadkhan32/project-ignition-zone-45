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
import { Plus, Edit, Trash2, HelpCircle } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  sort_order: number;
  is_active: boolean;
}

const AdminFAQs = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const emptyFAQ: Partial<FAQ> = {
    question: '',
    answer: '',
    category: 'general',
    sort_order: 0,
    is_active: true,
  };

  useEffect(() => {
    fetchFAQs();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('faqs-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'faqs' }, () => {
        fetchFAQs();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchFAQs = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('faqs')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setFaqs(data || []);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch FAQs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (faqData: Partial<FAQ>) => {
    try {
      if (editingFAQ?.id) {
        // Update existing FAQ
        const { error } = await (supabase as any)
          .from('faqs')
          .update(faqData)
          .eq('id', editingFAQ.id);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "FAQ updated successfully",
        });
      } else {
        // Create new FAQ
        const { error } = await (supabase as any)
          .from('faqs')
          .insert(faqData as any);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "FAQ created successfully",
        });
      }

      setIsDialogOpen(false);
      setEditingFAQ(null);
    } catch (error) {
      console.error('Error saving FAQ:', error);
      toast({
        title: "Error",
        description: "Failed to save FAQ",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;

    try {
      const { error } = await (supabase as any)
        .from('faqs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "FAQ deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      toast({
        title: "Error",
        description: "Failed to delete FAQ",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (faq?: FAQ) => {
    setEditingFAQ(faq || null);
    setIsDialogOpen(true);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      general: 'bg-blue-100 text-blue-800',
      performance: 'bg-green-100 text-green-800',
      battery: 'bg-yellow-100 text-yellow-800',
      warranty: 'bg-purple-100 text-purple-800',
      service: 'bg-orange-100 text-orange-800',
      features: 'bg-indigo-100 text-indigo-800',
    };
    return colors[category as keyof typeof colors] || colors.general;
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
            <HelpCircle className="w-6 h-6 text-primary" />
            FAQ Management
          </h2>
          <p className="text-muted-foreground">Manage frequently asked questions</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openEditDialog()} className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add FAQ
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingFAQ ? 'Edit FAQ' : 'Add New FAQ'}
              </DialogTitle>
              <DialogDescription>
                {editingFAQ ? 'Update FAQ information' : 'Create a new frequently asked question'}
              </DialogDescription>
            </DialogHeader>
            <FAQForm
              faq={editingFAQ || emptyFAQ}
              onSave={handleSave}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {faqs.map((faq) => (
          <Card key={faq.id} className={`${!faq.is_active ? 'opacity-60' : ''}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-3">
                    {faq.question}
                    <Badge className={getCategoryColor(faq.category)}>
                      {faq.category}
                    </Badge>
                    {!faq.is_active && <Badge variant="outline">Inactive</Badge>}
                  </CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(faq)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(faq.id)}
                    className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{faq.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// FAQ Form Component
const FAQForm: React.FC<{
  faq: Partial<FAQ>;
  onSave: (data: Partial<FAQ>) => void;
  onCancel: () => void;
}> = ({ faq, onSave, onCancel }) => {
  const [formData, setFormData] = useState(faq);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const categories = [
    { value: 'general', label: 'General' },
    { value: 'performance', label: 'Performance' },
    { value: 'battery', label: 'Battery' },
    { value: 'warranty', label: 'Warranty' },
    { value: 'service', label: 'Service' },
    { value: 'features', label: 'Features' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="question">Question</Label>
        <Input
          id="question"
          value={formData.question || ''}
          onChange={(e) => setFormData({ ...formData, question: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="answer">Answer</Label>
        <Textarea
          id="answer"
          value={formData.answer || ''}
          onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            value={formData.category || 'general'}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="sort_order">Sort Order</Label>
          <Input
            id="sort_order"
            type="number"
            value={formData.sort_order || 0}
            onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) })}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="is_active"
          checked={formData.is_active !== false}
          onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
        />
        <Label htmlFor="is_active">Active</Label>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          Save FAQ
        </Button>
      </div>
    </form>
  );
};

export default AdminFAQs;