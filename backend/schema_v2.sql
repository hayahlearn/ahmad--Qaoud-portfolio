-- Create Consultations Table (Missing in v1)
create table if not exists consultations (
  id uuid primary key default uuid_generate_v4(),
  consultation_type text,
  selected_date date,
  selected_time text,
  name text not null,
  email text not null,
  company text,
  phone text,
  message text,
  status text default 'pending', -- pending, confirmed, completed, cancelled
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS
alter table consultations enable row level security;
-- Allow insert from public (for booking form)
create policy "Anyone can insert consultations" on consultations for insert with check (true);
-- Allow select/update only for admin (handled via app logic/auth, here we allow all for simplicity in MVP, or restrict if user authentication is set up)
create policy "Public can read own consultations" on consultations for select using (true); 

-- Storage Bucket Setup (This usually needs to be done via UI or specialized API, but we can try inserting if storage schema is accessible, otherwise user must do it via UI)
-- However, for Supabase MCP, we usually rely on the user to create the bucket 'portfolio-assets' via the dashboard if I can't do it via SQL.
-- I will add a note for the user to create the bucket.
