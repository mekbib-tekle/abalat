import { Avatar, Grid, Typography, List, ListItem, ListItemText, ListItemIcon, Container } from '@mui/material';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import DateRangeIcon from '@mui/icons-material/DateRange';
import useFetch from 'use-http'
import { Member } from '../types/Member';

const Home = () => {
    const { loading, error, data: user } = useFetch('http://localhost:8000/auth/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      }, [])

    if (loading) return (<Container>Loading user...</Container>);

    if (error) return (<Container>Error: {error.message}.</Container>);

    if (!user && !loading) return (<Container>No user found.</Container>);

    const {
        firstName,
        middleName,
        lastName,
        email,
        username,
        phoneNumber,
        image_url,
        created_at,
    }: Member = user;
      
    const fullName = `${firstName} ${middleName ? middleName + ' ' : ''} ${lastName}`;
    const formattedDate = new Date(created_at).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={4} sm={2}>
                    <Avatar sx={{ width: 100, height: 100 }}>{firstName && firstName.charAt(0)}</Avatar> {/* Placeholder avatar */}
                    {image_url && <Avatar alt={fullName} src={image_url} sx={{ width: 100, height: 100, mt: 2 }} />} {/* Use image_url if available */}
                </Grid>
                <Grid item xs={8} sm={10}>
                    <Typography variant="h6">{fullName}</Typography>
                    <Typography variant="body2" color="text.secondary">{username}</Typography>
                    <List dense>
                        <ListItem>
                            <ListItemIcon>
                                <AlternateEmailIcon />
                            </ListItemIcon>
                            <ListItemText primary="Email" secondary={email} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <ContactPhoneIcon />
                            </ListItemIcon>
                            <ListItemText primary="Phone Number" secondary={phoneNumber} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <DateRangeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Member Since" secondary={formattedDate} />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </Container>
    );
  };
  
  export default Home;