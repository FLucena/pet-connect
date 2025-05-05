import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/forms/Form';
import { Input } from '@/components/ui/forms/Input';
import { FormFieldProps, AdoptionFormValues } from './types';

export const AdoptionFormStepFamily: React.FC = () => {
  const form = useFormContext<AdoptionFormValues>();

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Situación Familiar</h3>
      <div className="row g-3">
        <div className="col-md-6">
          <FormField
            control={form.control}
            name="familyMembers"
            render={({ field }: FormFieldProps<'familyMembers'>) => (
              <FormItem className="mb-3">
                <FormLabel className="form-label">Miembros de la Familia</FormLabel>
                <FormControl>
                  <Input className="form-control" placeholder="Número de personas en el hogar" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-md-6">
          <FormField
            control={form.control}
            name="workSchedule"
            render={({ field }: FormFieldProps<'workSchedule'>) => (
              <FormItem className="mb-3">
                <FormLabel className="form-label">Horario de Trabajo</FormLabel>
                <FormControl>
                  <Input className="form-control" placeholder="Tu horario de trabajo" {...field} />
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