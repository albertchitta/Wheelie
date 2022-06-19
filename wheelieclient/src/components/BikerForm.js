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
import { updateBiker } from '../api/data/BikerData';

const initialState = {
  name: '',
  email: '',
  userName: '',
  level: '',
  location: '',
  imageUrl: '',
  role: ''
};

const mdTheme = createTheme();

function DashboardContent({ biker }) {
  const [formInput, setFormInput] = useState(initialState);
  const navigate = useNavigate();


  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (biker.id) {
        setFormInput({
          id: biker.id,
          firebaseUserId: biker.firebaseUserId,
          name: biker.name,
          email: biker.email,
          userName: biker.userName,
          level: biker.level,
          location: biker.location,
          imageUrl: biker.imageUrl,
          role: biker.role
        });
      }
    }

    return() => {
      isMounted = false;
    }
  }, [biker]);

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

    if(biker.id) {
      updateBiker(formInput).then(() => {
        resetForm();
        navigate('/');
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
                      name="name"
                      required
                      fullWidth
                      id="name"
                      label="Full Name"
                      value={formInput.name || ''}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      value={formInput.email || ''}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="userName"
                      label="User Name"
                      id="userName"
                      value={formInput.userName || ''}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="level"
                      required
                      fullWidth
                      id="level"
                      label="Experience Level"
                      value={formInput.level || ''}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="location"
                      required
                      fullWidth
                      label="Location"
                      id="location"
                      value={formInput.location || ''}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="imageUrl"
                      required
                      fullWidth
                      label="Profile Image Url"
                      id="imageUrl"
                      value={formInput.imageUrl || ''}
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
                  Update
                </Button>
              </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function BikerForm({ biker }) {
  return <DashboardContent biker={biker} />;
}

BikerForm.propTypes = {
  biker: PropTypes.shape({
    id: PropTypes.number,
    firebaseUserId: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    userName: PropTypes.string,
    level: PropTypes.string,
    location: PropTypes.string,
    imageUrl: PropTypes.string,
    role: PropTypes.string
  }).isRequired
}
