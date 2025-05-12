import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { NewShelterFormData } from '@/types/shelter';
import ShelterFormField from '@/components/ShelterForm/ShelterFormField';
import ShelterFormSection from '@/components/ShelterForm/ShelterFormSection';

interface ContactSectionProps {
  register: UseFormRegister<NewShelterFormData>;
  errors: {
    contact?: {
      phone?: { message?: string };
      email?: { message?: string };
      website?: { message?: string };
    };
  };
}

const ContactSection: React.FC<ContactSectionProps> = ({ register, errors }) => {
  return (
    <ShelterFormSection title="Contacto">
      <div className="row g-4">
        <div className="col-md-6">
          <ShelterFormField
            label="Teléfono"
            type="tel"
            register={register}
            name="contact.phone"
            error={errors.contact?.phone?.message}
            required
            className="form-control form-control-lg"
          />
        </div>
        <div className="col-md-6">
          <ShelterFormField
            label="Email"
            type="email"
            register={register}
            name="contact.email"
            error={errors.contact?.email?.message}
            required
            className="form-control form-control-lg"
          />
        </div>
        <div className="col-12">
          <ShelterFormField
            label="Sitio Web"
            type="url"
            register={register}
            name="contact.website"
            error={errors.contact?.website?.message}
            className="form-control form-control-lg"
          />
        </div>
      </div>
    </ShelterFormSection>
  );
};

export default ContactSection; 