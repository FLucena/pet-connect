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
  type: yup.string().required('El tipo es requerido'),
  description: yup.string().required('La descripción es requerida'),
  location: yup.object().shape({
    address: yup.string().required('La calle es requerida'),
    city: yup.string().required('La ciudad es requerida'),
    state: yup.string().required('La provincia es requerida'),
    postalCode: yup.string().required('El código postal es requerido'),
    country: yup.string().default('Argentina'),
    coordinates: yup.object().shape({
      latitude: yup.number().optional(),
      longitude: yup.number().optional(),
    }).optional(),
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
  capacity: yup.object().shape({
    total: yup.number().required(),
    current: yup.number().required(),
    available: yup.number().required(),
  }),
  facilities: yup.object().shape({
    indoor: yup.boolean().required(),
    outdoor: yup.boolean().required(),
    medical: yup.boolean().required(),
    training: yup.boolean().required(),
    description: yup.string().optional(),
  }),
  staff: yup.object().shape({
    total: yup.number().required(),
    volunteers: yup.number().required(),
    roles: yup.array().of(yup.string()).required(),
  }),
  animals: yup.object().shape({
    total: yup.number().required(),
    byType: yup.object().shape({
      perros: yup.number().required(),
      gatos: yup.number().required(),
    }).required(),
  }),
  services: yup.array().of(yup.string()).default([]),
}) as yup.ObjectSchema<NewShelterFormData>;

const defaultValues: NewShelterFormData = {
  name: '',
  type: '',
  description: '',
  location: {
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Argentina',
    coordinates: {
      latitude: 0,
      longitude: 0,
    },
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
  capacity: { total: 0, current: 0, available: 0 },
  facilities: { indoor: false, outdoor: false, medical: false, training: false, description: '' },
  staff: { total: 0, volunteers: 0, roles: [] },
  animals: { total: 0, byType: { perros: 0, gatos: 0 } },
  services: [],
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
                        name="location.address"
                        error={errors.location?.address?.message}
                        required
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