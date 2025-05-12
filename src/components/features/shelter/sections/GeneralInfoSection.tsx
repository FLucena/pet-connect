import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { NewShelterFormData } from '@/types/shelter';
import ShelterFormField from '@/components/ShelterForm/ShelterFormField';
import ShelterFormSection from '@/components/ShelterForm/ShelterFormSection';

interface GeneralInfoSectionProps {
  register: UseFormRegister<NewShelterFormData>;
  errors: {
    name?: { message?: string };
    description?: { message?: string };
  };
}

const GeneralInfoSection: React.FC<GeneralInfoSectionProps> = ({ register, errors }) => {
  return (
    <ShelterFormSection title="Información General">
      <div className="row g-4">
        <div className="col-md-6">
          <ShelterFormField
            label="Nombre"
            type="text"
            register={register}
            name="name"
            error={errors.name?.message}
            required
            className="form-control form-control-lg"
          />
        </div>
        <div className="col-md-6">
          <ShelterFormField
            label="Descripción"
            type="textarea"
            register={register}
            name="description"
            error={errors.description?.message}
            required
            className="form-control form-control-lg"
          />
        </div>
      </div>
    </ShelterFormSection>
  );
};

export default GeneralInfoSection; 