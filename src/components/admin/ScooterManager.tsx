import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Edit, Trash2, Image, Eye, EyeOff } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface Scooter {
  id: string;
  name: string;
  description: string | null;
  price: string;
  max_speed: string;
  max_range: string;
  charge_time: string;
  image_1_url: string | null;
  image_2_url: string | null;
  thumbnail_url: string | null;
  is_active: boolean;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export const ScooterManager = () => {
  const [scooters, setScooters] = useState<Scooter[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingScooter, setEditingScooter] = useState<Scooter | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    max_speed: "",
    max_range: "",
    charge_time: "",
    image_1_url: "",
    image_2_url: "",
    thumbnail_url: "",
    is_active: true,
    is_featured: false,
    display_order: 0
  });
  const { toast } = useToast();

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
        .order('display_order', { ascending: true });

      if (error) throw error;
      setScooters(data || []);
    } catch (error) {
      console.error('Error fetching scooters:', error);
      toast({
        title: "Error",
        description: "Failed to load scooters",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      max_speed: "",
      max_range: "",
      charge_time: "",
      image_1_url: "",
      image_2_url: "",
      thumbnail_url: "",
      is_active: true,
      is_featured: false,
      display_order: scooters.length
    });
    setEditingScooter(null);
  };

  const openDialog = (scooter?: Scooter) => {
    if (scooter) {
      setEditingScooter(scooter);
      setFormData({
        name: scooter.name,
        description: scooter.description || "",
        price: scooter.price,
        max_speed: scooter.max_speed,
        max_range: scooter.max_range,
        charge_time: scooter.charge_time,
        image_1_url: scooter.image_1_url || "",
        image_2_url: scooter.image_2_url || "",
        thumbnail_url: scooter.thumbnail_url || "",
        is_active: scooter.is_active,
        is_featured: scooter.is_featured,
        display_order: scooter.display_order
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingScooter) {
        // Update existing scooter
        const { data, error } = await supabase
          .from('scooters')
          .update({
            ...formData,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingScooter.id)
          .select();

        if (error) throw error;

        toast({
          title: "Success",
          description: "Scooter updated successfully!",
        });
      } else {
        // Create new scooter
        const { data, error } = await supabase
          .from('scooters')
          .insert([formData])
          .select();

        if (error) throw error;

        toast({
          title: "Success",
          description: "Scooter created successfully!",
        });
      }

      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving scooter:', error);
      toast({
        title: "Error",
        description: "Failed to save scooter",
        variant: "destructive",
      });
    }
  };

  const toggleActive = async (scooter: Scooter) => {
    try {
      const { error } = await supabase
        .from('scooters')
        .update({ is_active: !scooter.is_active })
        .eq('id', scooter.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Scooter ${!scooter.is_active ? 'activated' : 'deactivated'} successfully!`,
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

  const deleteScooter = async (scooter: Scooter) => {
    if (!confirm(`Are you sure you want to delete "${scooter.name}"?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('scooters')
        .delete()
        .eq('id', scooter.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Scooter deleted successfully!",
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Add New Scooter Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Current Scooters ({scooters.length})</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Scooter
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingScooter ? "Edit Scooter" : "Add New Scooter"}
              </DialogTitle>
              <DialogDescription>
                {editingScooter 
                  ? "Update the scooter information below" 
                  : "Fill in the details for the new scooter"}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Scooter Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="EV Sport Pro"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="$4,999"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Smart Display, GPS Navigation, Anti-theft, 3.2 kWh, 85 km, 65 km/h, 2.5 hrs"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="max_speed">Max Speed</Label>
                  <Input
                    id="max_speed"
                    value={formData.max_speed}
                    onChange={(e) => setFormData({...formData, max_speed: e.target.value})}
                    placeholder="65 km/h"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="max_range">Max Range</Label>
                  <Input
                    id="max_range"
                    value={formData.max_range}
                    onChange={(e) => setFormData({...formData, max_range: e.target.value})}
                    placeholder="85 km"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="charge_time">Charge Time</Label>
                  <Input
                    id="charge_time"
                    value={formData.charge_time}
                    onChange={(e) => setFormData({...formData, charge_time: e.target.value})}
                    placeholder="2.5 hrs"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Images</h4>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="image_1_url">Primary Image URL</Label>
                    <Input
                      id="image_1_url"
                      value={formData.image_1_url}
                      onChange={(e) => setFormData({...formData, image_1_url: e.target.value})}
                      placeholder="https://example.com/scooter-image-1.jpg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="image_2_url">Secondary Image URL</Label>
                    <Input
                      id="image_2_url"
                      value={formData.image_2_url}
                      onChange={(e) => setFormData({...formData, image_2_url: e.target.value})}
                      placeholder="https://example.com/scooter-image-2.jpg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="thumbnail_url">Thumbnail URL</Label>
                    <Input
                      id="thumbnail_url"
                      value={formData.thumbnail_url}
                      onChange={(e) => setFormData({...formData, thumbnail_url: e.target.value})}
                      placeholder="https://example.com/scooter-thumbnail.jpg"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value) || 0})}
                    min="0"
                  />
                </div>
                
                <div className="flex items-center space-x-2 pt-8">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                    className="rounded"
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>
                
                <div className="flex items-center space-x-2 pt-8">
                  <input
                    type="checkbox"
                    id="is_featured"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
                    className="rounded"
                  />
                  <Label htmlFor="is_featured">Featured</Label>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingScooter ? "Update Scooter" : "Create Scooter"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Scooters List */}
      <div className="grid gap-4">
        {scooters.map((scooter) => (
          <Card key={scooter.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex space-x-4">
                  {scooter.thumbnail_url && (
                    <img
                      src={scooter.thumbnail_url}
                      alt={scooter.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  )}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-lg font-semibold">{scooter.name}</h4>
                      <Badge variant={scooter.is_active ? "default" : "secondary"}>
                        {scooter.is_active ? "Active" : "Inactive"}
                      </Badge>
                      {scooter.is_featured && (
                        <Badge variant="outline">Featured</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{scooter.description}</p>
                    <div className="flex space-x-4 text-sm">
                      <span><strong>Price:</strong> {scooter.price}</span>
                      <span><strong>Speed:</strong> {scooter.max_speed}</span>
                      <span><strong>Range:</strong> {scooter.max_range}</span>
                      <span><strong>Charge:</strong> {scooter.charge_time}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleActive(scooter)}
                  >
                    {scooter.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openDialog(scooter)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteScooter(scooter)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {scooters.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Image className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Scooters Yet</h3>
              <p className="text-muted-foreground mb-4">
                Add your first scooter to get started with inventory management.
              </p>
              <Button onClick={() => openDialog()}>
                <Plus className="w-4 h-4 mr-2" />
                Add First Scooter
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};