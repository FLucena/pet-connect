import React, { useEffect, useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NewShelterFormData } from '@/types/shelter';
import ShelterFormField from '@/components/ShelterForm/ShelterFormField';
import ShelterFormSection from '@/components/ShelterForm/ShelterFormSection';

interface ShelterRegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: NewShelterFormData) => void;
  isLoading?: boolean;
}

const schema = yup.object().shape({
  name: yup.string().required('El nombre es requerido'),
  description: yup.string().required('La descripción es requerida'),
  address: yup.object().shape({
    street: yup.string().required('La calle es requerida'),
    city: yup.string().required('La ciudad es requerida'),
    province: yup.string().required('La provincia es requerida'),
    postalCode: yup.string().required('El código postal es requerido'),
    country: yup.string().default('Argentina'),
  }),
  contact: yup.object().shape({
    phone: yup.string().required('El teléfono es requerido'),
    email: yup.string().email('El email no es válido').required('El email es requerido'),
    website: yup.string().url('La URL no es válida').optional(),
    socialMedia: yup.object().shape({
      facebook: yup.string().url('La URL no es válida').optional(),
      instagram: yup.string().url('La URL no es válida').optional(),
      twitter: yup.string().url('La URL no es válida').optional(),
    }),
  }),
  services: yup.array().of(yup.string()).default([]),
  adoptionRequirements: yup.array().of(yup.string()).default([]),
  openingHours: yup.object().default({}),
}) as yup.ObjectSchema<NewShelterFormData>;

const defaultValues: NewShelterFormData = {
  name: '',
  description: '',
  address: {
    street: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'Argentina',
  },
  contact: {
    phone: '',
    email: '',
    website: '',
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
    },
  },
  services: [],
  adoptionRequirements: [],
  openingHours: {},
};

const ShelterRegistrationForm: React.FC<ShelterRegistrationFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewShelterFormData>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  const handleFormSubmit: SubmitHandler<NewShelterFormData> = (data) => {
    onSubmit(data);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const modal = document.querySelector('.modal-dialog');
      if (modal && !modal.contains(e.target as Node) && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="modal-backdrop fade show bg-dark bg-opacity-75"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="modal fade show d-block" tabIndex={-1}>
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content border-0 shadow-lg rounded-3">
            <div className="modal-header bg-primary text-white rounded-top-3">
              <h5 className="modal-title fw-bold mb-0">Registrar Nuevo Refugio</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={handleClose}
                aria-label="Close"
              />
            </div>

            <div className="modal-body p-4">
              <form onSubmit={handleSubmit(handleFormSubmit)} className="needs-validation" noValidate>
                <ShelterFormSection title="Información General">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <ShelterFormField
                        label="Nombre"
                        type="text"
                        register={register}
                        name="name"
                        error={errors.name?.message}
                        required
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
                      />
                    </div>
                  </div>
                </ShelterFormSection>

                <ShelterFormSection title="Dirección">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <ShelterFormField
                        label="Calle"
                        type="text"
                        register={register}
                        name="address.street"
                        error={errors.address?.street?.message}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <ShelterFormField
                        label="Ciudad"
                        type="text"
                        register={register}
                        name="address.city"
                        error={errors.address?.city?.message}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <ShelterFormField
                        label="Provincia"
                        type="text"
                        register={register}
                        name="address.province"
                        error={errors.address?.province?.message}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <ShelterFormField
                        label="Código Postal"
                        type="text"
                        register={register}
                        name="address.postalCode"
                        error={errors.address?.postalCode?.message}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <ShelterFormField
                        label="País"
                        type="text"
                        register={register}
                        name="address.country"
                        error={errors.address?.country?.message}
                      />
                    </div>
                  </div>
                </ShelterFormSection>

                <ShelterFormSection title="Contacto">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <ShelterFormField
                        label="Teléfono"
                        type="tel"
                        register={register}
                        name="contact.phone"
                        error={errors.contact?.phone?.message}
                        required
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
                      />
                    </div>
                    <div className="col-12">
                      <ShelterFormField
                        label="Sitio Web"
                        type="url"
                        register={register}
                        name="contact.website"
                        error={errors.contact?.website?.message}
                      />
                    </div>
                  </div>
                </ShelterFormSection>

                <ShelterFormSection title="Redes Sociales">
                  <div className="row g-3">
                    <div className="col-md-4">
                      <ShelterFormField
                        label="Facebook"
                        type="url"
                        register={register}
                        name="contact.socialMedia.facebook"
                        error={errors.contact?.socialMedia?.facebook?.message}
                      />
                    </div>
                    <div className="col-md-4">
                      <ShelterFormField
                        label="Instagram"
                        type="url"
                        register={register}
                        name="contact.socialMedia.instagram"
                        error={errors.contact?.socialMedia?.instagram?.message}
                      />
                    </div>
                    <div className="col-md-4">
                      <ShelterFormField
                        label="Twitter"
                        type="url"
                        register={register}
                        name="contact.socialMedia.twitter"
                        error={errors.contact?.socialMedia?.twitter?.message}
                      />
                    </div>
                  </div>
                </ShelterFormSection>
              </form>
            </div>

            <div className="modal-footer bg-light border-top rounded-bottom-3">
              <button
                type="button"
                className="btn btn-outline-secondary px-4"
                onClick={handleClose}
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary px-4"
                onClick={handleSubmit(handleFormSubmit)}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ShelterRegistrationForm; 