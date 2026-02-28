import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Only create client if we have credentials (avoids build-time errors)
let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };

export interface AuditRequest {
  email: string;
  website: string;
  business_type?: string;
  business_description?: string;
  primary_goal?: string;
  created_at?: string;
}

export async function submitAuditRequest(data: AuditRequest) {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }
  
  const { error } = await supabase
    .from('audit_requests')
    .insert([data]);
  
  if (error) throw error;
  return true;
}

// Business types for the dropdown
export const BUSINESS_TYPES = [
  { value: 'restaurant', label: 'Restaurant / Food Service' },
  { value: 'contractor', label: 'Contractor / Home Services' },
  { value: 'ecommerce', label: 'E-commerce / Online Store' },
  { value: 'saas', label: 'SaaS / Software' },
  { value: 'agency', label: 'Agency / Professional Services' },
  { value: 'portfolio', label: 'Portfolio / Personal' },
  { value: 'nonprofit', label: 'Nonprofit / Organization' },
  { value: 'local', label: 'Local Business' },
  { value: 'other', label: 'Other' },
];

export const PRIMARY_GOALS = [
  { value: 'book', label: 'Book appointments / reservations' },
  { value: 'call', label: 'Get phone calls' },
  { value: 'buy', label: 'Sell products online' },
  { value: 'signup', label: 'Get signups / leads' },
  { value: 'contact', label: 'Get contact form submissions' },
  { value: 'info', label: 'Provide information' },
  { value: 'other', label: 'Other' },
];
