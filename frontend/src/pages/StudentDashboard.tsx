import { useState, useEffect } from 'react';
import axios from 'axios';
import { HeroContinueWatching } from '../components/home/HeroContinueWatching';
import { CourseCarousel } from '../components/home/CourseCarousel';
import { StoriesBar } from '../components/home/StoriesBar';

interface BackendCourse {
    id: string;
    title: string;
    thumbnailUrl: string;
    category: string;
    origin: string;
    instructor_name: string | null;
}

export function StudentDashboard() {
    const [courses, setCourses] = useState<BackendCourse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/courses');
                setCourses(response.data.data || []);
            } catch (error) {
                console.error('Failed to fetch courses for dashboard', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    // Format for native component
    const formattedCourses = courses.map(c => ({
        id: c.id,
        title: c.title,
        thumbnailUrl: c.thumbnailUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop',
        teacher: c.instructor_name || 'Equipe Conexem',
        isNew: c.origin === 'onipublish' // Just as an example visual tag
    }));

    // For now, map the same list until we have advanced algorithms running
    const myCoursesList = formattedCourses.slice(0, 3).map(c => ({ ...c, progress: Math.floor(Math.random() * 100) }));

    return (
        <div className="container mx-auto px-4 md:px-8 py-8 w-full max-w-[1600px]">
            <StoriesBar />

            <HeroContinueWatching />

            <div className="mt-8">
                {loading ? (
                    <div className="w-full text-center py-12 text-slate-400">Loading courses...</div>
                ) : courses.length === 0 ? (
                    <div className="w-full text-center py-12 text-slate-500">Nenhum curso disponível no momento.</div>
                ) : (
                    <>
                        <CourseCarousel title="Sua Trilha e Progresso" courses={myCoursesList} />
                        <CourseCarousel title="Recomendados para você" courses={formattedCourses} />
                        <CourseCarousel title="Em Alta na Comunidade" courses={[...formattedCourses].reverse()} />
                    </>
                )}
            </div>
        </div>
    );
}
