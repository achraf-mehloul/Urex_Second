/*
  # Create Registrations Table for Urex Bootcamp

  1. New Tables
    - `registrations`
      - `id` (uuid, primary key) - Unique identifier for each registration
      - `full_name` (text) - Student's first name
      - `last_name` (text) - Student's last name
      - `date_of_birth` (date) - Student's birth date
      - `major` (text) - Student's major/field of study
      - `department` (text) - University department
      - `campus` (text) - Campus location
      - `programming_knowledge` (text) - What they know about programming
      - `programming_goals` (text) - Their goals in programming
      - `created_at` (timestamptz) - Registration timestamp

  2. Security
    - Enable RLS on `registrations` table
    - Add policy for public insert (anyone can register)
    - Add policy for authenticated read (admin can view all registrations)
*/

CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  last_name text NOT NULL,
  date_of_birth date NOT NULL,
  major text NOT NULL,
  department text NOT NULL,
  campus text NOT NULL,
  programming_knowledge text NOT NULL,
  programming_goals text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can register"
  ON registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all registrations"
  ON registrations
  FOR SELECT
  TO authenticated
  USING (true);