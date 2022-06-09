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
import InputAdornment from '@mui/material/InputAdornment';
import { createTrail, updateTrail } from '../api/data/TrailData';

const initialState = {
  name: '',
  imageUrl: '',
  location: '',
  distance: '',
  grade: ''
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

function DashboardContent({ trail }) {
  const [formInput, setFormInput] = useState(initialState);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (trail.id) {
        setFormInput({
          id: trail.id,
          name: trail.name,
          imageUrl: trail.imageUrl,
          location: trail.location,
          distance: trail.distance,
          grade: trail.grade
        });
      }
    }

    return() => {
      isMounted = false;
    }
  }, [trail]);

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

    if(trail.id) {
      updateTrail(formInput).then(() => {
        resetForm();
        navigate('/explore');
      });
    } else {
        createTrail(formInput).then(() => {
          resetForm();
          navigate('/explore');
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
                      name="name"
                      required
                      fullWidth
                      id="name"
                      label="Trail Name"
                      value={formInput.name || ''}
                      onChange={handleChange}
                    />
                  </Grid>
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
                      required
                      fullWidth
                      name="location"
                      label="Location"
                      id="location"
                      value={formInput.location || ''}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="distance"
                      required
                      fullWidth
                      id="distance"
                      label="Distance Traveled"
                      InputProps={{
                        endAdornment: <InputAdornment position="end">mi</InputAdornment>,
                      }}
                      value={formInput.distance || ''}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="grade"
                      required
                      fullWidth
                      label="Grade"
                      id="grade"
                      value={formInput.grade || ''}
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
                  {trail.id ? 'Update' : 'Create'}
                </Button>
              </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function TrailForm({ trail = {} }) {
  return <DashboardContent trail={trail} />;
}

TrailForm.propTypes = {
  trail: PropTypes.shape({}).isRequired
};
