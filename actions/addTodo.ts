"use server";
import { revalidatePath } from 'next/cache';
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "YOUR_SUP_URL";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey ?? "");
export default async function addTodo(formData: FormData) {
  "use server";
  const todoItem = formData.get("todo");
  if (!todoItem) {
    return;
  }
  // Save todo item to supabase database
  const { data, error } = await supabase.from("todos").insert({
    todo: todoItem,
    created_at: new Date().toISOString(),
  });

  revalidatePath('/');
}


