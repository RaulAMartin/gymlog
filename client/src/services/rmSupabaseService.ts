import { supabase } from "../lib/supabaseClient";
import type { ExerciseRM } from "../types/gym";

type SupabaseRmRow = {
  id: string;
  exercise_id: string;
  exercise_name: string;
  rm: number;
  updated_at: string;
};

function mapRmFromSupabase(row: SupabaseRmRow): ExerciseRM {
  return {
    id: row.id,
    exerciseId: row.exercise_id,
    exerciseName: row.exercise_name,
    rm: Number(row.rm),
    updatedAt: row.updated_at,
  };
}

export async function getSupabaseRms(userId: string): Promise<ExerciseRM[]> {
  const { data, error } = await supabase
    .from("rms")
    .select("id, exercise_id, exercise_name, rm, updated_at")
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(mapRmFromSupabase);
}

export async function createOrUpdateSupabaseRm(
  userId: string,
  rm: Omit<ExerciseRM, "id" | "updatedAt">
): Promise<ExerciseRM> {
  const { data: existingRm, error: existingError } = await supabase
    .from("rms")
    .select("id, exercise_id, exercise_name, rm, updated_at")
    .eq("user_id", userId)
    .eq("exercise_id", rm.exerciseId)
    .maybeSingle();

  if (existingError) {
    throw new Error(existingError.message);
  }

  if (existingRm) {
    const { data, error } = await supabase
      .from("rms")
      .update({
        exercise_name: rm.exerciseName,
        rm: rm.rm,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existingRm.id)
      .select("id, exercise_id, exercise_name, rm, updated_at")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return mapRmFromSupabase(data);
  }

  const { data, error } = await supabase
    .from("rms")
    .insert({
      user_id: userId,
      exercise_id: rm.exerciseId,
      exercise_name: rm.exerciseName,
      rm: rm.rm,
    })
    .select("id, exercise_id, exercise_name, rm, updated_at")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapRmFromSupabase(data);
}
