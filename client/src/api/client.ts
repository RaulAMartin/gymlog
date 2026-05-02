import type { Exercise, ExerciseRM, TrainingSession } from "../types/gym";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.message || "Ha ocurrido un error al comunicarse con la API."
    );
  }

  return response.json() as Promise<T>;
}

export function getExercises() {
  return request<Exercise[]>("/exercises");
}

export function createExercise(exercise: Omit<Exercise, "id">) {
  return request<Exercise>("/exercises", {
    method: "POST",
    body: JSON.stringify(exercise),
  });
}

export function updateExercise(id: string, exercise: Partial<Exercise>) {
  return request<Exercise>(`/exercises/${id}`, {
    method: "PUT",
    body: JSON.stringify(exercise),
  });
}

export function deleteExercise(id: string) {
  return request<{ message: string }>(`/exercises/${id}`, {
    method: "DELETE",
  });
}

export function getSessions() {
  return request<TrainingSession[]>("/sessions");
}

export function createSession(session: Omit<TrainingSession, "id">) {
  return request<TrainingSession>("/sessions", {
    method: "POST",
    body: JSON.stringify(session),
  });
}

export function getRms() {
  return request<ExerciseRM[]>("/rms");
}

export function createOrUpdateRm(rm: Omit<ExerciseRM, "id" | "updatedAt">) {
  return request<ExerciseRM>("/rms", {
    method: "POST",
    body: JSON.stringify(rm),
  });
}
