import { HeroContinueWatching } from '../components/home/HeroContinueWatching';
import { CourseCarousel } from '../components/home/CourseCarousel';

const mockMyCourses = [
    {
        id: 'c1',
        title: 'Certificação em Growth Hacking B2B',
        thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
        teacher: 'Sâmia Ribeiro',
        progress: 75
    },
    {
        id: 'c2',
        title: 'Fundamentos do Design System com React',
        thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop',
        teacher: 'Daniel Oliveira',
        progress: 100
    },
    {
        id: 'c3',
        title: 'Como liderar equipes ágeis remote-first',
        thumbnailUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop',
        teacher: 'Carlos Santana',
        progress: 12
    }
];

const mockRecommendations = [
    {
        id: 'n1',
        title: 'Inteligência Artificial para Negócios Locais',
        thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2532&auto=format&fit=crop',
        teacher: 'Mariana Lima',
        duration: '4h 30m',
        isNew: true
    },
    {
        id: 'n2',
        title: 'Google Ads: Estruturando sua primeira campanha',
        thumbnailUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2676&auto=format&fit=crop',
        teacher: 'João Pedro',
        duration: '3h 15m'
    },
    {
        id: 'n3',
        title: 'Edição de Vídeo Mobile Express',
        thumbnailUrl: 'https://images.unsplash.com/photo-1574717024453-354056a3df3c?q=80&w=2670&auto=format&fit=crop',
        teacher: 'Amanda Costa',
        duration: '1h 45m'
    },
    {
        id: 'n4',
        title: 'Copywriting Persuasivo: Transforme leite em ouro',
        thumbnailUrl: 'https://images.unsplash.com/photo-1553484771-331da2d15904?q=80&w=2670&auto=format&fit=crop',
        teacher: 'Felipe Duarte',
        duration: '6h 00m'
    }
];

export function StudentDashboard() {
    return (
        <div className="container mx-auto px-4 md:px-8 py-8 w-full max-w-[1600px]">
            <HeroContinueWatching />

            <div className="mt-8">
                <CourseCarousel title="Sua Trilha e Progresso" courses={mockMyCourses} />
                <CourseCarousel title="Recomendados para você" courses={mockRecommendations} />
                <CourseCarousel title="Em Alta na Comunidade" courses={[...mockRecommendations].reverse()} />
            </div>
        </div>
    );
}
