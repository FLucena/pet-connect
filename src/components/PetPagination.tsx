import React from 'react';

interface PetPaginationProps {
  paginaActual: number;
  totalPaginas: number;
  onPageChange: (page: number) => void;
}

export const PetPagination: React.FC<PetPaginationProps> = ({ 
  paginaActual, 
  totalPaginas, 
  onPageChange 
}) => {
  if (totalPaginas <= 1) return null;

  return (
    <nav className="mt-4 d-flex justify-content-center" aria-label="Navegación de páginas">
      <ul className="pagination">
        <li className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(paginaActual - 1)}
            disabled={paginaActual === 1}
            aria-label="Página anterior"
          >
            Anterior
          </button>
        </li>
        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((numero) => (
          <li key={numero} className={`page-item ${paginaActual === numero ? 'active' : ''}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(numero)}
              aria-label={`Ir a página ${numero}`}
              aria-current={paginaActual === numero ? 'page' : undefined}
            >
              {numero}
            </button>
          </li>
        ))}
        <li className={`page-item ${paginaActual === totalPaginas ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
            aria-label="Página siguiente"
          >
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  );
}; 