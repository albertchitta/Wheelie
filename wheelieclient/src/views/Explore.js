import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
import { getTrailsByBikerId } from '../api/data/TrailData';
import ExploreTrailCard from '../components/ExploreTrailCard';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Footer from '../components/Footer';
import BikerCard from '../components/BikerCard';
import { getBikers } from '../api/data/BikerData';

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

const initialState = {
  trail: ''
}

function DashboardContent({ biker }) {
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState('trails');
  const [trails, setTrails] = useState([]);
  const [bikers, setBikers] = useState([]);
  const [input, setInput] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (method) => {
    if (method === 'create') {
      navigate('/create-trail');
    }
  }

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    let isMounted = true;
    
    if (isMounted && Object.keys(biker).length !== 0) {
      getTrailsByBikerId(0).then(setTrails);
      getBikers().then(setBikers);
    }

    return () => {
      isMounted = false;
    }
  }, [biker]);

  const handleSearch = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const filter = input.trail.toLowerCase();

    if (filter === '') {
      getTrailsByBikerId(0).then(setTrails);
    }

    const filteredTrails = trails.filter((trail) => {
      return (trail.name.toLowerCase().includes(filter))
    });

    setTrails(filteredTrails);
  };

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
              Explore
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
                  <Tab label="Trails" value="trails" />
                  <Tab label="Bikers" value="bikers" />
                </TabList>
              </Box>
              <TabPanel value="trails">
                <Button onClick={() => handleClick('create')}>CREATE TRAIL</Button>
                <Paper
                  component="form"
                  sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', maxWidth: 400 }}
                  onSubmit={handleSubmit}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Bike Trails"
                    inputProps={{ 'aria-label': 'search bike trails' }}
                    name="trail"
                    id="trail"
                    value={input.trail || ''}
                    onChange={handleSearch}
                  />
                  <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </Paper>
                <Grid item xs={12} md={8} lg={9}>
                  {trails.length ? (
                    trails.map((trail) => (
                        trail.bikerId === 0 ? <ExploreTrailCard key={trail.id} trail={trail} setTrails={setTrails} biker={biker} /> : ''
                    ))
                  ) : (
                    <h1>No Trails</h1>
                  )}
                </Grid>
              </TabPanel>
              <TabPanel value="bikers">
                <Grid item xs={12} md={8} lg={9}>
                  {bikers.length ? (
                    bikers.map((biker) => (
                      <BikerCard key={biker.id} biker={biker} />
                    ))
                  ) : (
                    <h1>No Bikers</h1>
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

export default function Explore({ biker }) {
  return <DashboardContent biker={biker} />;
}

Explore.propTypes = {
  input: PropTypes.shape({
    trail: PropTypes.string
  })
}

Explore.defaultProps = {
  input: {
    trail: ''
  }
}
