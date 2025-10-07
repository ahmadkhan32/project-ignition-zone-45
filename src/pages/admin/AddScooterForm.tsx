import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NavigationBar } from "@/components/NavigationBar";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

export default function AddScooterForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [features, setFeatures] = useState("");
  const [specs, setSpecs] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Prepare features and specs as JSON if possible, else as string
    let featuresValue: unknown = features;
    let specsValue: unknown = specs;
    try {
      featuresValue = features ? JSON.parse(features) : null;
    } catch {
      featuresValue = features;
    }
    try {
      specsValue = specs ? JSON.parse(specs) : null;
    } catch {
      specsValue = specs;
    }

    const scooter = {
      name,
      description,
      price,
      features: featuresValue,
      specs: specsValue,
      image_1_url: imageUrl,
    };

    const { error } = await supabase.from("scooters").insert([scooter]);
    if (error) {
      setMessage("Error adding scooter: " + error.message);
    } else {
      setMessage("Scooter added successfully!");
      setTimeout(() => navigate(-1), 1000);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavigationBar />
      <main className="flex-1 flex items-center justify-center pt-20">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-8 bg-card rounded shadow-md w-full max-w-lg"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Add New Scooter</h2>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Scooter Name"
            className="w-full border px-3 py-2 rounded text-black"
            required
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full border px-3 py-2 rounded text-black"
          />
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="w-full border px-3 py-2 rounded text-black"
          />
          <input
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            placeholder='Features (JSON array or comma separated, e.g. ["ABS","Bluetooth"] or ABS,Bluetooth)'
            className="w-full border px-3 py-2 rounded text-black"
          />
          <input
            value={specs}
            onChange={(e) => setSpecs(e.target.value)}
            placeholder='Specs (JSON object, e.g. {"battery":2.5,"range":85})'
            className="w-full border px-3 py-2 rounded text-black"
          />
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URL"
            className="w-full border px-3 py-2 rounded text-black"
          />
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Scooter"}
            </Button>
          </div>
          {message && <div className="text-center text-sm mt-2">{message}</div>}
        </form>
      </main>
      <Footer />
    </div>
  );
}