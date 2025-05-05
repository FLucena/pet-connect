import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/forms/Form';
import { Input } from '@/components/ui/forms/Input';
import { FormFieldProps, AdoptionFormValues } from './types';

export const AdoptionFormStepAddress: React.FC = () => {
  const form = useFormContext<AdoptionFormValues>();

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Dirección</h3>
      <div className="row g-3">
        <div className="col-md-6">
          <FormField
            control={form.control}
            name="address"
            render={({ field }: FormFieldProps<'address'>) => (
              <FormItem className="mb-3">
                <FormLabel className="form-label">Dirección</FormLabel>
                <FormControl>
                  <Input className="form-control" placeholder="Tu dirección" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-md-6">
          <FormField
            control={form.control}
            name="city"
            render={({ field }: FormFieldProps<'city'>) => (
              <FormItem className="mb-3">
                <FormLabel className="form-label">Ciudad</FormLabel>
                <FormControl>
                  <Input className="form-control" placeholder="Tu ciudad" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-md-6">
          <FormField
            control={form.control}
            name="state"
            render={({ field }: FormFieldProps<'state'>) => (
              <FormItem className="mb-3">
                <FormLabel className="form-label">Estado</FormLabel>
                <FormControl>
                  <Input className="form-control" placeholder="Tu estado" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-md-6">
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }: FormFieldProps<'zipCode'>) => (
              <FormItem className="mb-3">
                <FormLabel className="form-label">Código Postal</FormLabel>
                <FormControl>
                  <Input className="form-control" placeholder="Tu código postal" {...field} />
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