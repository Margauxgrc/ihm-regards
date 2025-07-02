import React from 'react';
import { TextField } from '@mui/material';

interface CustomTextFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
}

export default function CustomTextField({ label, type = 'text', value, onChange }: CustomTextFieldProps) {
  return (
    <TextField
      label={label}
      type={type}
      variant="standard"
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      margin="normal"
    />
  );
}
