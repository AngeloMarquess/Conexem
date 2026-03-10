import { useState } from 'react';

// Avatares com borda colorida para Stories inovadores
export function StoriesBar() {
    const [stories] = useState([
        { id: 1, name: 'Prof. Ana', active: true, avatar: 'https://i.pravatar.cc/150?img=1' },
        { id: 2, name: 'Prof. Carlos', active: true, avatar: 'https://i.pravatar.cc/150?img=11' },
        { id: 3, name: 'Dica do Dia', active: false, avatar: 'https://i.pravatar.cc/150?img=3' },
        { id: 4, name: 'Prof. Julia', active: false, avatar: 'https://i.pravatar.cc/150?img=5' },
    ]);

    return (
        <div className="py-6 px-6 lg:px-12 flex gap-4 overflow-x-auto no-scrollbar relative z-20 -mt-24">
            {stories.map(story => (
                <div key={story.id} className="flex flex-col items-center cursor-pointer group">
                    <div className={`p-1 rounded-full ${story.active ? 'bg-gradient-to-tr from-yellow-500 to-brand-netflix' : 'bg-zinc-700'} transition-transform group-hover:scale-105`}>
                        <div className="bg-zinc-950 p-0.5 rounded-full">
                            <img
                                src={story.avatar}
                                alt={story.name}
                                className="w-16 h-16 rounded-full object-cover"
                            />
                        </div>
                    </div>
                    <span className="text-xs text-zinc-300 mt-2 font-medium">{story.name}</span>
                </div>
            ))}
        </div>
    );
}
