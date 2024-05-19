import {
  Avatar,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Button,
  FormHelperText,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Copyright from './includes/Copyright';
import useFetch from 'use-http';
import { useCallback, useMemo } from 'react';
import { Auth } from './utils/types';

type Props = {
  setAuthToken: React.Dispatch<React.SetStateAction<Auth | undefined>>
}

export default function Login({ setAuthToken } : Props) {

  // const { post, response, error } = useFetch(`${process.env.REACT_APP_API_URL}/auth/login`)
  const { post, response, error } = useFetch(`http://38.242.139.85/auth/login`)
  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const token = await post({
      username: data.get('username'),
      password: data.get('password'),
    });
    if (token) {
      setAuthToken(token);
      localStorage.setItem('authToken', token.access_token);
    }
  }, [post, setAuthToken]);

  const invalidLogin = useMemo(() => {
    return (error || (response && (response.status === 500 || response.status === 401)));
  }, [response, error]);

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {invalidLogin && (
          <FormHelperText error={true}>Login Error! Please  try again</FormHelperText>
          )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}