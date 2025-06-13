import React, { useState, useEffect, useCallback, memo } from 'react';
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
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Grid,
  Card,
  CardContent,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Stack,
  Autocomplete,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import InfoIcon from '@mui/icons-material/Info';
import MovieIcon from '@mui/icons-material/Movie';
import PersonIcon from '@mui/icons-material/Person';
import StoreIcon from '@mui/icons-material/Store';
import PaymentIcon from '@mui/icons-material/Payment';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function TabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`rental-tabpanel-${index}`}
      aria-labelledby={`rental-tab-${index}`}
      style={{ padding: '20px' }}
    >
      {value === index && children}
    </div>
  );
}

function RentalDetails({ rental }) {
  if (!rental) return null;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Rental #{rental.rental_id}
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccessTimeIcon /> Rental Information
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Rental Date</Typography>
                  <Typography variant="body1">{new Date(rental.rental_date).toLocaleString()}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Return Date</Typography>
                  <Typography variant="body1">{new Date(rental.return_date).toLocaleString()}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Duration</Typography>
                  <Typography variant="body1">{rental.duration} days</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Last Update</Typography>
                  <Typography variant="body1">{new Date(rental.last_update).toLocaleString()}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

function FilmDetails({ film }) {
  if (!film) return null;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {film.title}
      </Typography>
      <Typography variant="body1" paragraph>
        {film.description}
      </Typography>
      
      <Card variant="outlined">
        <CardContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Release Year</Typography>
              <Typography variant="body1">{film.release_year}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Rating</Typography>
              <Typography variant="body1">{film.rating}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Length</Typography>
              <Typography variant="body1">{film.length} minutes</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Rental Rate</Typography>
              <Typography variant="body1">${film.rental_rate}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Rental Duration</Typography>
              <Typography variant="body1">{film.rental_duration} days</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Replacement Cost</Typography>
              <Typography variant="body1">${film.replacement_cost}</Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">Special Features</Typography>
            <Box sx={{ mt: 1 }}>
              {film.special_features?.split(',').map((feature, index) => (
                <Chip 
                  key={index} 
                  label={feature.trim()} 
                  size="small" 
                  sx={{ mr: 1, mb: 1 }} 
                />
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

function CustomerDetails({ customer }) {
  if (!customer) return null;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {customer.first_name} {customer.last_name}
      </Typography>
      
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon fontSize="small" /> Email
              </Typography>
              <Typography variant="body1">{customer.email}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Active</Typography>
              <Typography variant="body1">{customer.active ? 'Yes' : 'No'}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Create Date</Typography>
              <Typography variant="body1">{new Date(customer.create_date).toLocaleString()}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Last Update</Typography>
              <Typography variant="body1">{new Date(customer.last_update).toLocaleString()}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOnIcon /> Address
          </Typography>
          <Typography variant="body1">
            {customer.address.address}
            {customer.address.address2 && `, ${customer.address.address2}`}
          </Typography>
          <Typography variant="body1">
            {customer.address.district}, {customer.address.city.city}, {customer.address.city.country.country}
          </Typography>
          <Typography variant="body1">
            {customer.address.postal_code}
          </Typography>
          <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
            <PhoneIcon fontSize="small" /> {customer.address.phone}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

function StoreDetails({ store }) {
  if (!store) return null;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Store #{store.store_id}
      </Typography>
      
      <Card variant="outlined">
        <CardContent>
          <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOnIcon /> Address
          </Typography>
          <Typography variant="body1">
            {store.address.address}
            {store.address.address2 && `, ${store.address.address2}`}
          </Typography>
          <Typography variant="body1">
            {store.address.district}, {store.address.city.city}, {store.address.city.country.country}
          </Typography>
          <Typography variant="body1">
            {store.address.postal_code}
          </Typography>
          <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
            <PhoneIcon fontSize="small" /> {store.address.phone || 'N/A'}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

function PaymentDetails({ payments }) {
  if (!payments || payments.length === 0) return null;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Payment History
      </Typography>
      
      <Card variant="outlined">
        <CardContent>
          <List>
            {payments.map((payment) => (
              <React.Fragment key={payment.payment_id}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AttachMoneyIcon color="primary" />
                        Payment #{payment.payment_id}
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography component="span" variant="body2" sx={{ display: 'block' }}>
                          Amount: ${payment.amount}
                        </Typography>
                        <Typography component="span" variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <AccessTimeIcon fontSize="small" />
                          {new Date(payment.payment_date).toLocaleString()}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}

function Row({ rental, onRentalClick }) {
  const getStoreLocation = (rental) => {
    try {
      const city = rental?.inventory?.store?.address?.city?.city;
      const country = rental?.inventory?.store?.address?.city?.country?.country;
      return city && country ? `${city}, ${country}` : 'N/A';
    } catch (error) {
      return 'N/A';
    }
  };

  const getCustomerName = (rental) => {
    try {
      const firstName = rental?.customer?.first_name;
      const lastName = rental?.customer?.last_name;
      return firstName && lastName ? `${firstName} ${lastName}` : 'N/A';
    } catch (error) {
      return 'N/A';
    }
  };

  const getFilmTitle = (rental) => {
    try {
      return rental?.inventory?.film?.title || 'N/A';
    } catch (error) {
      return 'N/A';
    }
  };

  const getPaymentAmount = (rental) => {
    try {
      return rental?.payment?.[0]?.amount ? `$${rental.payment[0].amount}` : 'N/A';
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
      onClick={() => onRentalClick(rental)}
    >
      <TableCell>{rental?.rental_id || 'N/A'}</TableCell>
      <TableCell>{getFilmTitle(rental)}</TableCell>
      <TableCell>{getCustomerName(rental)}</TableCell>
      <TableCell>{rental?.rental_date ? new Date(rental.rental_date).toLocaleDateString() : 'N/A'}</TableCell>
      <TableCell>{rental?.return_date ? new Date(rental.return_date).toLocaleDateString() : 'N/A'}</TableCell>
      <TableCell>{rental?.duration ? `${rental.duration} days` : 'N/A'}</TableCell>
      <TableCell>{getPaymentAmount(rental)}</TableCell>
      <TableCell>{rental?.payment?.[0]?.payment_date ? new Date(rental.payment[0].payment_date).toLocaleDateString() : 'N/A'}</TableCell>

    </TableRow>
  );
}

export default function Rental() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRental, setSelectedRental] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    film_id: '',
    customer_id: '',
    store_id: '',
    start_date: '',
    end_date: ''
  });
  const [filterOptions, setFilterOptions] = useState({
    films: [],
    customers: [],
    stores: []
  });

  useEffect(() => {
    fetchRentals();
    fetchFilterOptions();
  }, [page, rowsPerPage]);

  const fetchFilterOptions = async () => {
    try {
      const response = await fetch('http://localhost:8000/rentals/filter-options');
      const data = await response.json();
      setFilterOptions({
        films: data.films || [],
        customers: data.customers || [],
        stores: data.stores || []
      });
    } catch (error) {
      console.error('Error fetching filter options:', error);
    }
  };

  const fetchRentals = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page,
        limit: rowsPerPage
      });

      // Add filters to query params if they exist
      if (filters.film_id) queryParams.append('film_id', filters.film_id);
      if (filters.customer_id) queryParams.append('customer_id', filters.customer_id);
      if (filters.store_id) queryParams.append('store_id', filters.store_id);
      if (filters.start_date) queryParams.append('start_date', filters.start_date);
      if (filters.end_date) queryParams.append('end_date', filters.end_date);
      
      const response = await fetch(`http://localhost:8000/rentals?${queryParams}`);
      const data = await response.json();
      setRentals(data.data || []);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error('Error fetching rentals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      film_id: '',
      customer_id: '',
      store_id: '',
      start_date: '',
      end_date: ''
    });
    setPage(1);
    fetchRentals();
    setFilterDrawerOpen(false);
  };

  const applyFilters = () => {
    setPage(1);
    fetchRentals();
    setFilterDrawerOpen(false);
  };

  const handleRentalClick = useCallback(async (rental) => {
    try {
      setDetailLoading(true);
      setDrawerOpen(true);
      const response = await fetch(`http://localhost:8000/rentals/${rental.rental_id}`);
      const data = await response.json();
      setSelectedRental(data);
      setTabValue(0);
    } catch (error) {
      console.error('Error fetching rental details:', error);
    } finally {
      setDetailLoading(false);
    }
  }, []);

  const handleClose = useCallback(() => {
    setDrawerOpen(false);
    setTimeout(() => {
      setSelectedRental(null);
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
    <div className="rental-container">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <h2>Rentals</h2>
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          onClick={() => setFilterDrawerOpen(true)}
        >
          Filters
        </Button>
      </Box>


      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rental ID</TableCell>
              <TableCell>Film</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Rental Date</TableCell>
              <TableCell>Return Date</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Amount Paid</TableCell>
              <TableCell>Payment Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rentals.map((rental) => (
              <Row 
                key={rental.rental_id} 
                rental={rental} 
                onRentalClick={handleRentalClick}
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
          <Typography variant="h6">Rental Details</Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {detailLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>
        ) : selectedRental && (
          <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab icon={<InfoIcon />} label="Rental Info" />
                <Tab icon={<MovieIcon />} label="Film" />
                <Tab icon={<PersonIcon />} label="Customer" />
                <Tab icon={<StoreIcon />} label="Store" />
                <Tab icon={<PaymentIcon />} label="Payment" />
              </Tabs>
            </Box>
            <TabPanel value={tabValue} index={0}>
              <RentalDetails rental={selectedRental} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <FilmDetails film={selectedRental.inventory.film} />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <CustomerDetails customer={selectedRental.customer} />
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
              <StoreDetails store={selectedRental.inventory.store} />
            </TabPanel>
            <TabPanel value={tabValue} index={4}>
              <PaymentDetails payments={selectedRental.payment} />
            </TabPanel>
          </>
        )}
      </Drawer>

      <Drawer
        anchor="right"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: '400px',
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
          <Typography variant="h6">Filters</Typography>
          <IconButton onClick={() => setFilterDrawerOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ p: 2 }}>
          <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel>Film</InputLabel>
                <Select
                  value={filters.film_id || ''}
                  label="Film"
                  onChange={(e) => handleFilterChange('film_id', e.target.value)}
                >
                  <MenuItem value="">All Films</MenuItem>
                  {filterOptions.films.map(film => (
                    <MenuItem key={film.film_id} value={film.film_id}>
                      {film.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel>Customer</InputLabel>
                <Select
                  value={filters.customer_id || ''}
                  label="Customer"
                  onChange={(e) => handleFilterChange('customer_id', e.target.value)}
                >
                  <MenuItem value="">All Customers</MenuItem>
                  {filterOptions.customers.map(customer => (
                    <MenuItem key={customer.customer_id} value={customer.customer_id}>
                      {customer.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel>Store</InputLabel>
                <Select
                  value={filters.store_id || ''}
                  label="Store"
                  onChange={(e) => handleFilterChange('store_id', e.target.value)}
                >
                  <MenuItem value="">All Stores</MenuItem>
                  {filterOptions.stores.map(store => (
                    <MenuItem key={store.store_id} value={store.store_id}>
                      {store.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Date Range</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <DatePicker
                          label="Start Date"
                          value={filters.start_date ? dayjs(filters.start_date) : null}
                          onChange={(newValue) => {
                            handleFilterChange('start_date', newValue ? newValue.format('YYYY-MM-DD') : '');
                          }}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              size: 'small'
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <DatePicker
                          label="End Date"
                          value={filters.end_date ? dayjs(filters.end_date) : null}
                          onChange={(newValue) => {
                            handleFilterChange('end_date', newValue ? newValue.format('YYYY-MM-DD') : '');
                          }}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              size: 'small'
                            }
                          }}
                        />
                      </Grid>
                    </Grid>
                  </LocalizationProvider>
                </AccordionDetails>
              </Accordion>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  onClick={clearFilters}
                >
                  Reset
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={applyFilters}
                >
                  Apply
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </div>
  );
} 