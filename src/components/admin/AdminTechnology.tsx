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
import { Plus, Edit, Trash2, Settings } from 'lucide-react';

interface TechFeature {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  sort_order: number;
  is_active: boolean;
}

const AdminTechnology = () => {
  const [features, setFeatures] = useState<TechFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFeature, setEditingFeature] = useState<TechFeature | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const emptyFeature: Partial<TechFeature> = {
    title: '',
    description: '',
    icon_name: 'Settings',
    sort_order: 0,
    is_active: true,
  };

  const availableIcons = [
    'Battery', 'Zap', 'RotateCcw', 'Smartphone', 'Settings', 'MapPin',
    'Shield', 'Wifi', 'Bluetooth', 'Navigation', 'Sun', 'Moon'
  ];

  useEffect(() => {
    fetchFeatures();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('tech-features-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'technology_features' }, () => {
        fetchFeatures();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchFeatures = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('technology_features')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setFeatures(data || []);
    } catch (error) {
      console.error('Error fetching tech features:', error);
      toast({
        title: "Error",
        description: "Failed to fetch technology features",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (featureData: Partial<TechFeature>) => {
    try {
      if (editingFeature?.id) {
        // Update existing feature
        const { error } = await (supabase as any)
          .from('technology_features')
          .update(featureData)
          .eq('id', editingFeature.id);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Technology feature updated successfully",
        });
      } else {
        // Create new feature
        const { error } = await (supabase as any)
          .from('technology_features')
          .insert(featureData as any);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Technology feature created successfully",
        });
      }

      setIsDialogOpen(false);
      setEditingFeature(null);
    } catch (error) {
      console.error('Error saving tech feature:', error);
      toast({
        title: "Error",
        description: "Failed to save technology feature",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this technology feature?')) return;

    try {
      const { error } = await (supabase as any)
        .from('technology_features')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Technology feature deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting tech feature:', error);
      toast({
        title: "Error",
        description: "Failed to delete technology feature",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (feature?: TechFeature) => {
    setEditingFeature(feature || null);
    setIsDialogOpen(true);
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
            <Settings className="w-6 h-6 text-primary" />
            Technology Features
          </h2>
          <p className="text-muted-foreground">Manage technology highlights and features</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openEditDialog()} className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Feature
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingFeature ? 'Edit Technology Feature' : 'Add New Technology Feature'}
              </DialogTitle>
              <DialogDescription>
                {editingFeature ? 'Update feature information' : 'Create a new technology feature'}
              </DialogDescription>
            </DialogHeader>
            <TechFeatureForm
              feature={editingFeature || emptyFeature}
              availableIcons={availableIcons}
              onSave={handleSave}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {features.map((feature) => (
          <Card key={feature.id} className={`${!feature.is_active ? 'opacity-60' : ''}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-3">
                    {feature.title}
                    <Badge variant="secondary">{feature.icon_name}</Badge>
                    {!feature.is_active && <Badge variant="outline">Inactive</Badge>}
                  </CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(feature)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(feature.id)}
                    className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Tech Feature Form Component
const TechFeatureForm: React.FC<{
  feature: Partial<TechFeature>;
  availableIcons: string[];
  onSave: (data: Partial<TechFeature>) => void;
  onCancel: () => void;
}> = ({ feature, availableIcons, onSave, onCancel }) => {
  const [formData, setFormData] = useState(feature);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title || ''}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="icon_name">Icon</Label>
          <select
            id="icon_name"
            value={formData.icon_name || 'Settings'}
            onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          >
            {availableIcons.map((icon) => (
              <option key={icon} value={icon}>
                {icon}
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
          Save Feature
        </Button>
      </div>
    </form>
  );
};

export default AdminTechnology;