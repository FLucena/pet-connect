import React from 'react';
import { ShelterFormFieldProps } from '@/types/shelter';

const ShelterFormField: React.FC<ShelterFormFieldProps> = ({
  label,
  type = 'text',
  error,
  required = false,
  rows,
  placeholder,
  register,
  name,
}) => {
  const isTextarea = type === 'textarea';
  const inputClassName = `w-full px-4 py-2 mt-1 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
    error ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
  }`;

  return (
    <div className="mb-6">
      <label 
        htmlFor={name} 
        className="block text-sm font-medium text-gray-700 mb-1"
        id={`${name}-label`}
      >
        {label}
        {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
      </label>
      {isTextarea ? (
        <textarea
          className={inputClassName}
          id={name}
          {...register(name)}
          required={required}
          rows={rows}
          placeholder={placeholder}
          aria-labelledby={`${name}-label`}
          aria-required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${name}-feedback` : undefined}
        />
      ) : (
        <input
          type={type}
          className={inputClassName}
          id={name}
          {...register(name)}
          required={required}
          placeholder={placeholder}
          aria-labelledby={`${name}-label`}
          aria-required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${name}-feedback` : undefined}
        />
      )}
      {error && (
        <div 
          id={`${name}-feedback`} 
          className="mt-1 text-sm text-red-500"
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default ShelterFormField; 