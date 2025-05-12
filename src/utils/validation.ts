import { NewShelterFormData } from '@/types/shelter';

interface ValidationResult {
  success: boolean;
  errors?: Record<string, string>;
}

export const validateShelterData = (data: Partial<NewShelterFormData>): ValidationResult => {
  const errors: Record<string, string> = {};

  console.log('Validating shelter data:', data);

  // Required fields
  if (!data.name?.trim()) {
    errors.name = 'El nombre es requerido';
  }

  if (!data.description?.trim()) {
    errors.description = 'La descripción es requerida';
  }

  // Location validation
  if (data.location) {
    if (!data.location.address?.trim()) {
      errors['location.address'] = 'La dirección es requerida';
    }
    if (!data.location.city?.trim()) {
      errors['location.city'] = 'La ciudad es requerida';
    }
    if (!data.location.state?.trim()) {
      errors['location.state'] = 'La provincia es requerida';
    }
  }

  // Contact validation
  if (data.contact) {
    if (!data.contact.phone?.trim()) {
      errors['contact.phone'] = 'El teléfono es requerido';
    }
    if (!data.contact.email?.trim()) {
      errors['contact.email'] = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contact.email)) {
      errors['contact.email'] = 'El email no es válido';
    }
  }

  // Social media validation (all optional)
  if (data.contact?.socialMedia) {
    const { facebook, instagram, twitter } = data.contact.socialMedia;
    // Only validate if the field is not empty and contains a URL
    if (facebook && facebook.trim() !== '' && facebook.includes('http') && !/^https?:\/\/.+/.test(facebook)) {
      errors['contact.socialMedia.facebook'] = 'La URL de Facebook no es válida';
    }
    if (instagram && instagram.trim() !== '' && instagram.includes('http') && !/^https?:\/\/.+/.test(instagram)) {
      errors['contact.socialMedia.instagram'] = 'La URL de Instagram no es válida';
    }
    if (twitter && twitter.trim() !== '' && twitter.includes('http') && !/^https?:\/\/.+/.test(twitter)) {
      errors['contact.socialMedia.twitter'] = 'La URL de Twitter no es válida';
    }
  }

  // Capacity validation (total and available are optional)
  if (data.capacity) {
    if (
      data.capacity.total !== undefined &&
      data.capacity.total !== null &&
      (typeof data.capacity.total !== 'number' || data.capacity.total < 0)
    ) {
      errors['capacity.total'] = 'La capacidad total debe ser un número positivo';
    }
    if (
      data.capacity.current !== undefined &&
      data.capacity.current !== null &&
      (typeof data.capacity.current !== 'number' || data.capacity.current < 0)
    ) {
      errors['capacity.current'] = 'La capacidad actual debe ser un número positivo';
    }
    if (
      data.capacity.available !== undefined &&
      data.capacity.available !== null &&
      (typeof data.capacity.available !== 'number' || data.capacity.available < 0)
    ) {
      errors['capacity.available'] = 'La capacidad disponible debe ser un número positivo';
    }
  }

  return {
    success: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}; 