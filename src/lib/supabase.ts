import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 데이터베이스 타입 정의
export type Study = {
  id: string;
  title: string;
  description: string | null;
  meeting_type: "online" | "offline" | "hybrid";
  tech_stack: string[];
  level: string;
  expected_knowledge: string | null;
  max_participants: number;
  region: string | null;
  contact_info: string;
  created_at: string;
};

export type Application = {
  id: string;
  study_id: string;
  nickname: string;
  contact: string;
  level: string | null;
  quiz_score: number | null;
  introduction: string | null;
  motivation: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

export type QuizQuestion = {
  id: string;
  tech_stack: string | null;
  question: string;
  options: Record<string, any>;
  correct_answer: string;
  difficulty: string;
};
