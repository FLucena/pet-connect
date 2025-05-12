import React from 'react';

interface ModalFooterProps {
  onClose: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ onClose, onSubmit, isLoading }) => {
  return (
    <div className="modal-footer bg-white border-top rounded-bottom-3 py-3">
      <button
        type="button"
        className="btn btn-outline-secondary px-4 py-2 fw-semibold"
        onClick={onClose}
        disabled={isLoading}
      >
        Cancelar
      </button>
      <button
        type="submit"
        className="btn btn-primary px-4 py-2 fw-semibold"
        onClick={onSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
            Registrando...
          </>
        ) : (
          'Registrar Refugio'
        )}
      </button>
    </div>
  );
};

export default ModalFooter; 