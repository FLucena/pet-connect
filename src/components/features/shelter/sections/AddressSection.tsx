import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { NewShelterFormData } from '@/types/shelter';
import ShelterFormField from '@/components/ShelterForm/ShelterFormField';
import ShelterFormSection from '@/components/ShelterForm/ShelterFormSection';

interface AddressSectionProps {
  register: UseFormRegister<NewShelterFormData>;
  errors: {
    location?: {
      address?: { message?: string };
      city?: { message?: string };
      state?: { message?: string };
      postalCode?: { message?: string };
      country?: { message?: string };
    };
  };
}

const AddressSection: React.FC<AddressSectionProps> = ({ register, errors }) => {
  return (
    <ShelterFormSection title="Dirección">
      <div className="row g-4">
        <div className="col-md-6">
          <ShelterFormField
            label="Calle"
            type="text"
            register={register}
            name="location.address"
            error={errors.location?.address?.message}
            required
            className="form-control form-control-lg"
          />
        </div>
        <div className="col-md-6">
          <ShelterFormField
            label="Ciudad"
            type="text"
            register={register}
            name="location.city"
            error={errors.location?.city?.message}
            required
            className="form-control form-control-lg"
          />
        </div>
        <div className="col-md-4">
          <ShelterFormField
            label="Provincia"
            type="text"
            register={register}
            name="location.state"
            error={errors.location?.state?.message}
            required
            className="form-control form-control-lg"
          />
        </div>
        <div className="col-md-4">
          <ShelterFormField
            label="Código Postal"
            type="text"
            register={register}
            name="location.postalCode"
            error={errors.location?.postalCode?.message}
            required
            className="form-control form-control-lg"
          />
        </div>
        <div className="col-md-4">
          <ShelterFormField
            label="País"
            type="text"
            register={register}
            name="location.country"
            error={errors.location?.country?.message}
            required
            className="form-control form-control-lg"
          />
        </div>
      </div>
    </ShelterFormSection>
  );
};

export default AddressSection; 