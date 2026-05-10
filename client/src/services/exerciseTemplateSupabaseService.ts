import { supabase } from "../lib/supabaseClient";
import type { Exercise } from "../types/gym";

type SupabaseExerciseTemplateRow = {
  id: string;
  name: string;
  muscle_group: string;
  tags: string[];
  image_url: string | null;
};

export type ExerciseTemplate = Exercise & {
  imageUrl?: string | null;
};

function mapTemplateFromSupabase(
  row: SupabaseExerciseTemplateRow
): ExerciseTemplate {
  return {
    id: row.id,
    name: row.name,
    muscleGroup: row.muscle_group,
    tags: row.tags,
    imageUrl: row.image_url,
  };
}

export async function getExerciseTemplates(): Promise<ExerciseTemplate[]> {
  const { data, error } = await supabase
    .from("exercises_templates")
    .select("id, name, muscle_group, tags, image_url")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(mapTemplateFromSupabase);
}
