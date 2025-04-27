import React, { useState, useRef, useEffect } from 'react';

const QuienesSomos: React.FC = () => {
  // Estado para controlar qué sección está expandida
  const [expandedSection, setExpandedSection] = useState<string | null>('mision');
  
  // Referencias para medir alturas de contenido
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({
    mision: null,
    vision: null,
    valores: null,
    equipo: null
  });
  
  // Estado para almacenar las alturas de cada sección
  const [contentHeights, setContentHeights] = useState<{ [key: string]: number }>({
    mision: 0,
    vision: 0,
    valores: 0,
    equipo: 0
  });

  // Función para actualizar las alturas de todas las secciones
  const updateContentHeights = () => {
    const newHeights: { [key: string]: number } = {};
    
    Object.keys(contentRefs.current).forEach(key => {
      if (contentRefs.current[key]) {
        newHeights[key] = contentRefs.current[key]?.scrollHeight || 0;
      }
    });
    
    setContentHeights(newHeights);
  };

  // Actualizar alturas al montar el componente y al cambiar el tamaño de la ventana
  useEffect(() => {
    updateContentHeights();
    window.addEventListener('resize', updateContentHeights);
    return () => window.removeEventListener('resize', updateContentHeights);
  }, []);

  // Función para manejar el clic en una sección
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null); // Colapsa si ya está expandida
    } else {
      setExpandedSection(section); // Expande la nueva sección
    }
  };


  return (
    <div className="min-h-screen bg-light p-4">
      <div className="container py-5">
        <h1 className="text-3xl font-bold mb-5 text-center">¿Quiénes Somos?</h1>
        
        <div className="accordion" id="quienesSomosAccordion">
          {/* Sección Misión */}
          <div className="accordion-item border mb-3 rounded shadow-sm overflow-hidden">
            <h2 className="accordion-header">
              <button 
                className="accordion-button position-relative custom-accordion-button"
                type="button"
                onClick={() => toggleSection('mision')}
                aria-expanded={expandedSection === 'mision'}
              >
                <span className="h3 mb-0">Misión</span>
                <i 
                  className="bi bi-chevron-down position-absolute"
                  style={{ 
                    right: '1.25rem',
                    transform: expandedSection === 'mision' ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                ></i>
              </button>
            </h2>
            <div 
              ref={(el: HTMLDivElement | null) => { contentRefs.current.mision = el }}
              className="overflow-hidden"
              style={{ 
                maxHeight: expandedSection === 'mision' ? `${contentHeights.mision}px` : '0px',
                opacity: expandedSection === 'mision' ? '1' : '0',
                transition: 'max-height 500ms cubic-bezier(0.4, 0, 0.2, 1), opacity 500ms cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div className="accordion-body">
                <p className="text-muted mb-0 fw-semibold">
                  En Pet Connect, nos dedicamos a crear conexiones significativas entre refugios de animales y personas que desean adoptar una mascota. Nuestra plataforma facilita el proceso de adopción responsable, asegurando que cada animal encuentre un hogar amoroso.
                </p>
              </div>
            </div>
          </div>
          
          {/* Sección Visión */}
          <div className="accordion-item border mb-3 rounded shadow-sm overflow-hidden">
            <h2 className="accordion-header">
              <button 
                className="accordion-button position-relative custom-accordion-button"
                type="button"
                onClick={() => toggleSection('vision')}
                aria-expanded={expandedSection === 'vision'}
              >
                <span className="h3 mb-0">Visión</span>
                <i 
                  className="bi bi-chevron-down position-absolute"
                  style={{ 
                    right: '1.25rem',
                    transform: expandedSection === 'vision' ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                ></i>
              </button>
            </h2>
            <div 
              ref={(el: HTMLDivElement | null) => { contentRefs.current.vision = el }}
              className="overflow-hidden"
              style={{ 
                maxHeight: expandedSection === 'vision' ? `${contentHeights.vision}px` : '0px',
                opacity: expandedSection === 'vision' ? '1' : '0',
                transition: 'max-height 500ms cubic-bezier(0.4, 0, 0.2, 1), opacity 500ms cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div className="accordion-body">
                <p className="text-muted mb-0 fw-semibold">
                  Aspiramos a ser la plataforma líder en conectar refugios con adoptantes potenciales, promoviendo la adopción responsable y el bienestar animal en toda la comunidad.
                </p>
              </div>
            </div>
          </div>
          
          {/* Sección Valores */}
          <div className="accordion-item border mb-3 rounded shadow-sm overflow-hidden">
            <h2 className="accordion-header">
              <button 
                className="accordion-button position-relative custom-accordion-button"
                type="button"
                onClick={() => toggleSection('valores')}
                aria-expanded={expandedSection === 'valores'}
              >
                <span className="h3 mb-0">Nuestros Valores</span>
                <i 
                  className="bi bi-chevron-down position-absolute"
                  style={{ 
                    right: '1.25rem',
                    transform: expandedSection === 'valores' ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                ></i>
              </button>
            </h2>
            <div 
              ref={(el: HTMLDivElement | null) => { contentRefs.current.valores = el }}
              className="overflow-hidden"
              style={{ 
                maxHeight: expandedSection === 'valores' ? `${contentHeights.valores}px` : '0px',
                opacity: expandedSection === 'valores' ? '1' : '0',
                transition: 'max-height 500ms cubic-bezier(0.4, 0, 0.2, 1), opacity 500ms cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div className="accordion-body">
                <div className="row g-4">
                  <div className="col-md-4 col-sm-6">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body">
                        <h3 className="h5 mb-3">Compromiso</h3>
                        <p className="text-muted fw-semibold">
                          Nos comprometemos a facilitar adopciones responsables y promover el bienestar animal.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body">
                        <h3 className="h5 mb-3">Transparencia</h3>
                        <p className="text-muted fw-semibold">
                          Mantenemos procesos claros y honestos en todas nuestras operaciones.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body">
                        <h3 className="h5 mb-3">Responsabilidad</h3>
                        <p className="text-muted fw-semibold">
                          Promovemos la adopción responsable y el cuidado adecuado de las mascotas.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sección Equipo */}
          <div className="accordion-item border mb-3 rounded shadow-sm overflow-hidden">
            <h2 className="accordion-header">
              <button 
                className="accordion-button position-relative custom-accordion-button"
                type="button"
                onClick={() => toggleSection('equipo')}
                aria-expanded={expandedSection === 'equipo'}
              >
                <span className="h3 mb-0">Equipo</span>
                <i 
                  className="bi bi-chevron-down position-absolute"
                  style={{ 
                    right: '1.25rem',
                    transform: expandedSection === 'equipo' ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                ></i>
              </button>
            </h2>
            <div 
              ref={(el: HTMLDivElement | null) => { contentRefs.current.equipo = el }}
              className="overflow-hidden"
              style={{ 
                maxHeight: expandedSection === 'equipo' ? `${contentHeights.equipo}px` : '0px',
                opacity: expandedSection === 'equipo' ? '1' : '0',
                transition: 'max-height 500ms cubic-bezier(0.4, 0, 0.2, 1), opacity 500ms cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div className="accordion-body">
                <p className="text-muted mb-0 fw-semibold">
                  Somos un equipo apasionado de amantes de los animales, desarrolladores y profesionales comprometidos con hacer una diferencia en la vida de las mascotas y las personas que desean adoptarlas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Estilo para ocultar la flecha predeterminada del acordeón */}
      <style>{`
        .custom-accordion-button::after {
          display: none !important;
          content: none !important;
        }
        
        /* Cambiar el color de fondo del botón del acordeón */
        .accordion-button {
          background-color: #f8f9fa !important; /* Color gris claro */
          box-shadow: none !important;
        }
        
        /* Cambiar el color cuando está activo/expandido */
        .accordion-button:not(.collapsed) {
          background-color: #fff !important; /* Un gris un poco más oscuro cuando está activo */
          color: #212529; /* Color de texto oscuro */
        }
        
        /* Eliminar el borde azul al hacer focus */
        .accordion-button:focus {
          border-color: rgba(0,0,0,.125) !important;
          box-shadow: none !important;
        }
      `}</style>
    </div>
  );
};

export default QuienesSomos;