import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import logo from '../../pages/public/img/Reverse - v2@4x.png';
import logo2 from '../../pages/public/img/Full Color v4@4x.png';
import fondo1 from '../../pages/public/img/Imagen1.png'
import fondo3 from '../../pages/public/img/usario2.gif'
import fondo2 from '../../pages/public/img/comunicacion.gif'
import fondo4 from '../../pages/public/img/giphy.gif'
import {
  Search, Building2, Globe, ShieldCheck, ArrowRight, Users, BarChart3, CheckCircle, Star
} from 'lucide-react';

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(current);
    }, 30);
    return () => clearInterval(timer);
  }, [target]);
  return <>{count}{suffix}</>;
}

export default function HomePage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/reportes/dashboard')
      .then((res) => setStats(res.data))
      .catch(() => {});
  }, []);

  const features = [
    { img: logo2,className:'w-500 h-500', title: 'Búsqueda Inteligente',subtitle:'Busca nuestros proveedores accediendo', desc: 'Full-Text Search avanzado para encontrar socios por nombre, especialidad, servicio o tecnología.', subtitle2:'accede al panel',color: 'bg-white/10',img2:fondo1 },
    {  img: logo2,className:'w-500 h-500', title: 'Micro-sitios',subtitle:'Encuentra tu usuario para ver tu informacion', desc: 'Cada socio cuenta con un perfil profesional detallado con información corporativa y de contacto.', color: 'from-violet-500 to-purple-500',img2:fondo3 },
    { img: logo2,className:'w-500 h-500', title: 'Visibilidad Global', desc: 'Directorio público integrado a casatic.org para máxima exposición de nuestros socios.', color: 'from-emerald-500 to-teal-500' ,img2:fondo2},
    { img: logo2,className:'w-500 h-500', title: 'Gestión Segura', desc: 'Panel administrativo protegido con JWT, roles y auditoría de actividad en tiempo real.', color: 'from-orange-500 to-amber-500',img2:fondo4 },
  ];

  const statsCards = [
    { label: 'Socios Activos', value: stats?.sociosActivos || 12, icon: Building2, suffix: '+' },
    { label: 'Especialidades', value: stats?.totalSocios ? 12 : 30, icon: Star, suffix: '+' },
    { label: 'Visitas este Mes', value: stats?.visitasMes || 56, icon: BarChart3, suffix: '' },
  ];

  return (
    <div className="overflow-hidden">
      {/* ── Hero Section ────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-center bg-surface-950 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-casatic-950 via-surface-950 to-casatic-900" />
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-casatic-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-pulse-soft" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-500/8 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 animate-pulse-soft" style={{ animationDelay: '1s' }} />
          <div className="absolute inset-0 bg-grid opacity-20" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-casatic-500/10 border border-casatic-500/20 text-casatic-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6 animate-fade-in">
            {/* Reemplazo de icono por imagen */}
            <img 
              src={logo}
              alt="Logo" 
             className="w-21 h-20 absolute -top-1 -left-4 opacity-100"
            /> 
              Plataforma Oficial CASATIC 2026
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6 animate-fade-in-up">
              Directorio
              <span className="block text-gradient-accent">
                Interactivo
              </span>
              de Socios
            </h1>

            <p className="text-lg sm:text-xl text-surface-400 max-w-xl mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
              Conecta con las empresas líderes en tecnología de El Salvador.
              Explora, filtra y contacta socios certificados de CASATIC.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
              <Link
                to="/directorio"
                className="group inline-flex items-center gap-2.5 bg-casatic-600 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-casatic-500 transition-all duration-300 hover:shadow-xl hover:shadow-casatic-600/25 hover:-translate-y-0.5 text-lg"
              >
                <Search size={20} />
                Explorar Directorio
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/admin/login"
                className="inline-flex items-center gap-2 text-surface-400 hover:text-white px-6 py-3.5 rounded-xl font-medium border border-surface-700 hover:border-surface-500 transition-all duration-200"
              >
                Acceso Socios
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Stats floating cards */}
          {stats && (
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl stagger-children">
              {statsCards.map((s, i) => (
                <div key={i} className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-casatic-500/15 rounded-xl flex items-center justify-center">
                    <s.icon size={18} className="text-casatic-400" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">
                      <AnimatedCounter target={s.value} suffix={s.suffix} />
                    </p>
                    <p className="text-xs text-surface-500">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Trusted By Section ──────────────────────────── */}
      <section className="py-12 bg-white border-b border-surface-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-surface-400 uppercase tracking-wider mb-8">
            Respaldado por la industria tecnológica salvadoreña
          </p>
          <div className="flex items-center justify-center gap-12 flex-wrap opacity-40">
            {['Cloud Computing', 'DevOps', 'IA & Machine Learning', 'Desarrollo Web', 'Infraestructura'].map((t) => (
              <span key={t} className="text-surface-800 font-semibold text-lg whitespace-nowrap">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── cuadricula de caracteristicas ───────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-[rgb(63,208,216)] to-[#1e3a8a] ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 tracking-tight mb-4">
              Todo lo que necesitas en un
              <span className="text-#1e3a8a text-gradient"> solo lugar</span>
            </h2>
            <p className="bg-black/2 inline-block text-lg text-surface-0 px-4 py-2 rounded-lg">
              Una plataforma moderna para conectar empresas de tecnología con quienes necesitan sus servicios.
            </p>
          </div>
          {/*--------------------cuadro de menus de casatic --------------*/}
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
     
  {features.map((f, i) => (
    <div key={i} className="group card-interactive p-6 text-center">
    

      {/* Imagen si existe */}
      {f.img && (
        <div className="flex justify-center mb-6">
          <img
            src={f.img}
            alt={f.title}
            className="w-25 h-auto object-contain"
          />
        </div>
        
      )}

      {/* Icono si existe */}
      {f.icon && (
        <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-xl bg-gradient-to-br from-casatic-500 to-casatic-700 text-white">
          <f.icon size={24} />
        </div>
      )}

     <h3 className="text-[#0a0a0a] bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-2 font-bold">
        {f.title}
      </h3>

      <p className="text-sm text-surface-600">
        {f.desc}
      </p><br></br><br></br>
      <h1 className="text-#0b0b35 text-gradient">{f.subtitle}</h1><br></br>
     
      <div className='bg-[grb{63,208-216}]'>
      <link src="logo"></link>
      </div>
      <h1 className="text-[#0b0b35] text-gradient">{f.subtitle2}</h1>

{/* Imagen debajo del subtítulo */}
{f.img2 && (
  <div className="flex justify-center mt-4">
    <img 
      src={f.img2} 
   
      alt="Fondo ilustrativo" 
      className="w-full max-w-md rounded-lg shadow-lg"
    />
  </div>
)}


    </div>
  ))}
  </div>
  </div>
  </section>

     
                
     

      {/* ── CTA ─────────────────────────────────────────── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-casatic-700 via-casatic-800 to-surface-950" />
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-casatic-500/20 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 text-casatic-200 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <CheckCircle size={14} /> Para socios de CASATIC
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
            Gestiona tu presencia digital
          </h2>
          <p className="text-lg text-casatic-200 mb-10 max-w-xl mx-auto">
            Accede al panel de administración para actualizar tu perfil,
            ver métricas de visitas y gestionar tus datos empresariales.
          </p>
          <Link
            to="/admin/login"
            className="group inline-flex items-center gap-2.5 bg-white text-casatic-800 px-8 py-4 rounded-xl font-semibold hover:bg-casatic-50 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 text-lg"
          >
            Acceder al Panel
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}

