import { createClient } from '@supabase/supabase-js';

// Setup scoped Supabase Client using Service Role for backend tasks
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

export class CourseService {
    async getAllCourses() {
        const { data, error } = await supabase
            .from('courses')
            .select(`
                id,
                title,
                category,
                origin,
                external_id,
                thumbnail_url,
                created_at,
                instructor:users(full_name)
            `);

        if (error) {
            console.error("Course Fetch Error:", error);
            throw error;
        }

        return data;
    }
}
