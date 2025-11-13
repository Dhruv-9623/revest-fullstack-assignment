'use client';

import { Controller, Control, FieldErrors } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import { FormField, FormValues } from '@/types/form.types';

interface ListFieldComponentProps {
  field: FormField;
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
}

/**
 * ListFieldComponent - Renders a Material UI Select dropdown
 * Supports validation: required
 */
export default function ListFieldComponent({
  field,
  control,
  errors,
}: ListFieldComponentProps) {
  const fieldName = field.name;
  const error = errors[fieldName];
  const options = field.listOfValues1 || [];

  // Get default value index
  const defaultValueIndex = field.defaultValue
    ? parseInt(field.defaultValue) - 1
    : 0;
  const defaultValue = options[defaultValueIndex] || options[0] || '';

  return (
    <Controller
      name={fieldName}
      control={control}
      rules={{
        required: field.required ? `${field.name} is required` : false,
      }}
      defaultValue={defaultValue}
      render={({ field: controllerField }) => (
        <FormControl fullWidth error={!!error} sx={{ mb: 2 }}>
          <InputLabel required={field.required}>{field.name}</InputLabel>
          <Select
            {...controllerField}
            label={field.name}
            variant="outlined"
            fullWidth
          >
            {options.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>{error.message as string}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}

