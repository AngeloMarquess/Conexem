import { useState, useEffect } from 'react';
import { Search, Plus, Filter, Edit, Trash2, CloudRain, MonitorPlay, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Course {
    id: string;
    title: string;
    category: string;
    origin: 'native' | 'onipublish';
    external_id: string | null;
    thumbnail_url: string | null;
    instructor: { full_name: string } | null;
    created_at: string;
}

export function CourseList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // Should use proxy/env setup, using localhost directly for scaffolding phase
                const response = await axios.get('http://localhost:3000/api/courses');
                // Format output
                setCourses(response.data.data || []);
            } catch (err) {
                console.error("Failed to load courses", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Cursos</h1>
                    <p className="text-slate-500 text-sm mt-1">Gerencie os cursos nativos e os importados pela integração Onipublish.</p>
                </div>
                <Link
                    to="/admin/courses/new"
                    className="bg-wine-900 hover:bg-wine-950 text-white px-5 py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                    <Plus className="w-5 h-5" /> Novo Curso
                </Link>
            </div>

            {/* Filters and Search */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center gap-4 mb-6">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Buscar cursos por título ou categoria..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-wine-800 focus:border-transparent transition-all"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium w-full sm:w-auto justify-center">
                    <Filter className="w-4 h-4" /> Filtros
                </button>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden text-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-100 text-slate-600">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Curso</th>
                                <th className="px-6 py-4 font-semibold">Instrutor</th>
                                <th className="px-6 py-4 font-semibold">Origem</th>
                                <th className="px-6 py-4 font-semibold">Alunos</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
                                        <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-wine-800" />
                                        Carregando cursos...
                                    </td>
                                </tr>
                            ) : courses.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
                                        Nenhum curso encontrado.
                                    </td>
                                </tr>
                            ) : (
                                courses.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase())).map((course) => (
                                    <tr key={course.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {course.thumbnail_url ? (
                                                    <img src={course.thumbnail_url} alt="" className="w-12 h-8 rounded object-cover shadow-sm bg-slate-100" />
                                                ) : (
                                                    <div className="w-12 h-8 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                                                        <MonitorPlay className="w-4 h-4" />
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="font-bold text-slate-800">{course.title}</div>
                                                    <div className="text-xs text-slate-500 mt-0.5">{course.category}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {course.origin === 'onipublish'
                                                ? 'Onipublish API'
                                                : course.instructor?.full_name || 'Não atribuído'
                                            }
                                        </td>
                                        <td className="px-6 py-4">
                                            {course.origin === 'onipublish' ? (
                                                <span className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md w-fit">
                                                    <CloudRain className="w-3.5 h-3.5" /> Onipublish
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md w-fit border border-amber-100">
                                                    <MonitorPlay className="w-3.5 h-3.5" /> Nativo
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">-</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700`}>
                                                Ativo
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 text-slate-400 hover:text-wine-800 hover:bg-wine-50 rounded transition-colors" title="Editar">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors" title="Excluir">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination mock */}
                <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Lista Sincronizada com o Backend</span>
                    <div className="flex gap-1">
                        <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50">1</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
