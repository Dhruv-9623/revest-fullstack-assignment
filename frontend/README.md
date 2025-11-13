# Frontend - Dynamic Form Builder

A Next.js application with TypeScript and Material UI that builds dynamic forms from JSON schema.

## Features

- **Dynamic Form Generation**: Forms are generated from JSON schema
- **Multiple Field Types**: Supports TEXT, LIST (Select), and RADIO fields
- **Form Validation**: Built-in validation for required fields, min/max length
- **LocalStorage Persistence**: Form data is automatically saved to localStorage
- **Material UI**: Beautiful, responsive UI using Material-UI components
- **React Hook Form**: Efficient form handling with React Hook Form

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── DynamicForm.tsx           # Main form component
│   │   ├── TextFieldComponent.tsx    # Text field renderer
│   │   ├── ListFieldComponent.tsx    # Select dropdown renderer
│   │   └── RadioFieldComponent.tsx   # Radio group renderer
│   ├── types/                 # TypeScript types
│   │   └── form.types.ts      # Form-related types
│   └── data/                  # Data files
│       └── formSchema.ts      # JSON form schema
├── package.json
└── tsconfig.json
```

## Installation

```bash
cd frontend
npm install
```

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at **http://localhost:3000**

### Production Build

```bash
npm run build
npm start
```

## Form Schema

The form is dynamically generated from a JSON schema located in `src/data/formSchema.ts`:

```typescript
{
  "data": [
    {
      "id": 1,
      "name": "Full Name",
      "fieldType": "TEXT",
      "minLength": 1,
      "maxLength": 100,
      "defaultValue": "John Doe",
      "required": true
    },
    {
      "id": 2,
      "name": "Email",
      "fieldType": "TEXT",
      "minLength": 1,
      "maxLength": 50,
      "defaultValue": "hello@mail.com",
      "required": true
    },
    {
      "id": 6,
      "name": "Gender",
      "fieldType": "LIST",
      "defaultValue": "1",
      "required": true,
      "listOfValues1": ["Male", "Female", "Others"]
    },
    {
      "id": 7,
      "name": "Love React?",
      "fieldType": "RADIO",
      "defaultValue": "1",
      "required": true,
      "listOfValues1": ["Yes", "No"]
    }
  ]
}
```

### Schema Properties

- **id**: Unique identifier for the field
- **name**: Field label/name
- **fieldType**: Type of field (`TEXT`, `LIST`, `RADIO`)
- **minLength**: Minimum length for TEXT fields (optional)
- **maxLength**: Maximum length for TEXT fields (optional)
- **defaultValue**: Default value for the field
- **required**: Whether the field is required
- **listOfValues1**: Array of options for LIST and RADIO fields

## Field Types

### TEXT
Renders a Material UI `TextField` component.

**Supported validations:**
- `required`: Field must be filled
- `minLength`: Minimum character length
- `maxLength`: Maximum character length

### LIST
Renders a Material UI `Select` dropdown component.

**Supported validations:**
- `required`: Field must be selected

**Options:** Provided via `listOfValues1` array

### RADIO
Renders a Material UI `RadioGroup` component.

**Supported validations:**
- `required`: Field must be selected

**Options:** Provided via `listOfValues1` array

## Form Features

### Validation
- Real-time validation using React Hook Form
- Error messages displayed below each field
- Required field indicators
- Custom validation rules based on schema

### Data Persistence
- Form data is automatically saved to `localStorage` on submission
- Saved data is automatically loaded when the page refreshes
- Data key: `formData`

### User Experience
- Responsive design that works on all screen sizes
- Success notification on form submission
- Reset button to clear form
- Submitted data display below the form

## Customization

### Adding New Field Types

1. Create a new component in `src/components/` (e.g., `CheckboxFieldComponent.tsx`)
2. Add the field type to `FieldType` in `src/types/form.types.ts`
3. Update `DynamicForm.tsx` to handle the new field type in the `renderField` function

### Modifying Form Schema

Edit `src/data/formSchema.ts` to change the form structure. The UI will automatically update based on the new schema.

### Styling

The application uses Material UI's theming system. Modify the theme in `src/app/page.tsx` to customize colors, typography, etc.

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Material UI (MUI)**: React component library
- **React Hook Form**: Form state management and validation
- **Emotion**: CSS-in-JS styling (used by MUI)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Linting

```bash
npm run lint
```

### Type Checking

TypeScript type checking is done automatically during build. For manual checking:

```bash
npx tsc --noEmit
```

## Notes

- Form data persists in browser localStorage
- The form automatically adapts to schema changes
- All components are fully typed with TypeScript
- The application follows Next.js 14 App Router conventions
- Material UI components are used for consistent, accessible UI

