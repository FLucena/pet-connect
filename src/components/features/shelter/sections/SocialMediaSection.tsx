import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { NewShelterFormData } from '@/types/shelter';
import ShelterFormField from '@/components/ShelterForm/ShelterFormField';
import ShelterFormSection from '@/components/ShelterForm/ShelterFormSection';

interface SocialMediaSectionProps {
  register: UseFormRegister<NewShelterFormData>;
  errors: {
    contact?: {
      socialMedia?: {
        facebook?: { message?: string };
        instagram?: { message?: string };
        twitter?: { message?: string };
      };
    };
  };
}

const SocialMediaSection: React.FC<SocialMediaSectionProps> = ({ register, errors }) => {
  return (
    <ShelterFormSection title="Redes Sociales">
      <div className="row g-4">
        <div className="col-md-4">
          <ShelterFormField
            label="Facebook"
            type="url"
            register={register}
            name="contact.socialMedia.facebook"
            error={errors.contact?.socialMedia?.facebook?.message}
            className="form-control form-control-lg"
          />
        </div>
        <div className="col-md-4">
          <ShelterFormField
            label="Instagram"
            type="url"
            register={register}
            name="contact.socialMedia.instagram"
            error={errors.contact?.socialMedia?.instagram?.message}
            className="form-control form-control-lg"
          />
        </div>
        <div className="col-md-4">
          <ShelterFormField
            label="Twitter"
            type="url"
            register={register}
            name="contact.socialMedia.twitter"
            error={errors.contact?.socialMedia?.twitter?.message}
            className="form-control form-control-lg"
          />
        </div>
      </div>
    </ShelterFormSection>
  );
};

export default SocialMediaSection; 