import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createClothing, updateClothing } from '../api/data/ClothingData';

const initialState = {
	jersey: '',
	goggles: '',
	shoes: '',
	helmet: '',
	other: ''
};

const mdTheme = createTheme();

function DashboardContent({ clothing, biker }) {
  const [formInput, setFormInput] = useState(initialState);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (clothing.id) {
        setFormInput({
          id: clothing.id,
          bikerId: clothing.bikerId,
          jersey: clothing.jersey,
          goggles: clothing.goggles,
          shoes: clothing.shoes,
          helmet: clothing.helmet,
          other: clothing.other,
        });
      }
    }

    return() => {
      isMounted = false;
    }
  }, [clothing]);

  const resetForm = () => {
    setFormInput(initialState);
  };

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(clothing.id) {
      updateClothing(formInput).then(() => {
        resetForm();
        navigate('/gear');
      });
    } else {
        formInput.bikerId = biker.id;
        createClothing(formInput).then(() => {
          resetForm();
          navigate('/gear');
        });
    }
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container component="main" maxWidth="xs">
            <CssBaseline />

              <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="jersey"
                      label="Jersey"
                      name="jersey"
                      value={formInput.jersey || ''}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="goggles"
                      required
                      fullWidth
                      id="goggles"
                      label="Sunglasses"
                      value={formInput.goggles || ''}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="shoes"
                      label="Shoes"
                      id="shoes"
                      value={formInput.shoes || ''}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="helmet"
                      required
                      fullWidth
                      id="helmet"
                      label="Helmet"
                      value={formInput.helmet || ''}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="other"
                      required
                      fullWidth
                      id="other"
                      label="Other"
                      value={formInput.other || ''}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSubmit}
                >
                  {clothing.id ? 'Update' : 'Add'}
                </Button>
              </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function ClothingForm({ clothing = {}, biker }) {
  return <DashboardContent clothing={clothing} biker={biker} />;
}

ClothingForm.propTypes = {
  clothing: PropTypes.shape({}).isRequired
};
