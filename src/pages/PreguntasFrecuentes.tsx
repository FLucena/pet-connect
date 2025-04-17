import React from 'react';

const PreguntasFrecuentes: React.FC = () => {
  const faqs = [
    {
      pregunta: "¿Cómo puedo adoptar una mascota?",
      respuesta: "Para adoptar una mascota, primero debes registrarte en nuestra plataforma. Luego, puedes navegar por las mascotas disponibles, contactar al refugio y comenzar el proceso de adopción."
    },
    {
      pregunta: "¿Cuál es el proceso de adopción?",
      respuesta: "El proceso incluye: registro en la plataforma, selección de mascota, contacto con el refugio, entrevista inicial, visita al refugio, y finalización de la documentación necesaria."
    },
    {
      pregunta: "¿Tiene algún costo adoptar?",
      respuesta: "Los costos pueden variar según el refugio. Generalmente incluyen vacunas, desparasitación y esterilización. Cada refugio establece sus propias tarifas."
    },
    {
      pregunta: "¿Puedo poner en adopción a una mascota?",
      respuesta: "Solo los refugios registrados pueden publicar mascotas en adopción. Si necesitas dar en adopción a una mascota, te recomendamos contactar con alguno de nuestros refugios asociados."
    },
    {
      pregunta: "¿Cómo puedo ayudar a los refugios?",
      respuesta: "Puedes ayudar mediante donaciones, voluntariado, difusión de mascotas en adopción, o convirtiéndote en hogar temporal. Cada refugio especifica sus necesidades particulares."
    }
  ];

  return (
    <div className="min-h-screen bg-light p-4">
      <div className="container py-5">
        <h1 className="text-3xl font-bold mb-6">Preguntas Frecuentes</h1>
        
        <div className="accordion" id="faqAccordion">
          {faqs.map((faq, index) => (
            <div className="accordion-item border-0 mb-3 shadow-sm rounded" key={index}>
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed bg-white"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded="false"
                  aria-controls={`collapse${index}`}
                >
                  {faq.pregunta}
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body bg-white">
                  {faq.respuesta}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreguntasFrecuentes; 