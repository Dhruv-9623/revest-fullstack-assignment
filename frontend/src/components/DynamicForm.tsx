'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useState, useEffect } from 'react';
import { FormSchema, FormValues } from '@/types/form.types';
import TextFieldComponent from './TextFieldComponent';
import ListFieldComponent from './ListFieldComponent';
import RadioFieldComponent from './RadioFieldComponent';

interface DynamicFormProps {
  schema: FormSchema;
}

/**
 * DynamicForm - Main form component that renders fields dynamically based on JSON schema
 * Handles form validation, submission, and localStorage persistence
 */
export default function DynamicForm({ schema }: DynamicFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        reset(parsed);
        setSubmittedData(parsed);
      } catch (error) {
        console.error('Error loading form data from localStorage:', error);
      }
    }
  }, [reset]);

  /**
   * Handle form submission
   * Saves data to localStorage and shows success message
   */
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    try {
      // Save to localStorage
      localStorage.setItem('formData', JSON.stringify(data));
      setSubmittedData(data);
      setShowSuccess(true);
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  };

  /**
   * Render field component based on fieldType
   */
  const renderField = (field: FormSchema['data'][0]) => {
    switch (field.fieldType) {
      case 'TEXT':
        return (
          <TextFieldComponent
            key={field.id}
            field={field}
            control={control}
            errors={errors}
          />
        );
      case 'LIST':
        return (
          <ListFieldComponent
            key={field.id}
            field={field}
            control={control}
            errors={errors}
          />
        );
      case 'RADIO':
        return (
          <RadioFieldComponent
            key={field.id}
            field={field}
            control={control}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mb: 3 }}>
          {schema.data.map((field) => renderField(field))}
        </Box>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button
            type="button"
            variant="outlined"
            onClick={() => reset()}
            sx={{ minWidth: 100 }}
          >
            Reset
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ minWidth: 100 }}
          >
            Submit
          </Button>
        </Box>
      </form>

      {/* Display submitted data */}
      {submittedData && (
        <Box sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="h6" gutterBottom>
            Submitted Data:
          </Typography>
          <Box
            component="pre"
            sx={{
              p: 2,
              bgcolor: 'grey.100',
              borderRadius: 1,
              overflow: 'auto',
              fontSize: '0.875rem',
            }}
          >
            {JSON.stringify(submittedData, null, 2)}
          </Box>
        </Box>
      )}

      {/* Success notification */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Form submitted successfully! Data saved to localStorage.
        </Alert>
      </Snackbar>
    </Paper>
  );
}

