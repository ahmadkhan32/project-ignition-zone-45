import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Save, Plus, Trash2, Move, Eye, EyeOff, ExternalLink, Loader2 } from 'lucide-react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

interface NavigationItem {
  id: string;
  label: string;
  url: string;
  icon_name?: string;
  sort_order: number;
  is_external: boolean;
  is_active: boolean;
  parent_id?: string;
}

const AdminNavigation = () => {
  const [items, setItems] = useState<NavigationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchNavigationItems();
  }, []);

  const fetchNavigationItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await (supabase as any)
        .from('navigation_items')
        .select('*')
        .order('sort_order');

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching navigation items:', error);
      toast({
        title: "Error",
        description: "Failed to fetch navigation items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveItem = async (item: NavigationItem) => {
    try {
      setSaving(item.id);
      const { error } = await (supabase as any)
        .from('navigation_items')
        .upsert({
          id: item.id,
          label: item.label,
          url: item.url,
          icon_name: item.icon_name,
          sort_order: item.sort_order,
          is_external: item.is_external,
          is_active: item.is_active,
          parent_id: item.parent_id,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Navigation item updated successfully",
      });
    } catch (error) {
      console.error('Error saving navigation item:', error);
      toast({
        title: "Error",
        description: "Failed to save navigation item",
        variant: "destructive",
      });
    } finally {
      setSaving(null);
    }
  };

  const addItem = async () => {
    const newItem: Partial<NavigationItem> = {
      label: 'New Item',
      url: '/',
      sort_order: items.length,
      is_external: false,
      is_active: true,
    };

    try {
      const { error } = await (supabase as any)
        .from('navigation_items')
        .insert(newItem);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Navigation item added",
      });
      
      fetchNavigationItems();
    } catch (error) {
      console.error('Error adding navigation item:', error);
      toast({
        title: "Error",
        description: "Failed to add navigation item",
        variant: "destructive",
      });
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const { error } = await (supabase as any)
        .from('navigation_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Navigation item deleted",
      });
      
      fetchNavigationItems();
    } catch (error) {
      console.error('Error deleting navigation item:', error);
      toast({
        title: "Error",
        description: "Failed to delete navigation item",
        variant: "destructive",
      });
    }
  };

  const updateItem = (id: string, field: keyof NavigationItem, value: any) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const updateSortOrder = async (newItems: NavigationItem[]) => {
    try {
      const updates = newItems.map((item, index) => ({
        id: item.id,
        sort_order: index,
      }));

      for (const update of updates) {
        await (supabase as any)
          .from('navigation_items')
          .update({ sort_order: update.sort_order })
          .eq('id', update.id);
      }

      setItems(newItems);
      toast({
        title: "Success",
        description: "Navigation order updated",
      });
    } catch (error) {
      console.error('Error updating sort order:', error);
      toast({
        title: "Error",
        description: "Failed to update navigation order",
        variant: "destructive",
      });
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    updateSortOrder(newItems);
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
          <h2 className="text-3xl font-bold text-foreground">Navigation Management</h2>
          <p className="text-muted-foreground">Manage website navigation menu items</p>
        </div>
        <Button onClick={addItem} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Item
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Menu Items</CardTitle>
          <CardDescription>
            Drag and drop to reorder items. Changes are saved automatically.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="navigation-items">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                  {items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="border rounded-lg p-4 bg-card"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div {...provided.dragHandleProps} className="cursor-move">
                                <Move className="w-4 h-4 text-muted-foreground" />
                              </div>
                              <Badge variant={item.is_active ? "default" : "secondary"}>
                                {item.is_active ? "Active" : "Inactive"}
                              </Badge>
                              {item.is_external && (
                                <Badge variant="outline">
                                  <ExternalLink className="w-3 h-3 mr-1" />
                                  External
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateItem(item.id, 'is_active', !item.is_active)}
                              >
                                {item.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => saveItem(item)}
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
                                onClick={() => deleteItem(item.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor={`label-${item.id}`}>Label</Label>
                              <Input
                                id={`label-${item.id}`}
                                value={item.label}
                                onChange={(e) => updateItem(item.id, 'label', e.target.value)}
                                placeholder="Menu item label"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`url-${item.id}`}>URL</Label>
                              <Input
                                id={`url-${item.id}`}
                                value={item.url}
                                onChange={(e) => updateItem(item.id, 'url', e.target.value)}
                                placeholder="/page-url or https://external.com"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`icon-${item.id}`}>Icon Name (Optional)</Label>
                              <Input
                                id={`icon-${item.id}`}
                                value={item.icon_name || ''}
                                onChange={(e) => updateItem(item.id, 'icon_name', e.target.value)}
                                placeholder="home, user, settings, etc."
                              />
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 mt-4">
                            <Switch
                              checked={item.is_external}
                              onCheckedChange={(checked) => updateItem(item.id, 'is_external', checked)}
                            />
                            <Label>External Link</Label>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          
          {items.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No navigation items found.</p>
              <Button onClick={addItem} className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Add First Item
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminNavigation;