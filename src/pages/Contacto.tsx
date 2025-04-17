import React from 'react';

const Contacto: React.FC = () => {
  return (
    <div className="min-h-screen bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <h1 className="text-center mb-4">Contacto</h1>
                <form className="needs-validation" noValidate>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      className="form-control"
                      required
                    />
                    <div className="invalid-feedback">
                      Por favor ingresa tu nombre
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      required
                    />
                    <div className="invalid-feedback">
                      Por favor ingresa un correo electrónico válido
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="mensaje" className="form-label">
                      Mensaje
                    </label>
                    <textarea
                      id="mensaje"
                      rows={4}
                      className="form-control"
                      required
                    ></textarea>
                    <div className="invalid-feedback">
                      Por favor ingresa tu mensaje
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2"
                  >
                    Enviar Mensaje
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto; 