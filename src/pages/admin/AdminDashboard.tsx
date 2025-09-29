import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ScooterModel {
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
}

const initialForm = {
  id: "",
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
  display_order: 0,
};

const AdminDashboard: React.FC = () => {
  const [scooters, setScooters] = useState<ScooterModel[]>([]);
  const [formData, setFormData] = useState<any>(initialForm);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    fetchScooters();
  }, []);

  const fetchScooters = async () => {
    const { data, error } = await supabase
      .from('scooters')
      .select('*')
      .order('display_order', { ascending: true });
    if (!error) setScooters(data || []);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };


  // Helper functions for CRUD
  const addScooter = async (data: any) => {
    if (!data.name || !data.price) return alert("Fill all required fields");
    const { error } = await supabase.from('scooters').insert([
      {
        name: data.name,
        description: data.description,
        price: data.price,
        max_speed: data.max_speed,
        max_range: data.max_range,
        charge_time: data.charge_time,
        image_1_url: data.image_1_url,
        image_2_url: data.image_2_url,
        thumbnail_url: data.thumbnail_url,
        is_active: data.is_active,
        is_featured: data.is_featured,
        display_order: Number(data.display_order) || 0,
      },
    ]);
    if (error) return alert("Error adding scooter: " + error.message);
    fetchScooters();
    resetForm();
  };

  const editScooter = async (id: string, data: any) => {
    const { error } = await supabase
      .from('scooters')
      .update({
        name: data.name,
        description: data.description,
        price: data.price,
        max_speed: data.max_speed,
        max_range: data.max_range,
        charge_time: data.charge_time,
        image_1_url: data.image_1_url,
        image_2_url: data.image_2_url,
        thumbnail_url: data.thumbnail_url,
        is_active: data.is_active,
        is_featured: data.is_featured,
        display_order: Number(data.display_order) || 0,
      })
      .eq('id', id);
    if (error) return alert("Error updating scooter: " + error.message);
    fetchScooters();
    resetForm();
    setIsEditing(false);
    setEditId(null);
  };

  const deleteScooter = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this scooter?")) return;
    const { error } = await supabase.from('scooters').delete().eq('id', id);
    if (error) return alert("Error deleting scooter: " + error.message);
    fetchScooters();
  };

  // UI event handlers
  const handleAdd = () => addScooter(formData);
  const handleEdit = (scooter: ScooterModel) => {
    setFormData({ ...scooter });
    setIsEditing(true);
    setEditId(scooter.id);
  };
  const handleSave = () => {
    if (editId) editScooter(editId, formData);
  };
  const handleDelete = (id: string) => deleteScooter(id);

  const resetForm = () => {
    setFormData(initialForm);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {/* Form */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6 text-white">
        <h2 className="text-xl mb-3">{isEditing ? "Edit Scooter" : "Add New Scooter"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <input name="name" placeholder="Name*" value={formData.name} onChange={handleChange} className="p-2 m-1 rounded text-black w-full" />
          <input name="price" placeholder="Price*" value={formData.price} onChange={handleChange} className="p-2 m-1 rounded text-black w-full" />
          <input name="max_speed" placeholder="Max Speed" value={formData.max_speed} onChange={handleChange} className="p-2 m-1 rounded text-black w-full" />
          <input name="max_range" placeholder="Max Range" value={formData.max_range} onChange={handleChange} className="p-2 m-1 rounded text-black w-full" />
          <input name="charge_time" placeholder="Charge Time" value={formData.charge_time} onChange={handleChange} className="p-2 m-1 rounded text-black w-full" />
          <input name="image_1_url" placeholder="Image 1 URL" value={formData.image_1_url} onChange={handleChange} className="p-2 m-1 rounded text-black w-full" />
          <input name="image_2_url" placeholder="Image 2 URL" value={formData.image_2_url} onChange={handleChange} className="p-2 m-1 rounded text-black w-full" />
          <input name="thumbnail_url" placeholder="Thumbnail URL" value={formData.thumbnail_url} onChange={handleChange} className="p-2 m-1 rounded text-black w-full" />
          <textarea name="description" placeholder="Description" value={formData.description || ""} onChange={handleChange} className="p-2 m-1 rounded text-black w-full" />
          <input name="display_order" type="number" placeholder="Display Order" value={formData.display_order} onChange={handleChange} className="p-2 m-1 rounded text-black w-full" />
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} />
            <span>Active</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleChange} />
            <span>Featured</span>
          </label>
        </div>
        {isEditing ? (
          <button onClick={handleSave} className="bg-yellow-500 px-4 py-2 rounded mt-2">
            Save
          </button>
        ) : (
          <button onClick={handleAdd} className="bg-green-500 px-4 py-2 rounded mt-2">
            Add
          </button>
        )}
      </div>
      {/* Existing Scooters */}
      <div className="grid md:grid-cols-2 gap-6">
        {scooters.map((s) => (
          <div key={s.id} className="bg-gray-900 text-white rounded-lg shadow-lg p-4">
            <img src={s.image_1_url || s.thumbnail_url || '/placeholder.svg'} alt={s.name} className="rounded-lg mb-3" />
            <div className="flex flex-wrap items-center justify-between mb-2">
              <h3 className="text-xl font-bold">{s.name}</h3>
              <span className={`px-2 py-1 rounded text-xs font-semibold ml-2 ${s.is_active ? 'bg-green-600' : 'bg-gray-600'}`}>{s.is_active ? 'Active' : 'Inactive'}</span>
              {s.is_featured && <span className="ml-2 px-2 py-1 rounded text-xs font-semibold bg-yellow-500 text-black">Featured</span>}
            </div>
            <p className="text-xs text-gray-400 mb-1">ID: {s.id}</p>
            <p className="text-sm text-gray-300 mb-2">Display Order: {s.display_order}</p>
            <p>{s.description}</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="text-blue-400 font-semibold">Price: {s.price}</div>
              <div>⚡ {s.max_speed}</div>
              <div>🔋 {s.max_range}</div>
              <div>⏳ {s.charge_time}</div>
            </div>
            <div className="mt-3 flex gap-2">
              <button onClick={() => handleEdit(s)} className="bg-yellow-500 px-3 py-1 rounded">
                Edit
              </button>
              <button onClick={() => handleDelete(s.id)} className="bg-red-500 px-3 py-1 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
