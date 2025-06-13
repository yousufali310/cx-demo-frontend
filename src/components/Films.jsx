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
  Chip,
  Box,
  Typography,
  Collapse,
  IconButton,
  Drawer,
  Tabs,
  Tab,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MovieIcon from '@mui/icons-material/Movie';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import GroupIcon from '@mui/icons-material/Group';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function TabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`film-tabpanel-${index}`}
      aria-labelledby={`film-tab-${index}`}
      style={{ padding: '20px' }}
    >
      {value === index && children}
    </div>
  );
}

function FilmDetails({ film }) {
  if (!film) return null;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {film.title}
      </Typography>
      <Typography variant="body1" paragraph>
        {film.description}
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mt: 2 }}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">Release Year</Typography>
          <Typography variant="body1">{film.release_year}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">Rating</Typography>
          <Typography variant="body1">{film.rating}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">Language</Typography>
          <Typography variant="body1">{film.language_film_language_idTolanguage?.name}</Typography>
        </Box>
        
        
        <Box>
          <Typography variant="subtitle2" color="text.secondary">Length</Typography>
          <Typography variant="body1">{film.length} minutes</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">Rental Duration</Typography>
          <Typography variant="body1">{film.rental_duration} days</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">Rental Rate</Typography>
          <Typography variant="body1">${film.rental_rate}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">Replacement Cost</Typography>
          <Typography variant="body1">${film.replacement_cost}</Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2" color="text.secondary">Categories</Typography>
        <Box sx={{ mt: 1 }}>
          {film.film_category?.map(cat => (
            <Chip 
              key={cat.category_id} 
              label={cat.category.name} 
              sx={{ mr: 1, mb: 1 }} 
            />
          ))}
        </Box>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2" color="text.secondary">Special Features</Typography>
        <Box sx={{ mt: 1 }}>
          {film.special_features?.split(',').map((feature, index) => (
            <Chip 
              key={index} 
              label={feature.trim()} 
              variant="outlined"
              sx={{ mr: 1, mb: 1 }} 
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function ActorsList({ actors }) {
  if (!actors) return null;

  return (
    <List>
      {actors.map(({ actor }) => (
        <React.Fragment key={actor.actor_id}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary={`${actor.first_name} ${actor.last_name}`}
            
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
}

function Row({ film, onFilmClick }) {
  return (
    <TableRow 
      sx={{ 
        cursor: 'pointer',
        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
      }}
      onClick={() => onFilmClick(film)}
    >
      <TableCell>{film.film_id}</TableCell>
      <TableCell>{film.title}</TableCell>
      <TableCell>{film.description}</TableCell>
      <TableCell>{film.release_year}</TableCell>
      <TableCell>{film.rating}</TableCell>
      <TableCell>{film.rental_rate}</TableCell>
      <TableCell>{film.length} min</TableCell>
      <TableCell>{film.language_film_language_idTolanguage?.name}</TableCell>
    </TableRow>
  );
}

export default function Films() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterOptions, setFilterOptions] = useState({
    categories: [],
    languages: [],
    years: [],
    actors: []
  });
  const [filters, setFilters] = useState({
    category: '',
    language: '',
    release_year: '',
    actor: '',
    length: {
      gt: '',
      lt: '',
      eq: ''
    }
  });
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    fetchFilms();
  }, [page, rowsPerPage]);

  const fetchFilterOptions = async () => {
    try {
      const response = await fetch('http://localhost:8000/films/filter-options');
      const data = await response.json();
      setFilterOptions(data);
    } catch (error) {
      console.error('Error fetching filter options:', error);
    }
  };

  const fetchFilms = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: rowsPerPage.toString()
      });

      // Add filters to query params if they exist
      const filterParams = {};
      if (filters.category) filterParams.category = filters.category;
      if (filters.language) filterParams.language = filters.language;
      if (filters.release_year) filterParams.release_year = filters.release_year;
      if (filters.actor) filterParams.actor = filters.actor;
      if (filters.length.gt || filters.length.lt || filters.length.eq) {
        filterParams.length = {};
        if (filters.length.gt) filterParams.length.gt = filters.length.gt;
        if (filters.length.lt) filterParams.length.lt = filters.length.lt;
        if (filters.length.eq) filterParams.length.eq = filters.length.eq;
      }

      if (Object.keys(filterParams).length > 0) {
        queryParams.append('filter', JSON.stringify(filterParams));
      }
      console.log(filters);
            const response = await fetch(`http://localhost:8000/films?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setFilms(data.data || []);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error('Error fetching films:', error);
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

  const handleLengthFilterChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      length: {
        ...prev.length,
        [type]: value
      }
    }));
  };

  const clearFilters = async() => {
     setFilters({
      category: null,
      language: '',
      release_year: '',
      actor: '',
      length: { gt: '', lt: '', eq: '' }
    });
    
    setPage(1);
    fetchFilms();
    setFilterDrawerOpen(false);
  };

  const applyFilters = () => {
    setPage(1); // Reset to first page when applying filters
    fetchFilms();
    setFilterDrawerOpen(false);
  };

  const handleFilmClick = useCallback(async (film) => {
    try {
      setDetailLoading(true);
      setDrawerOpen(true);
      const response = await fetch(`http://localhost:8000/films/${film.film_id}`);
      const data = await response.json();
      setSelectedFilm(data);
      setTabValue(0);
    } catch (error) {
      console.error('Error fetching film details:', error);
    } finally {
      setDetailLoading(false);
    }
  }, []);

  const handleClose = useCallback(() => {
    setDrawerOpen(false);
    // Clear selected film after animation
    setTimeout(() => {
      setSelectedFilm(null);
    }, 300);
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
    setPage(1); // Reset to first page when changing rows per page
  };

  // Sorting logic
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (column) => {
    if (sortBy !== column) return null;
    return sortDirection === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />;
  };

  const sortedFilms = React.useMemo(() => {
    if (!sortBy) return films;
    const sorted = [...films];
    sorted.sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case 'title':
          aValue = a.title || '';
          bValue = b.title || '';
          return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        case 'release_year':
          aValue = a.release_year || 0;
          bValue = b.release_year || 0;
          return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        case 'language':
          aValue = a.language_film_language_idTolanguage?.name || '';
          bValue = b.language_film_language_idTolanguage?.name || '';
          return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        case 'length':
          aValue = a.length || 0;
          bValue = b.length || 0;
          return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        case 'rating':
          aValue = a.rating || '';
          bValue = b.rating || '';
          return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        default:
          return 0;
      }
    });
    return sorted;
  }, [films, sortBy, sortDirection]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="films-container">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <h2>Films</h2>
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
              <TableCell>Film ID</TableCell>
              <TableCell onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
                Title {getSortIcon('title')}
              </TableCell>
              <TableCell>Description</TableCell>
              <TableCell onClick={() => handleSort('release_year')} style={{ cursor: 'pointer' }}>
                Release Year {getSortIcon('release_year')}
              </TableCell>
              <TableCell onClick={() => handleSort('rating')} style={{ cursor: 'pointer' }}>
                Rating {getSortIcon('rating')}
              </TableCell>
              <TableCell>Rental Rate</TableCell>
              <TableCell onClick={() => handleSort('length')} style={{ cursor: 'pointer' }}>
                Length {getSortIcon('length')}
              </TableCell>
              <TableCell onClick={() => handleSort('language')} style={{ cursor: 'pointer' }}>
                Language {getSortIcon('language')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedFilms.map((film) => (
              <Row 
                key={film.film_id} 
                film={film} 
                onFilmClick={handleFilmClick}
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
          <Typography variant="h6">Film Details</Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {detailLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>
        ) : selectedFilm && (
          <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab icon={<InfoIcon />} label="Film Details" />
                <Tab icon={<GroupIcon />} label="Actors" />
              </Tabs>
            </Box>
            <TabPanel value={tabValue} index={0}>
              <FilmDetails film={selectedFilm} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <ActorsList actors={selectedFilm.film_actor} />
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
                <InputLabel>Category</InputLabel>
                <Select
                  value={filters.category || ''}
                  label="Category"
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {filterOptions.categories.map(category => (
                    <MenuItem key={category.category_id} value={category.category_id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel>Language</InputLabel>
                <Select
                  value={filters.language || ''}
                  label="Language"
                  onChange={(e) => handleFilterChange('language', e.target.value)}
                >
                  <MenuItem value="">All Languages</MenuItem>
                  {filterOptions.languages.map(language => (
                    <MenuItem key={language.language_id} value={language.language_id}>
                      {language.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel>Release Year</InputLabel>
                <Select
                  value={filters.release_year || ''}
                  label="Release Year"
                  onChange={(e) => handleFilterChange('release_year', e.target.value)}
                >
                  <MenuItem value="">All Years</MenuItem>
                  {filterOptions.years.map(year => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel>Actor</InputLabel>
                <Select
                  value={filters.actor || ''}
                  label="Actor"
                  onChange={(e) => handleFilterChange('actor', e.target.value)}
                >
                  <MenuItem value="">All Actors</MenuItem>
                  {filterOptions.actors.map(actor => (
                    <MenuItem key={actor.actor_id} value={actor.actor_id}>
                      {actor.full_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Length Filter</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Greater Than"
                        type="number"
                        value={filters.length.gt}
                        onChange={(e) => handleLengthFilterChange('gt', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Less Than"
                        type="number"
                        value={filters.length.lt}
                        onChange={(e) => handleLengthFilterChange('lt', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Equal To"
                        type="number"
                        value={filters.length.eq}
                        onChange={(e) => handleLengthFilterChange('eq', e.target.value)}
                      />
                    </Grid>
                  </Grid>
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