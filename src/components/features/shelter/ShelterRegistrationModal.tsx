import React, { useEffect, useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NewShelterFormData } from '@/types/shelter';
import GeneralInfoSection from './sections/GeneralInfoSection';
import AddressSection from './sections/AddressSection';
import ContactSection from './sections/ContactSection';
import SocialMediaSection from './sections/SocialMediaSection';
import ModalFooter from './components/ModalFooter';

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
    country: yup.string().required('El país es requerido'),
    coordinates: yup.object().shape({
      lat: yup.number().optional(),
      lng: yup.number().optional(),
    }).optional(),
  }),
  contact: yup.object().shape({
    phone: yup.string().required('El teléfono es requerido'),
    email: yup.string().email('El email no es válido').required('El email es requerido'),
    website: yup.string().url('La URL no es válida').optional(),
    socialMedia: yup.object().shape({
      facebook: yup.string().optional(),
      instagram: yup.string().optional(),
      twitter: yup.string().optional(),
    }).optional(),
  }),
  capacity: yup.object().shape({
    total: yup.number().required('La capacidad total es requerida'),
    current: yup.number().required('La capacidad actual es requerida'),
    available: yup.number().required('La capacidad disponible es requerida'),
  }),
  services: yup.array().of(yup.string()).default([]),
  images: yup.array().of(yup.string()).default([]),
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
    country: '',
    coordinates: {
      lat: 0,
      lng: 0,
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
  services: [],
  images: [],
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
        className="modal-backdrop fade show bg-dark bg-opacity-75 position-fixed top-0 start-0 w-100 h-100"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="modal fade show d-block" tabIndex={-1}>
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content border-0 shadow-lg rounded-3">
            <div className="modal-header bg-primary text-white rounded-top-3 py-3">
              <h5 className="modal-title fw-bold mb-0 fs-4">Registrar Nuevo Refugio</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={handleClose}
                aria-label="Close"
              />
            </div>

            <div className="modal-body p-4 bg-light">
              <form onSubmit={handleSubmit(handleFormSubmit)} className="needs-validation" noValidate>
                <GeneralInfoSection register={register} errors={errors} />
                <AddressSection register={register} errors={errors} />
                <ContactSection register={register} errors={errors} />
                <SocialMediaSection register={register} errors={errors} />
              </form>
            </div>

            <ModalFooter
              onClose={handleClose}
              onSubmit={handleSubmit(handleFormSubmit)}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShelterRegistrationForm; 