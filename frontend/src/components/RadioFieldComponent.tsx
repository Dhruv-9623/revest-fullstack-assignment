'use client';

import { Controller, Control, FieldErrors } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormHelperText from '@mui/material/FormHelperText';
import { FormField, FormValues } from '@/types/form.types';

interface RadioFieldComponentProps {
  field: FormField;
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
}

/**
 * RadioFieldComponent - Renders a Material UI RadioGroup
 * Supports validation: required
 */
export default function RadioFieldComponent({
  field,
  control,
  errors,
}: RadioFieldComponentProps) {
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
        <FormControl
          component="fieldset"
          error={!!error}
          fullWidth
          sx={{ mb: 2 }}
        >
          <FormLabel component="legend" required={field.required}>
            {field.name}
          </FormLabel>
          <RadioGroup {...controllerField} row>
            {options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
          {error && <FormHelperText>{error.message as string}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}

