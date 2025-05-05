import React from 'react';
import './Contacto.css';

const Contacto: React.FC = () => {
  return (
    <div className="min-h-screen bg-light py-5">
      <div className="container py-5">
        <div className="row justify-content-center">
          {/* Left Column for Image or Illustration */}
          <div className="col-lg-10">
            <div className="d-flex flex-column flex-md-row g-0 h-100">
              <div className="col-md-6 d-flex align-items-stretch">
                <img
                  src="cachorro_contacto_cuadrado.jpg"
                  alt="Imagen de contacto"
                  className="img-fluid h-100"
                  style={{ objectFit:"cover", borderRadius: '0' }}
                />
              </div>
            {/*form*/}
              <div className="col-md-6">
                <div className="card shadow-sm h-100" style={{ borderRadius: '0' }}>
                  <div className="card-body p-4">
                    <h1 className="text-center mb-5">Contacto</h1>
                    <form className="needs-validation contacto-form" noValidate>
                      <div className="mb-3">
                        <input
                          type="text"
                          id="nombre"
                          className="form-control input-border-bottom"
                          placeholder=" "
                          required
                        />
                        <label htmlFor="nombre" className="form-label"> Nombre y Apellido </label>
                        <div className="invalid-feedback">
                          Por favor ingresa tu nombre
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <input
                          type="email"
                          id="email"
                          className="form-control input-border-bottom"
                          placeholder=" "
                          required
                        />
                        <label htmlFor="email" className="form-label"> Correo Electrónico </label>
                        <div className="invalid-feedback">
                          Por favor ingresa un correo electrónico válido
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <textarea
                          id="mensaje"
                          rows={3}
                          className="form-control input-border-bottom"
                          placeholder=" "
                          required
                        >
                        </textarea>
                        <label htmlFor="mensaje" className="form-label"> Escribí tu mensaje aquí... </label>
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
      </div>
    </div>
  );
};

export default Contacto; 