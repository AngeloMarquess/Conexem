import { Header } from '../components/layout/Header';
import { HeroContinueWatching } from '../components/home/HeroContinueWatching';
import { StoriesBar } from '../components/home/StoriesBar';
import { CourseCarousel } from '../components/home/CourseCarousel';

export function Home() {
    return (
        <div className="min-h-screen bg-zinc-950 pb-20">
            <Header />

            <main>
                <HeroContinueWatching
                    courseTitle="Bootcamp Fullstack 2026"
                    lessonTitle="14. Introdução ao Tailwind v4"
                    progress={65}
                />

                <StoriesBar />

                <div className="space-y-8 mt-4">
                    <CourseCarousel
                        title="Recomendações para você"
                        items={[1, 2, 3, 4, 5, 6]}
                    />
                    <CourseCarousel
                        title="Trilhas Populares"
                        items={[1, 2, 3, 4, 5, 6]}
                    />
                </div>
            </main>
        </div>
    );
}
