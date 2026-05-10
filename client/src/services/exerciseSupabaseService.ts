import { supabase } from "../lib/supabaseClient";
import type { Exercise } from "../types/gym";

type SupabaseExerciseRow = {
  id: string;
  name: string;
  muscle_group: string;
  tags: string[];
  image_url: string | null;
};

function mapExerciseFromSupabase(row: SupabaseExerciseRow): Exercise {
  return {
    id: row.id,
    name: row.name,
    muscleGroup: row.muscle_group,
    tags: row.tags,
    imageUrl: row.image_url,
  };
}

export async function getSupabaseExercises(userId: string): Promise<Exercise[]> {
  const { data, error } = await supabase
    .from("exercises")
    .select("id, name, muscle_group, tags, image_url")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(mapExerciseFromSupabase);
}

export async function createSupabaseExercise(
  userId: string,
  exercise: Omit<Exercise, "id">
): Promise<Exercise> {
  const { data, error } = await supabase
    .from("exercises")
    .insert({
      user_id: userId,
      name: exercise.name,
      muscle_group: exercise.muscleGroup,
      tags: exercise.tags,
      image_url: exercise.imageUrl ?? null,
      source: "user",
      is_public: false,
    })
    .select("id, name, muscle_group, tags, image_url")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapExerciseFromSupabase(data);
}
