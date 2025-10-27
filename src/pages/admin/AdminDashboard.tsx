import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
  image_3_url: string | null;
  thumbnail_url: string | null;
  is_active: boolean;
  is_featured: boolean;
  display_order: number;
  
  // Serial Numbers
  serial_number: string;
  motor_number: string;
  chassis_number: string;
  
  // Inventory & Warranty
  total_sold: number;
  units_in_stock: number;
  warranty_period_months: number;
  
  // Advanced Features
  smart_display: boolean;
  gps_navigation: boolean;
  anti_theft_system: boolean;
  mobile_app_connectivity: boolean;
  led_lighting_system: boolean;
  regenerative_braking: boolean;
  
  // Technical Specifications
  motor_output: string;
  battery: string;
  weight: string;
  connectivity_mobile_app: string;
  connectivity_gps_tracking: string;
  connectivity_bluetooth: string;
}

interface DatabaseScooterRecord {
  [key: string]: unknown;
}

// Helper functions to get values with proper units
const getMotorOutput = (motorOutput: string | undefined, powerOutput: string | undefined): string => {
  if (motorOutput) {
    // Always ensure it ends with W
    const cleanValue = motorOutput.replace(/[^\d.]/g, '');
    return cleanValue ? `${cleanValue}W` : "";
  }
  if (powerOutput) {
    // Always ensure it ends with W
    const cleanValue = powerOutput.replace(/[^\d.]/g, '');
    return cleanValue ? `${cleanValue}W` : "";
  }
  return "";
};

const getBattery = (battery: string | undefined, torque: string | undefined): string => {
  if (battery) {
    // Always ensure it ends with Ah
    const cleanValue = battery.replace(/[^\d.]/g, '');
    return cleanValue ? `${cleanValue}Ah` : "";
  }
  if (torque) {
    // Always ensure it ends with Ah
    const cleanValue = torque.replace(/[^\d.]/g, '');
    return cleanValue ? `${cleanValue}Ah` : "";
  }
  return "";
};

