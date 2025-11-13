'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DynamicForm from '@/components/DynamicForm';
import { formSchema } from '@/data/formSchema';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Dynamic Form Builder
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Form fields are dynamically generated from JSON schema
          </Typography>
        </Box>
        <DynamicForm schema={formSchema} />
      </Container>
    </ThemeProvider>
  );
}

