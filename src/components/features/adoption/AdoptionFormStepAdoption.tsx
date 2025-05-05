import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/forms/Form';
import { Textarea } from '@/components/ui/forms/Textarea';
import { FormFieldProps, AdoptionFormValues } from './types';

export const AdoptionFormStepAdoption: React.FC = () => {
  const form = useFormContext<AdoptionFormValues>();

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Motivación y Preferencias</h3>
      <div className="row g-3">
        <div className="col-md-12">
          <FormField
            control={form.control}
            name="adoptionReason"
            render={({ field }: FormFieldProps<'adoptionReason'>) => (
              <FormItem className="mb-3">
                <FormLabel className="form-label">Motivo de la Adopción</FormLabel>
                <FormControl>
                  <Textarea className="form-control" placeholder="¿Por qué quieres adoptar una mascota?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-md-12">
          <FormField
            control={form.control}
            name="petPreferences"
            render={({ field }: FormFieldProps<'petPreferences'>) => (
              <FormItem className="mb-3">
                <FormLabel className="form-label">Preferencias de Mascota</FormLabel>
                <FormControl>
                  <Textarea className="form-control" placeholder="¿Qué tipo de mascota buscas? (edad, tamaño, raza, etc.)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="agreeTerms"
          render={({ field }: FormFieldProps<'agreeTerms'>) => (
            <FormItem className="mb-3">
              <div className="form-check">
                <FormControl>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="agreeTerms"
                    checked={field.value}
                    onChange={e => field.onChange(e.target.checked)}
                  />
                </FormControl>
                <FormLabel className="form-check-label" htmlFor="agreeTerms">
                  Acepto los términos y condiciones de adopción
                </FormLabel>
                <FormMessage className="text-danger" />
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}; 