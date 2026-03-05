import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/client';
import {
  Building2, Mail, Phone, Globe, MapPin,
  ClipboardList, Send, X, CheckCircle2,
  User, Tag, Image, AlertCircle, Loader2
} from 'lucide-react';

// ── Componente campo reutilizable ─────────────────────────────
function FormField({ label, icon: Icon, error, required, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-surface-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400 pointer-events-none z-10"
          />
        )}
        {children}
      </div>
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}

// ── Estados del envío ─────────────────────────────────────────
const ESTADO = { IDLE: 'idle', LOADING: 'loading', SUCCESS: 'success', ERROR: 'error' };

export default function FormularioPage() {
  const navigate = useNavigate();
  const [estado, setEstado] = useState(ESTADO.IDLE);
  const [especialidades, setEspecialidades] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    nombreEmpresa:    '',
    descripcion:      '',
    direccion:        '',
    email:            '',
    telefono:         '',
    sitioWeb:         '',
    contactoNombre:   '',
    logoUrl:          '',
    especialidades:   [],
  });

  // Cargar especialidades existentes para sugerencias
  useEffect(() => {
    api.get('/src/pages/public/FormularioPage/especialidades')
      .then((res) => setEspecialidades(res.data))
      .catch(() => {});
  }, []);

  // ── Manejo de campos ────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // ── Tags / especialidades ───────────────────────────────────
  const addTag = (tag) => {
    const clean = tag.trim();
    if (!clean || form.especialidades.includes(clean)) return;
    setForm((prev) => ({ ...prev, especialidades: [...prev.especialidades, clean] }));
    setTagInput('');
  };

  const removeTag = (tag) => {
    setForm((prev) => ({
      ...prev,
      especialidades: prev.especialidades.filter((e) => e !== tag),
    }));
  };

  const handleTagKey = (e) => {
    if (['Enter', ','].includes(e.key)) {
      e.preventDefault();
      addTag(tagInput);
    }
  };

  // ── Validación ──────────────────────────────────────────────
  const validate = () => {
    const errs = {};
    if (!form.nombreEmpresa.trim())  errs.nombreEmpresa = 'El nombre es obligatorio';
    if (!form.descripcion.trim())    errs.descripcion   = 'La descripción es obligatoria';
    if (!form.email.trim())          errs.email         = 'El correo es obligatorio';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Correo inválido';
    if (form.sitioWeb && !/^https?:\/\//.test(form.sitioWeb))
      errs.sitioWeb = 'Debe comenzar con http:// o https://';
    return errs;
  };

  // ── Envío ───────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setEstado(ESTADO.LOADING);
    try {
      await api.post('/formulario', form);
      setEstado(ESTADO.SUCCESS);
    } catch {
      setEstado(ESTADO.ERROR);
    }
  };

  const resetForm = () => {
    setForm({
      nombreEmpresa: '', descripcion: '', direccion: '',
      email: '', telefono: '', sitioWeb: '',
      contactoNombre: '', logoUrl: '', especialidades: [],
    });
    setErrors({});
    setEstado(ESTADO.IDLE);
  };

  // ── Pantalla de éxito ───────────────────────────────────────
  if (estado === ESTADO.SUCCESS) {
    return (
      <div className="bg-mesh min-h-screen flex items-center justify-center px-4">
        <div className="card-base p-10 max-w-md w-full text-center animate-fade-in-up">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-surface-900 mb-2">¡Solicitud enviada!</h2>
          <p className="text-surface-500 text-sm mb-6 leading-relaxed">
            Tu empresa fue registrada correctamente. El equipo CASATIC revisará
            la información y la publicará en el directorio pronto.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={resetForm} className="btn-secondary btn-sm">
              Enviar otra solicitud
            </button>
            <button onClick={() => navigate('/directorio')} className="btn-primary btn-sm">
              Ver directorio
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isLoading = estado === ESTADO.LOADING;

  return (
    <div className="bg-mesh min-h-screen">
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-casatic-700 via-casatic-800 to-surface-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <div
            className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-4 animate-fade-in-up"
            style={{ animationDelay: '0s' }}
          >
            <ClipboardList size={28} className="text-white" />
          </div>
          <h1
            style={{ animationDelay: '0.05s' }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-center animate-fade-in-up"
          >
            Registra tu Empresa
          </h1>
          
          <p
            style={{ animationDelay: '0.1s' }}
            className="mt-3 text-white/70 text-center text-lg max-w-xl animate-fade-in-up"
          >
            Forma parte del Directorio Interactivo CASATIC 2026
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 pb-20">

        {/* Banner de error global */}
        {estado === ESTADO.ERROR && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 text-sm animate-fade-in-up">
            <AlertCircle size={18} className="flex-shrink-0" />
            Ocurrió un error al enviar. Por favor intenta de nuevo.
            <button onClick={() => setEstado(ESTADO.IDLE)} className="ml-auto">
              <X size={16} />
            </button>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-elevated p-6 md:p-8 space-y-8 animate-fade-in-up"
          style={{ animationDelay: '0.15s' }}
        >

          {/* ── Sección 1: Empresa ─────────────────────────── */}
          <section>
            <h2 className="text-base font-bold text-surface-800 flex items-center gap-2 mb-5 pb-3 border-b border-surface-100">
              <Building2 size={18} className="text-casatic-600" />
              Información de la Empresa
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div className="md:col-span-2">
                <FormField label="Nombre de la empresa" icon={Building2} error={errors.nombreEmpresa} required>
                  <input
                    type="text"
                    name="nombreEmpresa"
                    value={form.nombreEmpresa}
                    onChange={handleChange}
                    placeholder="Ej. TechSolve S.A. de C.V."
                    className={`input-field pl-10 ${errors.nombreEmpresa ? 'border-red-400 focus:ring-red-200' : ''}`}
                  />
                </FormField>
              </div>

              <div className="md:col-span-2">
                <FormField label="Descripción" error={errors.descripcion} required>
                  <textarea
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe brevemente los servicios y soluciones que ofrece tu empresa..."
                    className={`input-field resize-none pt-3 ${errors.descripcion ? 'border-red-400' : ''}`}
                  />
                </FormField>
              </div>

              <div className="md:col-span-2">
                <FormField label="Dirección" icon={MapPin}>
                  <input
                    type="text"
                    name="direccion"
                    value={form.direccion}
                    onChange={handleChange}
                    placeholder="Ej. Col. Escalón, San Salvador"
                    className="input-field pl-10"
                  />
                </FormField>
              </div>

              

            

            </div>
          </section>

          {/* ── Sección 2: Contacto ────────────────────────── */}
          <section>
            <h2 className="text-base font-bold text-surface-800 flex items-center gap-2 mb-5 pb-3 border-b border-surface-100">
              <User size={18} className="text-casatic-600" />
              Datos de Contacto
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div className="md:col-span-2">
                <FormField label="Nombre del contacto" icon={User}>
                  <input
                    type="text"
                    name="contactoNombre"
                    value={form.contactoNombre}
                    onChange={handleChange}
                    placeholder="Nombre y apellido del representante"
                    className="input-field pl-10"
                  />
                </FormField>
              </div>

              <FormField label="Correo electrónico" icon={Mail} error={errors.email} required>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="contacto@empresa.com"
                  className={`input-field pl-10 ${errors.email ? 'border-red-400' : ''}`}
                />
              </FormField>

              <FormField label="Teléfono" icon={Phone}>
                <input
                  type="tel"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  placeholder="+503 2222-3333"
                  className="input-field pl-10"
                />
              </FormField>

            </div>
          </section>

          {/* ── Sección 3: Especialidades ──────────────────── */}
          <section>
            <h2 className="text-base font-bold text-surface-800 flex items-center gap-2 mb-5 pb-3 border-b border-surface-100">
              <Tag size={18} className="text-casatic-600" />
              Especialidades / Tecnologías
            </h2>

            {/* Tags añadidos */}
            {form.especialidades.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {form.especialidades.map((esp) => (
                  <span
                    key={esp}
                    className="badge-primary flex items-center gap-1.5 text-sm px-3 py-1"
                  >
                    {esp}
                    <button
                      type="button"
                      onClick={() => removeTag(esp)}
                      className="hover:text-red-500 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Input para agregar tag */}
            <div className="relative">
              <Tag size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKey}
                placeholder="Escribe una especialidad y presiona Enter o coma (,)"
                className="input-field pl-10 pr-24"
              />
              <button
                type="button"
                onClick={() => addTag(tagInput)}
                disabled={!tagInput.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary btn-sm text-xs px-3 py-1.5 disabled:opacity-40"
              >
                Agregar
              </button>
            </div>

            {/* Sugerencias */}
            {especialidades.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-surface-400 mb-2">Sugerencias:</p>
                <div className="flex flex-wrap gap-1.5">
                  {especialidades
                    .filter((e) => !form.especialidades.includes(e))
                    .slice(0, 10)
                    .map((esp) => (
                      <button
                        key={esp}
                        type="button"
                        onClick={() => addTag(esp)}
                        className="badge-neutral text-xs px-2.5 py-1 hover:bg-casatic-50 hover:text-casatic-700 hover:border-casatic-200 transition-colors cursor-pointer"
                      >
                        + {esp}
                      </button>
                    ))}
                </div>
              </div>
            )}
          </section>

          {/* ── Botones ────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/')}
              disabled={isLoading}
              className="btn-secondary w-full sm:w-auto px-6 py-3 text-base order-2 sm:order-1"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary flex-1 py-3 text-base order-1 sm:order-2 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Enviando solicitud...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Enviar solicitud
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
