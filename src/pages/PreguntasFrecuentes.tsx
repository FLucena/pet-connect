import React from 'react';
import faqsData from '../data/faqs.json';
import { FAQsData } from '../types';

const PreguntasFrecuentes: React.FC = () => {
  const { faqs } = faqsData as FAQsData;

  return (
    <div className="min-h-screen bg-light p-4">
      <div className="container py-5">
        <h1 className="text-3xl font-bold mb-6">Preguntas Frecuentes</h1>
        
        <div className="accordion" id="faqAccordion">
          {faqs.map((faq, index: number) => (
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