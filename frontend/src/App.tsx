import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { Landing } from './pages/Landing';
import { Login } from './pages/auth/Login';
import { AdminLayout } from './pages/admin/AdminLayout';
import { StudentRegister } from './pages/admin/StudentRegister';
import { TeacherRegister } from './pages/admin/TeacherRegister';
import { CourseRegister } from './pages/admin/CourseRegister';
import { CourseList } from './pages/admin/CourseList';
import { OnipublishIntegration } from './pages/admin/OnipublishIntegration';
import { StudentDashboard } from './pages/StudentDashboard';
import { Classroom } from './pages/Classroom';
import { StudentLayout } from './components/layout/StudentLayout';

// Placeholder for logic that will be built properly below
// const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
//   const session = useAuthStore(s => s.session);
//   return session ? children : <Navigate to="/login" />;
// };

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="classroom" element={<Classroom />} />
        </Route>

        <Route path="/teacher" element={<TeacherDashboard />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="students/new" element={<StudentRegister />} />
          <Route path="students" element={<div className="text-slate-800 text-2xl font-bold px-4">Listagem de Alunos em breve...</div>} />

          <Route path="teachers/new" element={<TeacherRegister />} />
          <Route path="teachers" element={<div className="text-slate-800 text-2xl font-bold px-4">Listagem de Professores em breve...</div>} />

          <Route path="courses/new" element={<CourseRegister />} />
          <Route path="courses" element={<CourseList />} />

          <Route path="integrations/onipublish" element={<OnipublishIntegration />} />

          {/* Other admin routes will go here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
