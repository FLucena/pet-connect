import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/forms/Form';
import { Input } from '@/components/ui/forms/Input';
import { FormFieldProps, AdoptionFormValues } from './types';

const AdoptionFormStepPersonal: React.FC = () => {
  const form = useFormContext<AdoptionFormValues>();

  return (
    <div>
      <h4 className="mb-3">Información Personal</h4>
      <div className="row g-3">
        <div className="col-md-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }: FormFieldProps<'fullName'>) => (
              <FormItem className="mb-3">
                <FormLabel className="form-label">Nombre Completo</FormLabel>
                <FormControl>
                  <Input className="form-control" placeholder="Tu nombre completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-md-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }: FormFieldProps<'email'>) => (
              <FormItem className="mb-3">
                <FormLabel className="form-label">Email</FormLabel>
                <FormControl>
                  <Input type="email" className="form-control" placeholder="tu@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-md-6">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }: FormFieldProps<'phone'>) => (
              <FormItem className="mb-3">
                <FormLabel className="form-label">Teléfono</FormLabel>
                <FormControl>
                  <Input className="form-control" placeholder="Tu número de teléfono" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-md-6">
          <FormField
            control={form.control}
            name="occupation"
            render={({ field }: FormFieldProps<'occupation'>) => (
              <FormItem className="mb-3">
                <FormLabel className="form-label">Ocupación</FormLabel>
                <FormControl>
                  <Input className="form-control" placeholder="Tu ocupación" {...field} />
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

export default AdoptionFormStepPersonal; 