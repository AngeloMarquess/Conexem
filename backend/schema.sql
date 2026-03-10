-- EdTech Platform Database Schema
-- Run this in the Supabase SQL Editor

-- 1. Users Extension (We assume Supabase Auth 'auth.users' handles authentication)
-- Here we'll create a public.users table that links to auth.users if needed, or just handle user roles.
-- For simplicity as requested, we'll create `users` but typically in Supabase you use `auth.users` and a profile table.
CREATE TYPE user_role AS ENUM ('admin', 'teacher', 'student');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Ideally references auth.users(id)
    role user_role NOT NULL DEFAULT 'student',
    full_name TEXT NOT NULL,
    username TEXT,
    email TEXT UNIQUE NOT NULL,
    whatsapp TEXT,
    date_of_birth DATE,
    avatar_url TEXT,
    -- Teacher specific fields
    area_atuacao TEXT,
    diploma_url TEXT,
    certificados_urls TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

-- 2. Courses
CREATE TYPE course_origin AS ENUM ('native', 'onipublish');

CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    category TEXT NOT NULL,
    origin course_origin NOT NULL DEFAULT 'native',
    external_id TEXT, -- Reference ID for synced systems like Onipublish
    instructor_id UUID REFERENCES users(id) ON DELETE SET NULL, -- Connect courses to specific teachers natively
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Modules
CREATE TABLE modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    order_index INTEGER NOT NULL
);

-- 4. Lessons
CREATE TYPE lesson_type AS ENUM ('video', 'quiz', 'practical_exercise');

CREATE TABLE lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    video_url TEXT,
    duration_seconds INTEGER NOT NULL DEFAULT 0,
    type lesson_type NOT NULL DEFAULT 'video',
    order_index INTEGER NOT NULL
);

-- 5. User Progress (Continuar Assistindo)
CREATE TYPE progress_status AS ENUM ('not_started', 'in_progress', 'completed');

CREATE TABLE user_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    status progress_status NOT NULL DEFAULT 'not_started',
    watch_time_seconds INTEGER NOT NULL DEFAULT 0,
    completed_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, lesson_id)
);

-- 6. Gamification Badges
CREATE TABLE gamification_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    icon_url TEXT,
    required_points INTEGER NOT NULL DEFAULT 0
);

-- 7. User Gamification
CREATE TABLE user_gamification (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    total_points INTEGER NOT NULL DEFAULT 0,
    current_level INTEGER NOT NULL DEFAULT 1
);

-- Relation table for earned badges
CREATE TABLE user_earned_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    badge_id UUID NOT NULL REFERENCES gamification_badges(id) ON DELETE CASCADE,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, badge_id)
);

-- 8. Stories
CREATE TABLE stories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT,
    media_url TEXT,
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + interval '24 hours'),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Telemetry Logs (Churn Analytics)
CREATE TYPE action_type_enum AS ENUM ('login', 'lesson_start', 'lesson_complete', 'story_view');

CREATE TABLE telemetry_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    action_type action_type_enum NOT NULL,
    lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL, -- Optional context
    story_id UUID REFERENCES stories(id) ON DELETE SET NULL,  -- Optional context
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Storage Buckets (Execute this through UI or Supabase SQL if permissions allow)
-- insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true);
-- insert into storage.buckets (id, name, public) values ('thumbnails', 'thumbnails', true);
-- insert into storage.buckets (id, name, public) values ('documents', 'documents', true);

-- 11. Trigger for Supabase Auth -> Public Users
-- Automatically create a profile when a user signs up.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, role)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'full_name', 'Usuário ' || split_part(new.email, '@', 1)),
    'student'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger binding
-- DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
-- CREATE TRIGGER on_auth_user_created
--   AFTER INSERT ON auth.users
--   FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
