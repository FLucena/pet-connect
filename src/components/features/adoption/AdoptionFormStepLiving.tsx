import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/forms/Form';
import { FormFieldProps, AdoptionFormValues } from './types';

export const AdoptionFormStepLiving: React.FC = () => {
  const form = useFormContext<AdoptionFormValues>();

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Condiciones de Vivienda</h3>
      <div className="row g-3">
        <div className="col-md-6">
          <FormField
            control={form.control}
            name="livingType"
            render={({ field }: FormFieldProps<'livingType'>) => (
              <FormItem className="mb-3">
                <FormLabel className="form-label">Tipo de Vivienda</FormLabel>
                <FormControl>
                  <select className="form-select" {...field}>
                    <option value="">Selecciona el tipo de vivienda</option>
                    <option value="casa">Casa</option>
                    <option value="departamento">Departamento</option>
                    <option value="otro">Otro</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-md-6">
          <FormField
            control={form.control}
            name="hasGarden"
            render={({ field }: FormFieldProps<'hasGarden'>) => (
              <FormItem className="mb-3">
                <div className="form-check">
                  <FormControl>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="hasGarden"
                      checked={field.value}
                      onChange={e => field.onChange(e.target.checked)}
                    />
                  </FormControl>
                  <FormLabel className="form-check-label" htmlFor="hasGarden">
                    ¿Tienes jardín o patio?
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {form.watch('hasGarden') && (
          <div className="col-md-12">
            <FormField
              control={form.control}
              name="yardSize"
              render={({ field }: FormFieldProps<'yardSize'>) => (
                <FormItem className="mb-3">
                  <FormLabel className="form-label">Tamaño del Jardín/Patio</FormLabel>
                  <FormControl>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Metros cuadrados"
                      min="0"
                      {...field}
                    />
                  </FormControl>
                  <small className="form-text text-muted">Especifica el tamaño en metros cuadrados</small>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
}; 