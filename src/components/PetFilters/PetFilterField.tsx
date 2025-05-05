import React, { ReactElement, ReactNode, InputHTMLAttributes, SelectHTMLAttributes } from "react";

type FilterFieldProps = {
  label: string;
  id: string;
  children: ReactNode;
};

function isInputElement(child: ReactNode): child is ReactElement<InputHTMLAttributes<HTMLInputElement>> {
  return React.isValidElement(child) && child.type === 'input';
}

function isSelectElement(child: ReactNode): child is ReactElement<SelectHTMLAttributes<HTMLSelectElement>> {
  return React.isValidElement(child) && child.type === 'select';
}

const FilterField: React.FC<FilterFieldProps> = ({ children }) => (
  <div className="mb-3">
    <div className="position-relative">
      {isInputElement(children)
        ? React.cloneElement(children, {
            className: `${children.props.className || ''} rounded shadow-sm mb-2`.replace(/\s+/g, ' ').trim()
          })
        : isSelectElement(children)
        ? React.cloneElement(children, {
            className: `${children.props.className || ''} rounded shadow-sm mb-2`.replace(/\s+/g, ' ').trim()
          })
        : children}
    </div>
  </div>
);

export default FilterField; 