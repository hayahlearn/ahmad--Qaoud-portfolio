-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Services Table
create table if not exists services (
  id uuid primary key default uuid_generate_v4(),
  title_ar text not null,
  title_en text not null,
  description_ar text,
  description_en text,
  icon_name text,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Projects Table
create table if not exists projects (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title_ar text not null,
  title_en text not null,
  category text,
  image_url text,
  description_ar text,
  description_en text,
  technologies text[], -- Array of strings
  link text,
  display_order integer default 0,
  featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 3. Blog Posts Table
create table if not exists blog_posts (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title_ar text not null,
  title_en text not null,
  summary_ar text,
  summary_en text,
  content_ar text,
  content_en text,
  author text default 'Ahmad Qaoud',
  cover_image text,
  is_published boolean default false,
  published_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 4. Testimonials Table
create table if not exists testimonials (
  id uuid primary key default uuid_generate_v4(),
  client_name_ar text not null,
  client_name_en text not null,
  company text,
  feedback_ar text,
  feedback_en text,
  rating integer default 5,
  avatar_url text,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 5. Site Settings / Stats Table
create table if not exists site_stats (
  id uuid primary key default uuid_generate_v4(),
  key text unique not null, -- e.g., 'happy_clients', 'projects_completed'
  label_ar text,
  label_en text,
  value text, -- can be number or string
  icon text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 6. Contact Messages
create table if not exists contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  status text default 'new', -- new, read, replied
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable Row Level Security (RLS) for security
alter table services enable row level security;
alter table projects enable row level security;
alter table blog_posts enable row level security;
alter table testimonials enable row level security;
alter table site_stats enable row level security;
alter table contact_messages enable row level security;

-- Create Policies (Public Read, Admin Write) - Simplified for initial setup
-- Allow Public Read Access
create policy "Public services are viewable by everyone" on services for select using (true);
create policy "Public projects are viewable by everyone" on projects for select using (true);
create policy "Public blog posts are viewable by everyone" on blog_posts for select using (true); -- checking is_published logic in app or add where clause here
create policy "Public testimonials are viewable by everyone" on testimonials for select using (true);
create policy "Public stats are viewable by everyone" on site_stats for select using (true);

-- Contact messages: Insert only for public
create policy "Anyone can insert contact messages" on contact_messages for insert with check (true);
