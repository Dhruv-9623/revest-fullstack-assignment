/**
 * Field types supported by the form builder
 */
export type FieldType = 'TEXT' | 'LIST' | 'RADIO';

/**
 * Form field definition interface
 */
export interface FormField {
  id: number;
  name: string;
  fieldType: FieldType;
  minLength?: number;
  maxLength?: number;
  defaultValue?: string;
  required?: boolean;
  listOfValues1?: string[];
}

/**
 * Form schema structure
 */
export interface FormSchema {
  data: FormField[];
}

/**
 * Form values type (dynamic based on field names)
 */
export type FormValues = Record<string, string>;

