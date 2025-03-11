import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

// Create a single supabase client for interacting with your database
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper function to invoke edge functions
export const invokeFunction = async <T>(
  functionName: string,
  payload?: any,
): Promise<T> => {
  const { data, error } = await supabase.functions.invoke<T>(functionName, {
    body: payload,
  });

  if (error) {
    console.error(`Error invoking function ${functionName}:`, error);
    throw error;
  }

  return data;
};

// Helper function to get image URL from Supabase Storage
export const getImageUrl = (bucket: string, path: string): string => {
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
};

// Helper function to upload image to Supabase Storage
export const uploadImage = async (bucket: string, path: string, file: File) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error uploading image:", error);
    throw error;
  }

  return data;
};
