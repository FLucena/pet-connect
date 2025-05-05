import * as z from 'zod';
import { ControllerRenderProps } from 'react-hook-form';

export const adoptionFormSchema = z.object({
  // Personal Information
  fullName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'El teléfono debe tener al menos 10 dígitos'),
  occupation: z.string().min(2, 'La ocupación debe tener al menos 2 caracteres'),
  
  // Address Information
  address: z.string().min(5, 'La dirección debe tener al menos 5 caracteres'),
  city: z.string().min(2, 'La ciudad debe tener al menos 2 caracteres'),
  state: z.string().min(2, 'El estado debe tener al menos 2 caracteres'),
  zipCode: z.string().min(5, 'El código postal debe tener al menos 5 dígitos'),
  
  // Living Conditions
  livingType: z.enum(['casa', 'departamento', 'otro']),
  hasGarden: z.boolean(),
  yardSize: z.string().optional(),
  homeType: z.string().min(2, 'Por favor especifica el tipo de vivienda'),
  
  // Pet Experience
  hasOtherPets: z.boolean(),
  otherPetsDescription: z.string().optional(),
  experience: z.string().min(10, 'Por favor describe tu experiencia con mascotas'),
  hoursAlone: z.string().min(1, 'Por favor especifica las horas que la mascota estará sola'),
  
  // Family Situation
  familyMembers: z.string().min(1, 'Por favor especifica el número de miembros de la familia'),
  workSchedule: z.string().min(1, 'Por favor especifica tu horario de trabajo'),
  
  // Adoption Details
  adoptionReason: z.string().min(10, 'Por favor explica tu motivo para adoptar'),
  previousExperience: z.string().min(10, 'Por favor describe tu experiencia previa con mascotas'),
  petPreferences: z.string().min(1, 'Por favor especifica tus preferencias'),
  
  // Terms and Conditions
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar los términos y condiciones",
  }),
});

export type AdoptionFormValues = z.infer<typeof adoptionFormSchema>;

export interface AdoptionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AdoptionFormValues) => void;
}

export type FormFieldProps<T extends keyof AdoptionFormValues> = {
  field: ControllerRenderProps<AdoptionFormValues, T>;
}; 