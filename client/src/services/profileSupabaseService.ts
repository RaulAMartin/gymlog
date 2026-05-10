import { supabase } from "../lib/supabaseClient";

export type UserProfile = {
  id: string;
  username: string | null;
  fullName: string | null;
  avatarUrl: string | null;
};

type SupabaseProfileRow = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
};

function mapProfile(row: SupabaseProfileRow): UserProfile {
  return {
    id: row.id,
    username: row.username,
    fullName: row.full_name,
    avatarUrl: row.avatar_url,
  };
}

export async function getProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, full_name, avatar_url")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? mapProfile(data) : null;
}

export async function updateProfile(
  userId: string,
  profile: {
    username: string;
    fullName: string;
  }
): Promise<UserProfile> {
  const { data, error } = await supabase
    .from("profiles")
    .update({
      username: profile.username,
      full_name: profile.fullName,
    })
    .eq("id", userId)
    .select("id, username, full_name, avatar_url")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapProfile(data);
}
