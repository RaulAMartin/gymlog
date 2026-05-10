import { supabase } from "../lib/supabaseClient";
import type { TrainingSession } from "../types/gym";

type SupabaseSessionSetRow = {
  id: string;
  reps: number;
  weight: number;
};

type SupabaseSessionExerciseRow = {
  id: string;
  exercise_id: string | null;
  exercise_name: string;
  session_sets: SupabaseSessionSetRow[];
};

type SupabaseSessionRow = {
  id: string;
  date: string;
  notes: string | null;
  session_exercises: SupabaseSessionExerciseRow[];
};

function mapSessionFromSupabase(row: SupabaseSessionRow): TrainingSession {
  return {
    id: row.id,
    date: row.date,
    notes: row.notes ?? "",
    exercises: row.session_exercises.map((exercise) => ({
      exerciseId: exercise.exercise_id ?? "",
      exerciseName: exercise.exercise_name,
      sets: exercise.session_sets.map((set) => ({
        reps: Number(set.reps),
        weight: Number(set.weight),
      })),
    })),
  };
}

export async function getSupabaseSessions(
  userId: string
): Promise<TrainingSession[]> {
  const { data, error } = await supabase
    .from("sessions")
    .select(
      `
      id,
      date,
      notes,
      session_exercises (
        id,
        exercise_id,
        exercise_name,
        session_sets (
          id,
          reps,
          weight
        )
      )
    `
    )
    .eq("user_id", userId)
    .order("date", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return ((data ?? []) as SupabaseSessionRow[]).map(mapSessionFromSupabase);
}

export async function createSupabaseSession(
  userId: string,
  session: Omit<TrainingSession, "id">
): Promise<TrainingSession> {
  const { data: createdSession, error: sessionError } = await supabase
    .from("sessions")
    .insert({
      user_id: userId,
      date: session.date,
      notes: session.notes ?? "",
    })
    .select("id, date, notes")
    .single();

  if (sessionError) {
    throw new Error(sessionError.message);
  }

  for (const exercise of session.exercises) {
    const { data: createdSessionExercise, error: exerciseError } =
      await supabase
        .from("session_exercises")
        .insert({
          session_id: createdSession.id,
          exercise_id: exercise.exerciseId || null,
          exercise_name: exercise.exerciseName,
        })
        .select("id")
        .single();

    if (exerciseError) {
      throw new Error(exerciseError.message);
    }

    const setsToInsert = exercise.sets.map((set) => ({
      session_exercise_id: createdSessionExercise.id,
      reps: set.reps,
      weight: set.weight,
    }));

    const { error: setsError } = await supabase
      .from("session_sets")
      .insert(setsToInsert);

    if (setsError) {
      throw new Error(setsError.message);
    }
  }

  const savedSessions = await getSupabaseSessions(userId);
  const savedSession = savedSessions.find(
    (currentSession) => currentSession.id === createdSession.id
  );

  if (!savedSession) {
    throw new Error("No se pudo recuperar la sesión creada.");
  }

  return savedSession;
}

export async function updateSupabaseSession(
  userId: string,
  sessionId: string,
  session: Partial<TrainingSession>
): Promise<TrainingSession> {
  const { error: sessionError } = await supabase
    .from("sessions")
    .update({
      date: session.date,
      notes: session.notes ?? "",
    })
    .eq("id", sessionId)
    .eq("user_id", userId);

  if (sessionError) {
    throw new Error(sessionError.message);
  }

  if (session.exercises) {
    const { error: deleteExercisesError } = await supabase
      .from("session_exercises")
      .delete()
      .eq("session_id", sessionId);

    if (deleteExercisesError) {
      throw new Error(deleteExercisesError.message);
    }

    for (const exercise of session.exercises) {
      const { data: createdSessionExercise, error: exerciseError } =
        await supabase
          .from("session_exercises")
          .insert({
            session_id: sessionId,
            exercise_id: exercise.exerciseId || null,
            exercise_name: exercise.exerciseName,
          })
          .select("id")
          .single();

      if (exerciseError) {
        throw new Error(exerciseError.message);
      }

      const setsToInsert = exercise.sets.map((set) => ({
        session_exercise_id: createdSessionExercise.id,
        reps: set.reps,
        weight: set.weight,
      }));

      const { error: setsError } = await supabase
        .from("session_sets")
        .insert(setsToInsert);

      if (setsError) {
        throw new Error(setsError.message);
      }
    }
  }

  const savedSessions = await getSupabaseSessions(userId);
  const updatedSession = savedSessions.find(
    (currentSession) => currentSession.id === sessionId
  );

  if (!updatedSession) {
    throw new Error("No se pudo recuperar la sesión actualizada.");
  }

  return updatedSession;
}

export async function deleteSupabaseSession(
  userId: string,
  sessionId: string
): Promise<void> {
  const { error } = await supabase
    .from("sessions")
    .delete()
    .eq("id", sessionId)
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }
}
