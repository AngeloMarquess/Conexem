import { useState, useEffect } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

interface Story {
    id: string;
    content: string | null;
    media_url: string | null;
    expires_at: string;
    created_at: string;
    teacher: {
        id: string;
        full_name: string;
        avatar_url: string | null;
    };
}

export function StoriesBar() {
    const [stories, setStories] = useState<Story[]>([]);
    const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                // Adjust to the right endpoint based on fastify prefixes
                const response = await axios.get('http://localhost:3000/api/stories/active');
                if (response.data.success && response.data.data) {
                    setStories(response.data.data);
                }
            } catch (err) {
                console.error('Failed to fetch active stories', err);
            }
        };

        fetchStories();
    }, []);

    const openStory = (index: number) => {
        setActiveStoryIndex(index);
    };

    const closeStory = () => {
        setActiveStoryIndex(null);
    };

    const nextStory = () => {
        if (activeStoryIndex !== null && activeStoryIndex < stories.length - 1) {
            setActiveStoryIndex(activeStoryIndex + 1);
        } else {
            closeStory();
        }
    };

    if (stories.length === 0) return null;

    const activeStory = activeStoryIndex !== null ? stories[activeStoryIndex] : null;

    return (
        <div className="w-full flex space-x-6 overflow-x-auto py-6 px-4 no-scrollbar">
            {stories.map((story, idx) => (
                <div
                    key={story.id}
                    className="flex flex-col items-center space-y-2 cursor-pointer flex-shrink-0"
                    onClick={() => openStory(idx)}
                >
                    <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-offset-4 ring-offset-wine-950 ring-amber-500 hover:scale-105 transition-transform duration-200">
                        <img
                            src={story.teacher.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(story.teacher.full_name)}&background=2A0B17&color=D68F4A`}
                            alt={story.teacher.full_name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className="text-xs text-slate-300 font-medium w-20 text-center truncate">
                        {story.teacher.full_name.split(' ')[0]}
                    </span>
                </div>
            ))}

            {/* Story Modal (Fullscreen) */}
            {activeStory && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
                    {/* Progress indicator simulation (basic) */}
                    <div className="absolute top-4 left-4 right-4 flex space-x-2 z-50 max-w-[400px] mx-auto">
                        {stories.map((s, idx) => (
                            <div key={s.id} className="h-1 flex-1 bg-white/20 rounded overflow-hidden">
                                <div
                                    className={`h-full bg-white transition-all ${idx < (activeStoryIndex || 0) ? 'w-full' :
                                            idx === activeStoryIndex ? 'w-full animate-[progress_5s_linear]' : 'w-0'
                                        }`}
                                    style={idx === activeStoryIndex ? { animationFillMode: 'forwards' } : {}}
                                    onAnimationEnd={nextStory}
                                ></div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={closeStory}
                        className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-50"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    <div className="w-full max-w-[400px] aspect-[9/16] bg-wine-900 relative rounded-2xl overflow-hidden flex items-center justify-center" onClick={nextStory}>
                        {activeStory.media_url ? (
                            <img src={activeStory.media_url} className="w-full h-full object-cover" alt="Story" />
                        ) : (
                            <div className="p-8 text-center">
                                <p className="text-white text-xl font-bold font-serif leading-relaxed">
                                    {activeStory.content}
                                </p>
                            </div>
                        )}

                        <div className="absolute bottom-6 left-6 flex items-center space-x-3">
                            <img
                                src={activeStory.teacher.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(activeStory.teacher.full_name)}&background=2A0B17&color=D68F4A`}
                                className="w-10 h-10 rounded-full border-2 border-white/20"
                                alt="Author"
                            />
                            <span className="text-white font-semibold text-sm shadow-black drop-shadow-md">
                                {activeStory.teacher.full_name}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
