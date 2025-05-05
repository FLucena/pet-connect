import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/forms/Form';
import { Textarea } from '@/components/ui/forms/Textarea';
import { FormFieldProps, AdoptionFormValues } from './types';

export const AdoptionFormStepPetExperience: React.FC = () => {
  const form = useFormContext<AdoptionFormValues>();

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Experiencia con Mascotas</h3>
      <div className="row g-3">
        <div className="col-md-6">
          <FormField
            control={form.control}
            name="hasOtherPets"
            render={({ field }: FormFieldProps<'hasOtherPets'>) => (
              <FormItem className="mb-3">
                <div className="form-check">
                  <FormControl>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="hasOtherPets"
                      checked={field.value}
                      onChange={e => field.onChange(e.target.checked)}
                    />
                  </FormControl>
                  <FormLabel className="form-check-label" htmlFor="hasOtherPets">
                    ¿Tienes otras mascotas?
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {form.watch('hasOtherPets') && (
          <div className="col-md-6">
            <FormField
              control={form.control}
              name="otherPetsDescription"
              render={({ field }: FormFieldProps<'otherPetsDescription'>) => (
                <FormItem className="mb-3">
                  <FormLabel className="form-label">Describe tus otras mascotas</FormLabel>
                  <FormControl>
                    <Textarea className="form-control" placeholder="Especie, edad, tamaño, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
        <div className="col-md-12">
          <FormField
            control={form.control}
            name="experience"
            render={({ field }: FormFieldProps<'experience'>) => (
              <FormItem className="mb-3">
                <FormLabel className="form-label">Experiencia con Mascotas</FormLabel>
                <FormControl>
                  <Textarea className="form-control" placeholder="Describe tu experiencia previa con mascotas" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-md-12">
          <FormField
            control={form.control}
            name="hoursAlone"
            render={({ field }: FormFieldProps<'hoursAlone'>) => (
              <FormItem className="mb-3">
                <FormLabel className="form-label">Horas que la mascota estará sola</FormLabel>
                <FormControl>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ej: 4 horas al día"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}; 