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
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';

interface Scooter {
  id: string;
  name: string;
  model: string;
  price: number;
  image_url: string;
  battery_capacity: number;
  range_km: number;
  top_speed: number;
  charging_time_hours: number;
  power_kw: number;
  torque_nm: number;
  weight_kg: number;
  description: string;
  features: any;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
}

const AdminScooters = () => {
  const [scooters, setScooters] = useState<Scooter[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingScooter, setEditingScooter] = useState<Scooter | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const emptyScooter: Partial<Scooter> = {
    name: '',
    model: '',
    price: 0,
    image_url: '',
    battery_capacity: 0,
    range_km: 0,
    top_speed: 0,
    charging_time_hours: 0,
    power_kw: 0,
    torque_nm: 0,
    weight_kg: 0,
    description: '',
    features: [],
    is_featured: false,
    is_active: true,
    sort_order: 0,
  };

  useEffect(() => {
    fetchScooters();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('scooters-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'scooters' }, () => {
        fetchScooters();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchScooters = async () => {
    try {
      const { data, error } = await supabase
        .from('scooters')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setScooters(data?.map(item => ({
        ...item,
        features: Array.isArray(item.features) ? item.features : []
      })) || []);
    } catch (error) {
      console.error('Error fetching scooters:', error);
      toast({
        title: "Error",
        description: "Failed to fetch scooters",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (scooterData: Partial<Scooter>) => {
    try {
      if (editingScooter?.id) {
        // Update existing scooter
        const { error } = await supabase
          .from('scooters')
          .update(scooterData)
          .eq('id', editingScooter.id);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Scooter updated successfully",
        });
      } else {
        // Create new scooter
        const { error } = await supabase
          .from('scooters')
          .insert(scooterData as any);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Scooter created successfully",
        });
      }

      setIsDialogOpen(false);
      setEditingScooter(null);
    } catch (error) {
      console.error('Error saving scooter:', error);
      toast({
        title: "Error",
        description: "Failed to save scooter",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this scooter?')) return;

    try {
      const { error } = await supabase
        .from('scooters')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Scooter deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting scooter:', error);
      toast({
        title: "Error",
        description: "Failed to delete scooter",
        variant: "destructive",
      });
    }
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('scooters')
        .update({ is_active: !isActive })
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: `Scooter ${!isActive ? 'activated' : 'deactivated'} successfully`,
      });
    } catch (error) {
      console.error('Error toggling scooter status:', error);
      toast({
        title: "Error",
        description: "Failed to update scooter status",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (scooter?: Scooter) => {
    setEditingScooter(scooter || null);
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
          <h2 className="text-2xl font-bold">Scooter Management</h2>
          <p className="text-muted-foreground">Manage your electric scooter models and specifications</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openEditDialog()} className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Scooter
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingScooter ? 'Edit Scooter' : 'Add New Scooter'}
              </DialogTitle>
              <DialogDescription>
                {editingScooter ? 'Update scooter information' : 'Create a new scooter model'}
              </DialogDescription>
            </DialogHeader>
            <ScooterForm
              scooter={editingScooter || emptyScooter}
              onSave={handleSave}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {scooters.map((scooter) => (
          <Card key={scooter.id} className={`${!scooter.is_active ? 'opacity-60' : ''}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-3">
                    {scooter.name}
                    {scooter.is_featured && <Badge variant="secondary">Featured</Badge>}
                    {!scooter.is_active && <Badge variant="outline">Inactive</Badge>}
                  </CardTitle>
                  <CardDescription>{scooter.model} • ${scooter.price}</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleActive(scooter.id, scooter.is_active)}
                  >
                    {scooter.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(scooter)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(scooter.id)}
                    className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-medium">Battery:</span> {scooter.battery_capacity} kWh
                </div>
                <div>
                  <span className="font-medium">Range:</span> {scooter.range_km} km
                </div>
                <div>
                  <span className="font-medium">Speed:</span> {scooter.top_speed} km/h
                </div>
                <div>
                  <span className="font-medium">Power:</span> {scooter.power_kw} kW
                </div>
              </div>
              <p className="text-muted-foreground mt-2">{scooter.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Scooter Form Component
const ScooterForm: React.FC<{
  scooter: Partial<Scooter>;
  onSave: (data: Partial<Scooter>) => void;
  onCancel: () => void;
}> = ({ scooter, onSave, onCancel }) => {
  const [formData, setFormData] = useState(scooter);
  const [featuresText, setFeaturesText] = useState(
    scooter.features ? scooter.features.join(', ') : ''
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const features = featuresText.split(',').map(f => f.trim()).filter(f => f);
    onSave({ ...formData, features });
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
          <Label htmlFor="model">Model</Label>
          <Input
            id="model"
            value={formData.model || ''}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price || ''}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            required
          />
        </div>
        <div>
          <Label htmlFor="image_url">Image URL</Label>
          <Input
            id="image_url"
            value={formData.image_url || ''}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="battery_capacity">Battery (kWh)</Label>
          <Input
            id="battery_capacity"
            type="number"
            step="0.1"
            value={formData.battery_capacity || ''}
            onChange={(e) => setFormData({ ...formData, battery_capacity: parseFloat(e.target.value) })}
            required
          />
        </div>
        <div>
          <Label htmlFor="range_km">Range (km)</Label>
          <Input
            id="range_km"
            type="number"
            value={formData.range_km || ''}
            onChange={(e) => setFormData({ ...formData, range_km: parseInt(e.target.value) })}
            required
          />
        </div>
        <div>
          <Label htmlFor="top_speed">Top Speed (km/h)</Label>
          <Input
            id="top_speed"
            type="number"
            value={formData.top_speed || ''}
            onChange={(e) => setFormData({ ...formData, top_speed: parseInt(e.target.value) })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="charging_time_hours">Charging Time (hrs)</Label>
          <Input
            id="charging_time_hours"
            type="number"
            step="0.1"
            value={formData.charging_time_hours || ''}
            onChange={(e) => setFormData({ ...formData, charging_time_hours: parseFloat(e.target.value) })}
            required
          />
        </div>
        <div>
          <Label htmlFor="power_kw">Power (kW)</Label>
          <Input
            id="power_kw"
            type="number"
            step="0.1"
            value={formData.power_kw || ''}
            onChange={(e) => setFormData({ ...formData, power_kw: parseFloat(e.target.value) })}
            required
          />
        </div>
        <div>
          <Label htmlFor="weight_kg">Weight (kg)</Label>
          <Input
            id="weight_kg"
            type="number"
            value={formData.weight_kg || ''}
            onChange={(e) => setFormData({ ...formData, weight_kg: parseInt(e.target.value) })}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="features">Features (comma-separated)</Label>
        <Textarea
          id="features"
          value={featuresText}
          onChange={(e) => setFeaturesText(e.target.value)}
          placeholder="Smart Display, GPS Tracking, App Connectivity"
          rows={2}
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
          Save Scooter
        </Button>
      </div>
    </form>
  );
};

export default AdminScooters;