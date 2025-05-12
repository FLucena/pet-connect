import React from 'react';
import { UseFormRegister, Path } from 'react-hook-form';
import { NewShelterFormData } from '@/types/shelter';

interface ShelterFormFieldProps {
  label: string;
  type?: string;
  error?: string;
  required?: boolean;
  rows?: number;
  placeholder?: string;
  register: UseFormRegister<NewShelterFormData>;
  name: Path<NewShelterFormData>;
  className?: string;
}

const ShelterFormField: React.FC<ShelterFormFieldProps> = ({
  label,
  type = 'text',
  error,
  required = false,
  rows,
  placeholder,
  register,
  name,
  className,
}) => {
  const isTextarea = type === 'textarea';
  const inputClassName = `w-full px-4 py-2 mt-1 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
    error ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
  } ${className || ''}`;

  return (
    <div className="mb-6">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {isTextarea ? (
        <textarea
          className={inputClassName}
          id={name}
          {...register(name)}
          required={required}
          rows={rows}
          placeholder={placeholder}
          aria-describedby={`${name}-feedback`}
        />
      ) : (
        <input
          type={type}
          className={inputClassName}
          id={name}
          {...register(name)}
          required={required}
          placeholder={placeholder}
          aria-describedby={`${name}-feedback`}
        />
      )}
      {error && (
        <div 
          id={`${name}-feedback`} 
          className="mt-2 px-3 py-2 text-sm text-white bg-red-500 rounded-md shadow-sm"
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default ShelterFormField; 