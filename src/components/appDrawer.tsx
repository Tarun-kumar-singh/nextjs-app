import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import {useRouter} from 'next/router';

import { GlobalConstants, Tabs } from "../constants/GlobalConstants";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
  children: React.ReactNode
}

const useStyles = makeStyles({

});

const routes = [
  {label: 'About', path: '/about'},
  {label: 'Contact Us', path: '/contact-us'}
]

export default function AppDrawer(props: Props) {

  const { window, children } = props;
  const classes = useStyles();
  const router = useRouter()

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [desktopOpen, setDesktopOpen] = React.useState(true);
  const [darkModeStatus, setDarkModeStatus] = React.useState(false);
  
  useEffect(() => {
    console.log('app drawer render');
    
  }, [])

  const darkModeHandle = (e: any) =>{
    setDarkModeStatus(!darkModeStatus)
    handleDarkModeChange(darkModeStatus)
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    setDesktopOpen(!desktopOpen)
  }

  const drawer = (
    <>
      <Toolbar />
      <List>
        {Tabs.map((tab: { label: string, route: string }) => (
            <Link  key={tab.route} href={tab.route} passHref>
              <ListItem style={{ display: 'flex', justifyContent:'center', borderRadius: '20px'}} button selected = { tab.route === router.pathname } key={tab.label}>
                    {tab.label}
              </ListItem>
            </Link>
        ))}
      </List>
      <Divider />
    </>
  );

  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
  }>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }));
  
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));
  
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100%)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        style={{zIndex:1301}}
      >
      <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {GlobalConstants.APP_Name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="temporary"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderStyle: 'hidden' },
             
          }}
          open={desktopOpen}
        >
          {drawer}
        </Drawer>
      </Box>
      <Main open={desktopOpen}>
        <DrawerHeader />
          {children}
      </Main>    
    </Box>
  );
}