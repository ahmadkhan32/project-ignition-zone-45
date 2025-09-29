import { supabase } from "../integrations/supabase/client";

export async function addScooter(payload: any, imageFile?: File) {
  // Optionally handle image upload here if needed
  const { data, error } = await supabase
    .from("scooters")
    .insert([payload]);
  if (error) throw error;
  return data;
}

export async function updateScooter(id: string, payload: any, imageFile?: File) {
  // Optionally handle image upload here if needed
  const { data, error } = await supabase
    .from("scooters")
    .update(payload)
    .eq("id", id);
  if (error) throw error;
  return data;
}
