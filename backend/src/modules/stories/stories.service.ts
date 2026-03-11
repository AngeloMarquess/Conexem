import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export class StoriesService {

    async createStory(data: { teacherId: string; content?: string; mediaUrl?: string; expiresInHours: number }) {
        const { data: story, error } = await supabase
            .from('stories')
            .insert({
                teacher_id: data.teacherId,
                content: data.content || null,
                media_url: data.mediaUrl || null,
                expires_at: new Date(Date.now() + data.expiresInHours * 60 * 60 * 1000).toISOString()
            })
            .select()
            .single();

        if (error) {
            throw new Error(`Insert Story Error: ${error.message}`);
        }

        return story;
    }

    async getActiveStories() {
        const now = new Date().toISOString();

        const { data: stories, error } = await supabase
            .from('stories')
            .select(`
                id,
                content,
                media_url,
                expires_at,
                created_at,
                teacher:users!stories_teacher_id_fkey (
                    id,
                    full_name,
                    avatar_url
                )
            `)
            .gt('expires_at', now)
            .order('created_at', { ascending: false });

        if (error) {
            throw new Error(`Fetch Active Stories Error: ${error.message}`);
        }

        return stories;
    }
}
