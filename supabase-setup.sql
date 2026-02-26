-- Create the table for site dynamic content
CREATE TABLE site_content (
  section text primary key,
  content jsonb not null
);

-- Enable RLS
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public read access"
  ON site_content FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users (Admin) to insert/update content
CREATE POLICY "Admin update access"
  ON site_content FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- --- STORAGE BUCKET SETUP --- --
-- Create the portfolio-media bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public to view media
CREATE POLICY "Public view access"
  ON storage.objects FOR SELECT
  TO public
  USING ( bucket_id = 'portfolio-media' );

-- Allow admin to upload media
CREATE POLICY "Admin upload access"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK ( bucket_id = 'portfolio-media' );

-- Allow admin to update media
CREATE POLICY "Admin edit access"
  ON storage.objects FOR UPDATE
  TO authenticated
  WITH CHECK ( bucket_id = 'portfolio-media' );

-- Allow admin to delete media
CREATE POLICY "Admin delete access"
  ON storage.objects FOR DELETE
  TO authenticated
  USING ( bucket_id = 'portfolio-media' );

-- --- CONTACT MESSAGES SETUP --- --
CREATE TABLE contact_messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  is_read boolean default false not null
);

-- Enable RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow public to insert messages
CREATE POLICY "Public insert access for messages"
  ON contact_messages FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow authenticated users (Admin) to view/manage messages
CREATE POLICY "Admin manage messages access"
  ON contact_messages FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
