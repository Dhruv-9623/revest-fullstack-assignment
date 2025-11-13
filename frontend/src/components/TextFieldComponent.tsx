'use client';

import { Controller, Control, FieldErrors } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { FormField, FormValues } from '@/types/form.types';

interface TextFieldComponentProps {
  field: FormField;
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
}

/**
 * TextFieldComponent - Renders a Material UI TextField
 * Supports validation: required, minLength, maxLength
 */
export default function TextFieldComponent({
  field,
  control,
  errors,
}: TextFieldComponentProps) {
  const fieldName = field.name;
  const error = errors[fieldName];

  return (
    <Controller
      name={fieldName}
      control={control}
      rules={{
        required: field.required ? `${field.name} is required` : false,
        minLength: field.minLength
          ? {
              value: field.minLength,
              message: `Minimum length is ${field.minLength}`,
            }
          : undefined,
        maxLength: field.maxLength
          ? {
              value: field.maxLength,
              message: `Maximum length is ${field.maxLength}`,
            }
          : undefined,
      }}
      defaultValue={field.defaultValue || ''}
      render={({ field: controllerField }) => (
        <FormControl fullWidth error={!!error} sx={{ mb: 2 }}>
          <TextField
            {...controllerField}
            label={field.name}
            variant="outlined"
            fullWidth
            required={field.required}
            error={!!error}
            helperText={error?.message as string}
          />
        </FormControl>
      )}
    />
  );
}

