import React from 'react';
import { Controller } from 'react-hook-form';

export const FormField = Controller;

export const Form: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>{children}</div>
);

export const FormItem: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={className}>{children}</div>
);

export const FormLabel: React.FC<{ children: React.ReactNode; className?: string; htmlFor?: string }> = ({ children, className, htmlFor }) => (
  <label className={className} htmlFor={htmlFor}>{children}</label>
);

export const FormControl: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>{children}</div>
);

export const FormMessage: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <p className="text-sm text-red-500 mt-1">{children}</p>
); 