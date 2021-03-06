import React, { useEffect, useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Button } from '@mui/material';
import Title from '../components/Title';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import { mainListItems, secondaryListItems } from '../components/ListItems';
import { getTrailsByBikerId } from '../api/data/TrailData';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent({ biker }) {
  const [open, setOpen] = useState(true);
  const [trails, setTrails] = useState([]);
  const navigate = useNavigate();
  let totalDistance = 0;
  let numOfRides = 0;
  let totalTime = 0;

  const handleClick = (method) => {
    if (method === 'edit') {
      navigate(`/edit-biker/${biker.firebaseUserId}`);
    }
  }

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted && Object.keys(biker).length !== 0) {
      getTrailsByBikerId(biker.id).then(setTrails);
    }

    return () => {
      isMounted = false;
    }
  }, [biker]);

  trails.forEach((trail) => {
    totalDistance += trail.distance;
    totalTime += trail.time;
    numOfRides++;
  });

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}
          sx={{
            backgroundColor: '#000000'
          }}
        >
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h4"
              color="inherit"
              noWrap
              sx={{ marginRight: "1em" }}
            >
              Wheelie
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}
          sx={{
            backgroundColor: '#fca311', 
          }}
        >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1]
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            minHeight: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Banner biker={biker} />
          <Container maxWidth="xs"
            sx={{
              mt: 4, mb: 4
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Typography component="p" variant="h2">
                  {biker.name}
                </Typography>
                <Typography component="p" variant="h4">
                  @{biker.userName}
                  <Button onClick={() => handleClick('edit')}>Edit</Button>
                </Typography>
              </Grid>
              <Grid item xs={12} md={8} lg={9}>
                <Title>Location</Title>
                <Typography component="p" variant="h4">
                  {biker.location}
                </Typography>
              </Grid>
              <Grid item xs={12} md={8} lg={9}>
                <Title>Level</Title>
                <Typography component="p" variant="h4">
                  {biker.level}
                </Typography>
              </Grid>
              <Grid item xs={12} md={8} lg={9}>
                <Title>Rides</Title>
                <Typography component="p" variant="h4">
                  {numOfRides}
                </Typography>
              </Grid>
              <Grid item xs={12} md={8} lg={9}>
                <Title>Total Distance Ridden</Title>
                <Typography component="p" variant="h4">
                  {totalDistance} miles
                </Typography>
              </Grid>
              <Grid item xs={12} md={8} lg={9}>
                <Title>Total Time Ridden</Title>
                <Typography component="p" variant="h4">
                  {totalTime} hours
                </Typography>
              </Grid>
            </Grid>
          </Container>
      <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Home({ biker }) {
  return <DashboardContent biker={biker} />;
}
