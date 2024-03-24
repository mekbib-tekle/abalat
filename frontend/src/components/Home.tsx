import { useState, useEffect } from 'react';
import { Avatar, Grid, Typography, List, ListItem, ListItemText, ListItemIcon,  } from '@mui/material';
import Container from '@mui/material/Container';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import DateRangeIcon from '@mui/icons-material/DateRange';

interface User {
    id: number;
    username: string;
    email: string;
    image_url: string;
    firstName: string;
    lastName: string;
    middleName: string;
    phoneNumber: string;
    gender: string;
    created_at: string;
}
  
const Home = () => {
    const [user, setuser] = useState<User>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchuser = async () => {
          setIsLoading(true);
          setError(null);
    
          try {
            const response = await fetch('http://localhost:8000/auth/profile', {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
              });
            const data = await response.json();
            setuser(data);
          } catch (error) {
            console.error('Error fetching users:', error);
            // setError(error);
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchuser();
      }, []);
    
    if (!user && !isLoading) return (<p>No user found.</p>);

    if (isLoading) return (<p>Loading user...</p>);

    if (!user) return (<p>No user found.</p>);

    const {
        firstName,
        middleName,
        lastName,
        email,
        image_url,
        username,
        phoneNumber,
        gender,
        created_at,
    }: User = user;
      
    const fullName = `${firstName} ${middleName ? middleName + ' ' : ''} ${lastName}`;
    const formattedDate = new Date(created_at).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <Container maxWidth="lg">
            {isLoading && <p>Loading user...</p>}
            {error && <p>Error: {error.message}</p>}
            {user && (
                <Grid container spacing={2}>
                    <Grid item xs={4} sm={2}>
                        <Avatar sx={{ width: 100, height: 100 }}>{firstName && firstName.charAt(0)}</Avatar> {/* Placeholder avatar */}
                        {user.image_url && <Avatar alt={fullName} src={user.image_url} sx={{ width: 100, height: 100, mt: 2 }} />} {/* Use image_url if available */}
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
            )}
        </Container>
    );
  };
  
  export default Home;