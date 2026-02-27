import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface AuditRequest {
  email: string;
  website: string;
  created_at?: string;
}

export async function submitAuditRequest(data: AuditRequest) {
  const { error } = await supabase
    .from('audit_requests')
    .insert([data]);
  
  if (error) throw error;
  return true;
}
