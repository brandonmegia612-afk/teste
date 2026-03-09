import { Routes, Route } from 'react-router-dom';
import PublicLayout from './components/Layout/PublicLayout';
import AdminLayout from './components/Layout/AdminLayout';
import HomePage from './pages/public/HomePage';
import DirectorioPage from './pages/public/DirectorioPage';
import FormularioPage from './pages/public/FormularioPage';
import LoginPage from './pages/admin/LoginPage';
import CambiarPasswordPage from './pages/admin/CambiarPasswordPage';
import DashboardPage from './pages/admin/DashboardPage';
import SociosAdminPage from './pages/admin/SociosAdminPage';
import UsuariosAdminPage from './pages/admin/UsuariosAdminPage';
import SocioFormPage from './pages/admin/SocioFormPage';
import PresentacionPage from './pages/public/PresentacionPage';

/**
 * App principal: rutas públicas y admin.
 */
export default function App() {
  return (
    <Routes>
      {/* ── Rutas Públicas ─────────────────────────────── */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/directorio" element={<DirectorioPage />} />
         <Route path="/presentacion" element={<PresentacionPage />} />
        <Route path="/formulario" element={<FormularioPage />} />
        
      </Route>

      {/* ── Rutas Admin ────────────────────────────────── */}
      <Route path="/admin/login" element={<LoginPage />} />
      <Route path="/admin/cambiar-password" element={<CambiarPasswordPage />} />
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<DashboardPage />} />
        <Route path="/admin/socios" element={<SociosAdminPage />} />
        <Route path="/admin/socios/nuevo" element={<SocioFormPage />} />
        <Route path="/admin/socios/:id" element={<SocioFormPage />} />
        <Route path="/admin/usuarios" element={<UsuariosAdminPage />} />
      </Route>
    </Routes>
  );
}
