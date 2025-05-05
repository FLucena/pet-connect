import React from 'react';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => (
  <div className="mb-8">
    <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">{title}</h3>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

export default FormSection; 