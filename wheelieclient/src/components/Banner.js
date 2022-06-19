import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function Banner() {
  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(https://swacdn.s3.amazonaws.com/wp-content/uploads/2019/02/15235150/Buffalo-Bayou-Park-Aerial-David-Lloyd-0114-2.jpg)`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src="https://swacdn.s3.amazonaws.com/wp-content/uploads/2019/02/15235150/Buffalo-Bayou-Park-Aerial-David-Lloyd-0114-2.jpg" alt="Buffalo Bayou Houston, TX" />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              WHEELIE
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              WELCOME
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
