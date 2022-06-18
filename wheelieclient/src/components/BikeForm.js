import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createBike, updateBike } from '../api/data/BikeData';

const initialState = {
  imageUrl: '',
  brand: '',
  color: '',
  accessories: ''
};

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      {new Date().getFullYear()}
      {' '}
      <Link color="inherit" href="https://albertchittaphong.netlify.app/">
        Albert Chittaphong
      </Link>{'. '}
      All rights reserved.
    </Typography>
  );
}

const mdTheme = createTheme();

function DashboardContent({ bike, biker }) {
  const [formInput, setFormInput] = useState(initialState);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (bike.id) {
        setFormInput({
          id: bike.id,
          bikerId: bike.bikerId,
          imageUrl: bike.imageUrl,
          brand: bike.brand,
          color: bike.color,
          accessories: bike.accessories,
        });
      }
    }

    return() => {
      isMounted = false;
    }
  }, [bike]);

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

    if(bike.id) {
      updateBike(formInput).then(() => {
        resetForm();
        navigate('/gear');
      });
    } else {
        formInput.bikerId = biker.id;
        createBike(formInput).then(() => {
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
            height: '100vh',
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
                      id="imageUrl"
                      label="Image Url"
                      name="imageUrl"
                      value={formInput.imageUrl || ''}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="brand"
                      required
                      fullWidth
                      id="brand"
                      label="Brand Name"
                      value={formInput.brand || ''}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="color"
                      label="Color"
                      id="color"
                      value={formInput.color || ''}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="accessories"
                      required
                      fullWidth
                      id="accessories"
                      label="Accessories"
                      value={formInput.accessories || ''}
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
                  {bike.id ? 'Update' : 'Create'}
                </Button>
              </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function BikeForm({ bike = {}, biker }) {
  return <DashboardContent bike={bike} biker={biker} />;
}

BikeForm.propTypes = {
  bike: PropTypes.shape({}).isRequired
};
