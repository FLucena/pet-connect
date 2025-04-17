import React from 'react';

const Terminos: React.FC = () => {
  return (
    <div className="min-h-screen bg-light p-4">
      <div className="container py-5">
        <h1 className="text-3xl font-bold mb-6">Términos y Condiciones</h1>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <section className="mb-5">
            <h2 className="h4 mb-3">1. Aceptación de los Términos</h2>
            <p className="text-muted mb-3">
              Al acceder y utilizar la plataforma Pet Connect, aceptas estos términos y condiciones en su totalidad. Si no estás de acuerdo con alguna parte de estos términos, te pedimos que no utilices nuestros servicios.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="h4 mb-3">2. Uso del Servicio</h2>
            <p className="text-muted mb-3">
              Pet Connect es una plataforma que conecta refugios de animales con potenciales adoptantes. Nos reservamos el derecho de modificar, suspender o discontinuar el servicio en cualquier momento.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="h4 mb-3">3. Registro y Cuentas</h2>
            <p className="text-muted mb-3">
              Para utilizar ciertos servicios, deberás crear una cuenta. Eres responsable de mantener la confidencialidad de tu cuenta y contraseña.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="h4 mb-3">4. Proceso de Adopción</h2>
            <p className="text-muted mb-3">
              Pet Connect facilita el proceso de adopción pero no es responsable de las decisiones tomadas por los refugios o adoptantes. Cada refugio tiene sus propios requisitos y procesos.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="h4 mb-3">5. Responsabilidades</h2>
            <p className="text-muted mb-3">
              Los usuarios se comprometen a proporcionar información veraz y actualizada. Pet Connect no se hace responsable de las acciones de los usuarios fuera de la plataforma.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="h4 mb-3">6. Modificaciones</h2>
            <p className="text-muted mb-3">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en la plataforma.
            </p>
          </section>

          <div className="mt-5 pt-3 border-top">
            <p className="text-muted">
              Última actualización: Marzo 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminos; 