const initialForm: ScooterModel = {
  id: "",
  name: "",
  description: "",
  price: "",
  max_speed: "",
  max_range: "",
  charge_time: "",
  image_1_url: "",
  image_2_url: "",
  image_3_url: "",
  thumbnail_url: "",
  is_active: true,
  is_featured: false,
  display_order: 0,
  
  // Serial Numbers
  serial_number: "",
  motor_number: "",
  chassis_number: "",
  
  // Inventory & Warranty
  total_sold: 0,
  units_in_stock: 0,
  warranty_period_months: 12,
  
  // Advanced Features
  smart_display: false,
  gps_navigation: false,
  anti_theft_system: false,
  mobile_app_connectivity: false,
  led_lighting_system: false,
  regenerative_braking: false,
  
  // Technical Specifications
  motor_output: "",
  battery: "",
  weight: "",
  connectivity_mobile_app: "",
  connectivity_gps_tracking: "",
  connectivity_bluetooth: "",
};

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [scooters, setScooters] = useState<ScooterModel[]>([]);
  const [formData, setFormData] = useState<ScooterModel>(initialForm);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredScooters, setFilteredScooters] = useState<ScooterModel[]>([]);
  const scootersPerPage = 5;

  const fetchScooters = useCallback(async () => {
    const { data, error, count } = await supabase
      .from('scooters')
      .select('*', { count: 'exact' })
      .order('display_order', { ascending: true })
      .range((currentPage - 1) * scootersPerPage, currentPage * scootersPerPage - 1);
    
    if (!error) {
      // Map data to include default values for new fields (they may not exist in DB yet)
      const scootersWithDefaults = (data || []).map((scooter: DatabaseScooterRecord) => ({
        ...initialForm,
        ...scooter,
        // Set default values for serial numbers (will be empty if columns don't exist)
        serial_number: String(scooter.serial_number ?? ""),
        motor_number: String(scooter.motor_number ?? ""),
        chassis_number: String(scooter.chassis_number ?? ""),
        image_3_url: String(scooter.image_3_url ?? ""),
        // Set default values for inventory & warranty
        total_sold: Number(scooter.total_sold ?? 0),
        units_in_stock: Number(scooter.units_in_stock ?? 0),
        warranty_period_months: Number(scooter.warranty_period_months ?? 12),
        // Set default values for advanced features (will be false if columns don't exist)
        smart_display: Boolean(scooter.smart_display ?? false),
        gps_navigation: Boolean(scooter.gps_navigation ?? false),
        anti_theft_system: Boolean(scooter.anti_theft_system ?? false),
        mobile_app_connectivity: Boolean(scooter.mobile_app_connectivity ?? false),
        led_lighting_system: Boolean(scooter.led_lighting_system ?? false),
        regenerative_braking: Boolean(scooter.regenerative_braking ?? false),
        // Set default values for technical specs (will be empty if columns don't exist)
        // Use legacy fields if new fields don't exist yet
        motor_output: getMotorOutput(scooter.motor_output as string, scooter.power_output as string),
        battery: getBattery(scooter.battery as string, scooter.torque as string),
        weight: String(scooter.weight ?? ""),
        connectivity_mobile_app: String(scooter.connectivity_mobile_app ?? ""),
        connectivity_gps_tracking: String(scooter.connectivity_gps_tracking ?? ""),
        connectivity_bluetooth: String(scooter.connectivity_bluetooth ?? ""),
      })) as ScooterModel[];
      setScooters(scootersWithDefaults);
      
      // Calculate total pages
      const totalScooters = count || 0;
      const pages = Math.ceil(totalScooters / scootersPerPage);
      setTotalPages(pages);
    } else {
      console.error('Error fetching scooters:', error);
      alert('Error loading scooters: ' + error.message);
    }
  }, [currentPage, scootersPerPage]);

  useEffect(() => {
    fetchScooters();
    
    // Set up real-time subscription for automatic updates
    const channel = supabase
      .channel('admin_dashboard_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'scooters' }, () => {
        console.log('Scooters table changed, refreshing data...');
        fetchScooters();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentPage, fetchScooters]);

  // Search functionality
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredScooters(scooters);
    } else {
      const filtered = scooters.filter(scooter =>
        scooter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scooter.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scooter.price.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scooter.max_speed.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scooter.max_range.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredScooters(filtered);
    }
  }, [scooters, searchTerm]);

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

  const handleFileUpload = async (file: File, fieldName: string) => {
    if (!file) return;
    
    // Validate file type
    const allowedTypes = ['image/svg+xml', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please select a valid image file (SVG, JPEG, JPG, or PNG)');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }
    
    setUploading(true);
    
    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `admin-uploads/${fileName}`;
      
      // Upload to Supabase Storage - Admin Images Bucket
      const { data, error } = await supabase.storage
        .from('admin-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Error uploading to storage:', error);
        alert('Error uploading file: ' + error.message);
        setUploading(false);
        return;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('admin-images')
        .getPublicUrl(filePath);

      // Update form data with public URL
      setFormData({
        ...formData,
        [fieldName]: publicUrl,
      });
      
      setUploading(false);
      alert('Image uploaded successfully to storage!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
      setUploading(false);
    }
  };


  // Helper functions for CRUD
  const addScooter = async (data: ScooterModel) => {
    if (!data.name || !data.price) return alert("Fill all required fields");
    
    // Try with all fields first, fallback to basic fields if columns don't exist
    const fullData = {
      name: data.name,
      description: data.description,
      price: data.price,
      max_speed: data.max_speed,
      max_range: data.max_range,
      charge_time: data.charge_time,
      image_1_url: data.image_1_url,
      image_2_url: data.image_2_url,
      image_3_url: data.image_3_url,
      thumbnail_url: data.thumbnail_url,
      is_active: data.is_active,
      is_featured: data.is_featured,
      display_order: Number(data.display_order) || 0,
      // Serial Numbers
      serial_number: data.serial_number,
      motor_number: data.motor_number,
      chassis_number: data.chassis_number,
      // Inventory & Warranty
      total_sold: Number(data.total_sold) || 0,
      units_in_stock: Number(data.units_in_stock) || 0,
      warranty_period_months: Number(data.warranty_period_months) || 12,
      // Advanced Features
      smart_display: data.smart_display,
      gps_navigation: data.gps_navigation,
      anti_theft_system: data.anti_theft_system,
      mobile_app_connectivity: data.mobile_app_connectivity,
      led_lighting_system: data.led_lighting_system,
      regenerative_braking: data.regenerative_braking,
      // Technical Specifications
      motor_output: data.motor_output,
      battery: data.battery,
      weight: data.weight,
      connectivity_mobile_app: data.connectivity_mobile_app,
      connectivity_gps_tracking: data.connectivity_gps_tracking,
      connectivity_bluetooth: data.connectivity_bluetooth,
    };

    const { error } = await supabase.from('scooters').insert([fullData]);
    
    // If error due to missing columns, try with basic fields only
    if (error && (error.message.includes('column') || error.message.includes('anti_theft_system') || error.message.includes('does not exist'))) {
      console.log('Advanced columns not found, inserting with basic fields only');
      const basicData = {
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
      };
      const { error: basicError } = await supabase.from('scooters').insert([basicData]);
      if (basicError) {
        alert("Error adding scooter: " + basicError.message);
        return;
      }
      alert("Scooter added successfully! Note: Advanced features columns need to be added to the database.");
    } else if (error) {
      alert("Error adding scooter: " + error.message);
      return;
    } else {
      alert("Scooter added successfully!");
    }
    
    setCurrentPage(1); // Reset to first page
    fetchScooters();
    resetForm();
  };

  const editScooter = async (id: string, data: ScooterModel) => {
    // Try with all fields first, fallback to basic fields if columns don't exist
    const fullData = {
      name: data.name,
      description: data.description,
      price: data.price,
      max_speed: data.max_speed,
      max_range: data.max_range,
      charge_time: data.charge_time,
      image_1_url: data.image_1_url,
      image_2_url: data.image_2_url,
      image_3_url: data.image_3_url,
      thumbnail_url: data.thumbnail_url,
      is_active: data.is_active,
      is_featured: data.is_featured,
      display_order: Number(data.display_order) || 0,
      // Serial Numbers
      serial_number: data.serial_number,
      motor_number: data.motor_number,
      chassis_number: data.chassis_number,
      // Inventory & Warranty
      total_sold: Number(data.total_sold) || 0,
      units_in_stock: Number(data.units_in_stock) || 0,
      warranty_period_months: Number(data.warranty_period_months) || 12,
      // Advanced Features
      smart_display: data.smart_display,
      gps_navigation: data.gps_navigation,
      anti_theft_system: data.anti_theft_system,
      mobile_app_connectivity: data.mobile_app_connectivity,
      led_lighting_system: data.led_lighting_system,
      regenerative_braking: data.regenerative_braking,
      // Technical Specifications
      motor_output: data.motor_output,
      battery: data.battery,
      weight: data.weight,
      connectivity_mobile_app: data.connectivity_mobile_app,
      connectivity_gps_tracking: data.connectivity_gps_tracking,
      connectivity_bluetooth: data.connectivity_bluetooth,
    };

    const { error } = await supabase
      .from('scooters')
      .update(fullData)
      .eq('id', id);
    
    // If error due to missing columns, try with basic fields only
    if (error && (error.message.includes('column') || error.message.includes('anti_theft_system') || error.message.includes('does not exist'))) {
      console.log('Advanced columns not found, updating with basic fields only');
      const basicData = {
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
      };
      const { error: basicError } = await supabase
        .from('scooters')
        .update(basicData)
        .eq('id', id);
      if (basicError) {
        alert("Error updating scooter: " + basicError.message);
        return;
      }
      alert("Scooter updated successfully! Note: Advanced features columns need to be added to the database.");
    } else if (error) {
      alert("Error updating scooter: " + error.message);
      return;
    } else {
      alert("Scooter updated successfully!");
    }
    
    fetchScooters();
    resetForm();
    setIsEditing(false);
    setEditId(null);
  };

  const deleteScooter = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this scooter?")) return;
    const { error } = await supabase.from('scooters').delete().eq('id', id);
    if (error) return alert("Error deleting scooter: " + error.message);
    
    // If we're on a page that might be empty after deletion, go to previous page
    if (scooters.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      fetchScooters();
    }
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

  // Pagination functions
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex space-x-2">
          <button 
            onClick={() => navigate("/admin-login")}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            ← Back to Login
          </button>
          <button 
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            🏠 Dashboard
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search scooters by name, description, price, speed, or range..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Clear
            </button>
          )}
        </div>
        {searchTerm && (
          <p className="text-sm text-gray-600 mt-2">
            Found {filteredScooters.length} scooter(s) matching "{searchTerm}"
          </p>
        )}
      </div>
      {/* Form */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6 text-white">
        <h2 className="text-xl mb-3">{isEditing ? "Edit Scooter" : "Add New Scooter"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <input name="name" placeholder="Name*" value={formData.name} onChange={handleChange} className="p-2 m-1 rounded text-black w-full" />
          <input name="price" placeholder="Price*" value={formData.price} onChange={handleChange} className="p-2 m-1 rounded text-black w-full" />
          <input name="max_speed" placeholder="Max Speed" value={formData.max_speed} onChange={handleChange} className="p-2 m-1 rounded text-black w-full" />
          <input name="max_range" placeholder="Max Range" value={formData.max_range} onChange={handleChange} className="p-2 m-1 rounded text-black w-full" />
          <input name="charge_time" placeholder="Charge Time" value={formData.charge_time} onChange={handleChange} className="p-2 m-1 rounded text-black w-full" />
          {/* Image Upload Fields */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Image 1</label>
            <div className="flex space-x-2">
              <input 
                name="image_1_url" 
                placeholder="Image 1 URL" 
                value={formData.image_1_url} 
                onChange={handleChange} 
                className="p-2 rounded text-black w-full" 
              />
              <input 
                type="file" 
                accept="image/svg+xml,image/jpeg,image/jpg,image/png"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file, 'image_1_url');
                }}
                className="p-2 rounded text-black"
                disabled={uploading}
              />
            </div>
                {formData.image_1_url && (
                  <img src={formData.image_1_url} alt="Preview" className="w-20 h-20 object-cover rounded" />
                )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Image 2</label>
            <div className="flex space-x-2">
              <input 
                name="image_2_url" 
                placeholder="Image 2 URL" 
                value={formData.image_2_url} 
                onChange={handleChange} 
                className="p-2 rounded text-black w-full" 
              />
              <input 
                type="file" 
                accept="image/svg+xml,image/jpeg,image/jpg,image/png"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file, 'image_2_url');
                }}
                className="p-2 rounded text-black"
                disabled={uploading}
              />
            </div>
                {formData.image_2_url && (
                  <img src={formData.image_2_url} alt="Preview" className="w-20 h-20 object-cover rounded" />
                )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Thumbnail</label>
            <div className="flex space-x-2">
              <input 
                name="thumbnail_url" 
                placeholder="Thumbnail URL" 
                value={formData.thumbnail_url} 
                onChange={handleChange} 
                className="p-2 rounded text-black w-full" 
              />
              <input 
                type="file" 
                accept="image/svg+xml,image/jpeg,image/jpg,image/png"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file, 'thumbnail_url');
                }}
                className="p-2 rounded text-black"
                disabled={uploading}
              />
            </div>
                {formData.thumbnail_url && (
                  <img src={formData.thumbnail_url} alt="Preview" className="w-20 h-20 object-cover rounded" />
                )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Image 3</label>
            <div className="flex space-x-2">
              <input 
                name="image_3_url" 
                placeholder="Image 3 URL" 
                value={formData.image_3_url} 
                onChange={handleChange} 
                className="p-2 rounded text-black w-full" 
              />
              <input 
                type="file" 
                accept="image/svg+xml,image/jpeg,image/jpg,image/png"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file, 'image_3_url');
                }}
                className="p-2 rounded text-black"
                disabled={uploading}
              />
            </div>
                {formData.image_3_url && (
                  <img src={formData.image_3_url} alt="Preview" className="w-20 h-20 object-cover rounded" />
                )}
          </div>
          <textarea name="description" placeholder="Description" value={formData.description || ""} onChange={handleChange} className="p-2 m-1 rounded text-black w-full" />
          
          {/* Serial Numbers */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-md font-semibold mb-2">Serial Numbers</h3>
          </div>
          <input name="serial_number" placeholder="Serial Number" value={formData.serial_number} onChange={handleChange} className="p-2 m-1 rounded text-black w-full" />
          <input name="motor_number" placeholder="Motor Number" value={formData.motor_number} onChange={handleChange} className="p-2 m-1 rounded text-black w-full" />
          <input name="chassis_number" placeholder="Chassis Number" value={formData.chassis_number} onChange={handleChange} className="p-2 m-1 rounded text-black w-full" />
          
          {/* Inventory & Warranty */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-md font-semibold mb-2">Inventory & Warranty</h3>
          </div>
          <input name="units_in_stock" type="number" placeholder="Units in Stock" value={formData.units_in_stock} onChange={handleChange} className="p-2 m-1 rounded text-black w-full" />
          <input name="total_sold" type="number" placeholder="Total Sold" value={formData.total_sold} onChange={handleChange} className="p-2 m-1 rounded text-black w-full" />
          <input name="warranty_period_months" type="number" placeholder="Warranty Period (months)" value={formData.warranty_period_months} onChange={handleChange} className="p-2 m-1 rounded text-black w-full" />
          
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

        {/* Advanced Features */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Advanced Features</h3>
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded mb-4">
            <p className="text-sm">
              <strong>Note:</strong> Advanced features are for display purposes only. 
              The database columns for these features need to be added to store them permanently.
              Basic scooter information will be saved successfully.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="smart_display" checked={formData.smart_display} onChange={handleChange} />
              <span>Smart Digital Display</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="gps_navigation" checked={formData.gps_navigation} onChange={handleChange} />
              <span>GPS Navigation</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="anti_theft_system" checked={formData.anti_theft_system} onChange={handleChange} />
              <span>Anti-theft System</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="mobile_app_connectivity" checked={formData.mobile_app_connectivity} onChange={handleChange} />
              <span>Mobile App Connectivity</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="led_lighting_system" checked={formData.led_lighting_system} onChange={handleChange} />
              <span>LED Lighting System</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="regenerative_braking" checked={formData.regenerative_braking} onChange={handleChange} />
              <span>Regenerative Braking</span>
            </label>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Technical Specifications</h3>
          <div className="bg-blue-100 border border-blue-400 text-blue-800 px-4 py-3 rounded mb-4">
            <p className="text-sm">
              <strong>Note:</strong> Technical specifications are for display purposes only. 
              The database columns for these specs need to be added to store them permanently.
              Basic scooter information will be saved successfully.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Performance</h4>
              <input name="motor_output" placeholder="Motor Output (e.g., 3500W)" value={formData.motor_output} onChange={handleChange} className="p-2 m-1 rounded text-black w-full" />
              <input name="battery" placeholder="Battery (e.g., 20Ah)" value={formData.battery} onChange={handleChange} className="p-2 m-1 rounded text-black w-full" />
              <input name="weight" placeholder="Weight (e.g., 65 kg)" value={formData.weight} onChange={handleChange} className="p-2 m-1 rounded text-black w-full" />
            </div>
            <div>
              <h4 className="font-semibold mb-2">Connectivity</h4>
              <input name="connectivity_mobile_app" placeholder="Mobile App (e.g., iOS & Android)" value={formData.connectivity_mobile_app} onChange={handleChange} className="p-2 m-1 rounded text-black w-full" />
              <input name="connectivity_gps_tracking" placeholder="GPS Tracking (e.g., Built-in)" value={formData.connectivity_gps_tracking} onChange={handleChange} className="p-2 m-1 rounded text-black w-full" />
              <input name="connectivity_bluetooth" placeholder="Bluetooth (e.g., 5.0)" value={formData.connectivity_bluetooth} onChange={handleChange} className="p-2 m-1 rounded text-black w-full" />
            </div>
          </div>
        </div>
        {isEditing ? (
          <button 
            onClick={handleSave} 
            className="bg-yellow-500 px-4 py-2 rounded mt-2 disabled:opacity-50"
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Save'}
          </button>
        ) : (
          <button 
            onClick={handleAdd} 
            className="bg-green-500 px-4 py-2 rounded mt-2 disabled:opacity-50"
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Add'}
          </button>
        )}
      </div>
      {/* Existing Scooters */}
      {searchTerm && filteredScooters.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">🔍 No scooters found</div>
          <p className="text-gray-400">Try adjusting your search terms</p>
          <button
            onClick={() => setSearchTerm("")}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {(searchTerm ? filteredScooters : scooters).map((s) => (
          <div key={s.id} className="bg-gray-900 text-white rounded-lg shadow-lg p-4">
            <img src={s.image_1_url || s.thumbnail_url || '/placeholder.svg'} alt={s.name} className="rounded-lg mb-3" />
            <div className="flex flex-wrap items-center justify-between mb-2">
              <h3 className="text-xl font-bold">{s.name}</h3>
              <span className={`px-2 py-1 rounded text-xs font-semibold ml-2 ${s.is_active ? 'bg-green-600' : 'bg-gray-600'}`}>{s.is_active ? 'Active' : 'Inactive'}</span>
              {s.is_featured && <span className="ml-2 px-2 py-1 rounded text-xs font-semibold bg-yellow-500 text-black">Featured</span>}
            </div>
            <p className="text-xs text-gray-400 mb-1">ID: {s.id}</p>
            <p className="text-sm text-gray-300 mb-2">Display Order: {s.display_order}</p>
            {s.serial_number && <p className="text-xs text-gray-400">Serial: {s.serial_number}</p>}
            {s.motor_number && <p className="text-xs text-gray-400">Motor: {s.motor_number}</p>}
            {s.chassis_number && <p className="text-xs text-gray-400">Chassis: {s.chassis_number}</p>}
            <div className="text-xs text-gray-400 space-y-1 my-2">
              {s.units_in_stock !== undefined && <p>📦 In Stock: {s.units_in_stock}</p>}
              {s.total_sold !== undefined && <p>✅ Sold: {s.total_sold}</p>}
              {s.warranty_period_months && <p>🛡️ Warranty: {s.warranty_period_months} months</p>}
            </div>
            <p>{s.description}</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="text-blue-400 font-semibold">Price: {s.price}</div>
              <div>⚡ {s.max_speed}</div>
              <div>🔋 {s.max_range}</div>
              <div>⏳ {s.charge_time}</div>
            </div>

            {/* Advanced Features */}
            <div className="mt-3">
              <h4 className="font-semibold text-sm mb-1">Advanced Features:</h4>
              <div className="flex flex-wrap gap-1 text-xs">
                {s.smart_display && <span className="bg-blue-600 px-2 py-1 rounded">Smart Display</span>}
                {s.gps_navigation && <span className="bg-green-600 px-2 py-1 rounded">GPS Navigation</span>}
                {s.anti_theft_system && <span className="bg-red-600 px-2 py-1 rounded">Anti-theft</span>}
                {s.mobile_app_connectivity && <span className="bg-purple-600 px-2 py-1 rounded">Mobile App</span>}
                {s.led_lighting_system && <span className="bg-yellow-600 px-2 py-1 rounded">LED Lighting</span>}
                {s.regenerative_braking && <span className="bg-orange-600 px-2 py-1 rounded">Regen Braking</span>}
              </div>
        </div>

            {/* Technical Specifications */}
            <div className="mt-3">
              <h4 className="font-semibold text-sm mb-1">Technical Specs:</h4>
              <div className="text-xs space-y-1">
                {s.motor_output && <div>⚡ Motor Output (W): {s.motor_output}</div>}
                {s.battery && <div>🔋 Battery (Ah): {s.battery}</div>}
                {s.weight && <div>⚖️ Weight: {s.weight}</div>}
                {s.connectivity_mobile_app && <div>📱 Mobile App: {s.connectivity_mobile_app}</div>}
                {s.connectivity_gps_tracking && <div>📡 GPS: {s.connectivity_gps_tracking}</div>}
                {s.connectivity_bluetooth && <div>🔊 Bluetooth: {s.connectivity_bluetooth}</div>}
              </div>
            </div>
            <div className="mt-3 flex gap-2 flex-wrap">
              <button onClick={() => handleEdit(s)} className="bg-yellow-500 px-3 py-1 rounded">
                Edit
              </button>
              <button onClick={() => handleDelete(s.id)} className="bg-red-500 px-3 py-1 rounded">
                Delete
              </button>
              {s.units_in_stock > 0 && (
                <button 
                  onClick={async () => {
                    if (window.confirm(`Mark 1 unit of ${s.name} as sold?`)) {
                      const newTotalSold = s.total_sold + 1;
                      const newUnitsInStock = s.units_in_stock - 1;
                      await supabase
                        .from('scooters')
                        .update({ total_sold: newTotalSold, units_in_stock: newUnitsInStock })
                        .eq('id', s.id);
                      fetchScooters();
                      alert('Unit marked as sold! Warranty period started.');
                    }
                  }}
                  className="bg-green-600 px-3 py-1 rounded"
                >
                  Mark as Sold
                </button>
              )}
            </div>
          </div>
        ))}
        </div>
      )}

      {/* Pagination - Only show when not searching */}
      {!searchTerm && totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded ${
              currentPage === 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Previous
          </button>
          
          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-3 py-2 rounded ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 rounded ${
              currentPage === totalPages
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Page info */}
      <div className="text-center mt-4 text-gray-600">
        {searchTerm ? (
          <span>
            Showing {filteredScooters.length} search result(s) for "{searchTerm}"
          </span>
        ) : (
          <span>
            Showing page {currentPage} of {totalPages} ({scooters.length} scooters on this page)
          </span>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
