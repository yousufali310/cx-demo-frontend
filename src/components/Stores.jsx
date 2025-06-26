import React, { useState, useEffect, useCallback } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  CircularProgress,
  Box,
  Typography,
  Collapse,
  IconButton,
  Drawer,
  Tabs,
  Tab,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Grid,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import GroupIcon from '@mui/icons-material/Group';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const apiUrl = import.meta.env.VITE_API_URL;

function TabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`store-tabpanel-${index}`}
      aria-labelledby={`store-tab-${index}`}
      style={{ padding: '20px' }}
    >
      {value === index && children}
    </div>
  );
}

function StoreDetails({ store }) {
  if (!store) return null;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Store #{store.store_id}
      </Typography>
      
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonIcon /> Manager Information
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Name</Typography>
              <Typography variant="body1">{store.staff.first_name} {store.staff.last_name}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Email</Typography>
              <Typography variant="body1">{store.staff.email}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Username</Typography>
              <Typography variant="body1">{store.staff.username}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Last Update</Typography>
              <Typography variant="body1">{new Date(store.last_update).toLocaleString()}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOnIcon /> Store Address
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Address</Typography>
              <Typography variant="body1">
                {store.address.address}
                {store.address.address2 && `, ${store.address.address2}`}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">District</Typography>
              <Typography variant="body1">{store.address.district}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">City</Typography>
              <Typography variant="body1">{store.address.city.city}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Country</Typography>
              <Typography variant="body1">{store.address.city.country.country}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Postal Code</Typography>
              <Typography variant="body1">{store.address.postal_code || 'N/A'}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Phone</Typography>
              <Typography variant="body1">{store.address.phone || 'N/A'}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOnIcon /> Manager's Address
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Address</Typography>
              <Typography variant="body1">{store.staff.address.address}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">District</Typography>
              <Typography variant="body1">{store.staff.address.district}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">City</Typography>
              <Typography variant="body1">{store.staff.address.city.city}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Country</Typography>
              <Typography variant="body1">{store.staff.address.city.country.country}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Phone</Typography>
              <Typography variant="body1">{store.staff.address.phone || 'N/A'}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

function StaffList({ staff }) {
  if (!staff || staff.length === 0) return null;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Staff Members
      </Typography>
      
      <List>
        {staff.map((member) => (
          <React.Fragment key={member.staff_id}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${member.first_name} ${member.last_name}`}
                secondary={
                  <>
                    <Typography component="span" variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EmailIcon fontSize="small" /> {member.email}
                    </Typography>
                    <Typography component="span" variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccessTimeIcon fontSize="small" /> Last Update: {new Date(member.last_update).toLocaleString()}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}

function StoreRentals({ rentals }) {
  if (!rentals || rentals.length === 0) return null;

  const displayedRentals = rentals.slice(0, 10);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Recent Rentals ({rentals.length} total)
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
        Showing most recent 10 rentals
      </Typography>
      
      <List>
        {displayedRentals.map((rental) => (
          <React.Fragment key={rental.rental_id}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LocalMoviesIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`Rental #${rental.rental_id}`}
                secondary={
                  <>
                    <Typography component="span" variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PersonIcon fontSize="small" /> Customer: {rental.customer.first_name} {rental.customer.last_name}
                    </Typography>
                    <Typography component="span" variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EmailIcon fontSize="small" /> {rental.customer.email}
                    </Typography>
                    <Typography component="span" variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccessTimeIcon fontSize="small" /> Rental Date: {new Date(rental.rental_date).toLocaleString()}
                    </Typography>
                    <Typography component="span" variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PersonIcon fontSize="small" /> Staff: {rental.staff.first_name} {rental.staff.last_name}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}

function Row({ store, onStoreClick }) {
  const getCity = (store) => {
    try {
      return store?.address?.city?.city || 'N/A';
    } catch (error) {
      return 'N/A';
    }
  };

  const getCountry = (store) => {
    try {
      return store?.address?.city?.country?.country || 'N/A';
    } catch (error) {
      return 'N/A';
    }
  };

  return (
    <TableRow 
      sx={{ 
        cursor: 'pointer',
        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
      }}
      onClick={() => onStoreClick(store)}
    >
      <TableCell>{store.store_id}</TableCell>
      <TableCell>{store.address.address}</TableCell>
      <TableCell>{getCity(store)}</TableCell>
      <TableCell>{getCountry(store)}</TableCell>
      <TableCell>{store.staff.first_name} {store.staff.last_name}</TableCell>
      <TableCell>{new Date(store.last_update).toLocaleString()}</TableCell>
    </TableRow>
  );
}

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStore, setSelectedStore] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchStores();
  }, [page, rowsPerPage]);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/stores?page=${page}&limit=${rowsPerPage}`);
      const data = await response.json();
      setStores(data.data || []);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error('Error fetching stores:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStoreClick = useCallback(async (store) => {
    try {
      setDetailLoading(true);
      setDrawerOpen(true);
      const response = await fetch(`${apiUrl}/stores/${store.store_id}`);
      const data = await response.json();
      setSelectedStore(data);
      setTabValue(0);
    } catch (error) {
      console.error('Error fetching store details:', error);
    } finally {
      setDetailLoading(false);
    }
  }, []);

  const handleClose = useCallback(() => {
    setDrawerOpen(false);
    setTimeout(() => {
      setSelectedStore(null);
    }, 300);
  }, []);

  const handleTabChange = useCallback((event, newValue) => {
    setTabValue(newValue);
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
    setPage(1); // Reset to first page when changing rows per page
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="stores-container">
      <h2>Stores</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Store ID</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Manager</TableCell>
              <TableCell>Last Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stores.map((store) => (
              <Row 
                key={store.store_id} 
                store={store} 
                onStoreClick={handleStoreClick}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        gap: 2,
        mt: 2, 
        mb: 2,
        px: 2
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2
        }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Rows per page</InputLabel>
            <Select
              value={rowsPerPage}
              label="Rows per page"
              onChange={handleRowsPerPageChange}
              size="small"
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>

          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={handlePageChange} 
            color="primary"
            showFirstButton 
            showLastButton
          />
        </Box>
      </Box>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: '40%',
            minWidth: '400px',
            transition: 'transform 0.3s ease-in-out',
          },
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          p: 2,
          borderBottom: 1,
          borderColor: 'divider'
        }}>
          <Typography variant="h6">Store Details</Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {detailLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>
        ) : selectedStore && (
          <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab icon={<InfoIcon />} label="Store Info" />
                <Tab icon={<LocalMoviesIcon />} label="Rentals" />
              </Tabs>
            </Box>
            <TabPanel value={tabValue} index={0}>
              <StoreDetails store={selectedStore} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <StoreRentals rentals={selectedStore.rentals} />
            </TabPanel>
          </>
        )}
      </Drawer>
    </div>
  );
} 