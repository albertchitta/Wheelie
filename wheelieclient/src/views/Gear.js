import React, { useState, useEffect } from 'react';
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
import MenuIcon from '@mui/icons-material/Menu';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Grid from '@mui/material/Grid';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Button } from '@mui/material';
import { mainListItems, secondaryListItems } from '../components/ListItems';
import BikeCard from '../components/BikeCard';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { getBikesByBikerId } from '../api/data/BikeData';
import { getClothingsByBikerId } from '../api/data/ClothingData';
import ClothingCard from '../components/ClothingCard';
import Footer from '../components/Footer';

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
  // const [value, setValue] = useState(localStorage.getItem('value'));
  const [value, setValue] = useState('bikes');
  const [bikes, setBikes] = useState([]);
  const [clothings, setClothings] = useState([]);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // setValue(localStorage.setItem('value', newValue));
  };

  const handleClick = (method) => {
    if (method === 'addBike') {
      navigate('/add-bike')
    } else {
      navigate('/add-clothing')
    }
  }

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    let isMounted = true;
    
    if (isMounted && Object.keys(biker).length !== 0) {
      getBikesByBikerId(biker.id).then(setBikes);
      getClothingsByBikerId(biker.id).then(setClothings);
    }

    return () => {
      isMounted = false;
    }
  }, [biker]);

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
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Gear
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="Bikes" value="bikes" />
                  <Tab label="Clothing" value="clothing" />
                </TabList>
              </Box>
              <TabPanel value="bikes">
              <Button onClick={() => handleClick('addBike')}>ADD BIKE</Button>
                <Grid item xs={12} md={8} lg={9}>
                  {bikes.length ? (
                    bikes.map((bike) => (
                      <BikeCard key={bike.id} bike={bike} setBikes={setBikes} biker={biker} />
                    ))
                  ) : (
                    <h1>No Bikes</h1>
                  )}
                </Grid>
              </TabPanel>
              <TabPanel value="clothing">
              <Button onClick={() => handleClick('addClothing')}>ADD CLOTHING SET</Button>
                <Grid item xs={12} md={8} lg={9}>
                  {clothings.length ? (
                    clothings.map((clothing) => (
                      <ClothingCard key={clothing.id} clothing={clothing} clothings={clothings} setClothings={setClothings} biker={biker} />
                    ))
                  ) : (
                    <h1>No Clothing Set</h1>
                  )}
                </Grid>
              </TabPanel>
            </TabContext>
          </Container>
        </Box>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}

export default function Gear({ biker }) {
  return <DashboardContent biker={biker}/>;
}
