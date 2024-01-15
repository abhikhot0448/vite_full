import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import AppBar from '@mui/material/AppBar';
import { useTheme } from '@mui/material/styles';
import {
  useMediaQuery,
  Box,
  Button,
  Chip,
  Container,
  Drawer,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography
} from '@mui/material';

// project import
import Logo from 'components/logo';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

import { APP_DEFAULT_PATH } from 'config';
import { handlerComponentDrawer, useGetMenuMaster } from 'api/menu';

// assets
import { MenuOutlined, LineOutlined } from '@ant-design/icons';

// types
import { ThemeMode } from 'types/config';

// ==============================|| COMPONENTS - APP BAR ||============================== //

const Header = () => {
  const theme = useTheme();
  const { menuMaster } = useGetMenuMaster();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  const [drawerToggle, setDrawerToggle] = useState<boolean>(false);

  /** Method called on multiple components with different event types */
  const drawerToggler = (open: boolean) => (event: any) => {
    if (event.type! === 'keydown' && (event.key! === 'Tab' || event.key! === 'Shift')) {
      return;
    }
    setDrawerToggle(open);
  };

  return (
    <AppBar
      sx={{
        bgcolor: theme.palette.mode === ThemeMode.DARK ? 'grey.50]' : 'grey.800',
        color: theme.palette.text.primary,
        boxShadow: 'none'
      }}
    >
      <Container disableGutters={matchDownMd}>
        <Toolbar sx={{ px: { xs: 1.5, md: 0, lg: 0 }, py: 2 }}>
          <Stack direction="row" sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }} alignItems="center">
            <Typography component="div" sx={{ textAlign: 'left', display: 'inline-block' }}>
              <Logo reverse to="/" />
            </Typography>
            <Chip
              label={import.meta.env.VITE_APP_VERSION}
              variant="outlined"
              size="small"
              color="secondary"
              sx={{ mt: 0.5, ml: 1, fontSize: '0.725rem', height: 20, '& .MuiChip-label': { px: 0.5 } }}
            />
          </Stack>
          <Stack
            direction="row"
            sx={{
              '& .header-link': { px: 1, '&:hover': { color: theme.palette.primary.main } },
              display: { xs: 'none', md: 'block' }
            }}
            spacing={2}
          >
            <Link className="header-link" color="white" component={RouterLink} to="/login" target="_blank" underline="none">
              Dashboard
            </Link>
            <Link className="header-link" color="primary" component={RouterLink} to="/components-overview/buttons" underline="none">
              Components
            </Link>
            <Link className="header-link" color="white" href="https://codedthemes.gitbook.io/mantis/" target="_blank" underline="none">
              Documentation
            </Link>
            <Box sx={{ display: 'inline-block' }}>
              <AnimateButton>
                <Button
                  component={Link}
                  href="https://mui.com/store/items/mantis-react-admin-dashboard-template/"
                  disableElevation
                  color="primary"
                  variant="contained"
                >
                  Purchase Now
                </Button>
              </AnimateButton>
            </Box>
          </Stack>
          <Box
            sx={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              display: { xs: 'flex', md: 'none' }
            }}
          >
            <Typography component="div" sx={{ textAlign: 'left', display: 'inline-block' }}>
              <Logo reverse to="/" />
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Button
                variant="outlined"
                size="small"
                color="warning"
                component={RouterLink}
                to={APP_DEFAULT_PATH}
                sx={{ mt: 0.5, height: 28 }}
              >
                Dashboard
              </Button>

              <IconButton
                color="secondary"
                onClick={() => handlerComponentDrawer(!menuMaster.isComponentDrawerOpened)}
                sx={{
                  '&:hover': { bgcolor: theme.palette.mode === ThemeMode.DARK ? 'secondary.lighter' : 'secondary.dark' }
                }}
              >
                <MenuOutlined style={{ color: theme.palette.mode === ThemeMode.DARK ? 'inherit' : theme.palette.grey[100] }} />
              </IconButton>
            </Stack>
            <Drawer
              anchor="top"
              open={drawerToggle}
              onClose={drawerToggler(false)}
              sx={{ '& .MuiDrawer-paper': { backgroundImage: 'none' } }}
            >
              <Box
                sx={{
                  width: 'auto',
                  '& .MuiListItemIcon-root': {
                    fontSize: '1rem',
                    minWidth: 28
                  }
                }}
                role="presentation"
                onClick={drawerToggler(false)}
                onKeyDown={drawerToggler(false)}
              >
                <List>
                  <Link style={{ textDecoration: 'none' }} href="/login" target="_blank">
                    <ListItemButton component="span">
                      <ListItemIcon>
                        <LineOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Dashboard" primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }} />
                    </ListItemButton>
                  </Link>
                  <Link style={{ textDecoration: 'none' }} href="/components-overview/buttons" target="_blank">
                    <ListItemButton component="span">
                      <ListItemIcon>
                        <LineOutlined />
                      </ListItemIcon>
                      <ListItemText primary="All Components" primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }} />
                    </ListItemButton>
                  </Link>
                  <Link
                    style={{ textDecoration: 'none' }}
                    href="https://github.com/codedthemes/mantis-free-react-admin-template"
                    target="_blank"
                  >
                    <ListItemButton component="span">
                      <ListItemIcon>
                        <LineOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Free Version" primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }} />
                    </ListItemButton>
                  </Link>
                  <Link style={{ textDecoration: 'none' }} href="https://codedthemes.gitbook.io/mantis/" target="_blank">
                    <ListItemButton component="span">
                      <ListItemIcon>
                        <LineOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Documentation" primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }} />
                    </ListItemButton>
                  </Link>
                  <Link style={{ textDecoration: 'none' }} href="https://codedthemes.support-hub.io/" target="_blank">
                    <ListItemButton component="span">
                      <ListItemIcon>
                        <LineOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Support" primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }} />
                    </ListItemButton>
                  </Link>
                  <Link
                    style={{ textDecoration: 'none' }}
                    href="https://mui.com/store/items/mantis-react-admin-dashboard-template/"
                    target="_blank"
                  >
                    <ListItemButton component="span">
                      <ListItemIcon>
                        <LineOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Purchase Now" primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }} />
                      <Chip color="primary" label="v1.0" size="small" />
                    </ListItemButton>
                  </Link>
                </List>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
