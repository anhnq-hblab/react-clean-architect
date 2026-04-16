import React from 'react';
import { Input, InputProps } from '../../atoms';
import './FormField.css';

export interface FormFieldProps extends InputProps {
  name: string;
}

export const FormField: React.FC<FormFieldProps> = ({ name, ...props }) => {
  return (
    <div className="form-field">
      <Input name={name} {...props} />
    </div>
  );
};

export default FormField;
