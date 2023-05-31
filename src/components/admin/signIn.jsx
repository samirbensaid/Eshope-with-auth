import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import useAuth from "../zustand/useAuth";

const theme = createTheme();

export default function SignIn() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const onSubmit = async (data) => {
    let login = {
      email: data.email,
      password: data.password,
    };
    try {
      const response = await axios.post(
        "https://reals-api-staging.ewm.dev/api/login",
        login
      );
      console.log(response);
      const userData = {
        name: response.data.user.firstname,
        email: response.data.user.email,
        phone: response.data.user.phone,
        token: response.data.token,
        roles: response.data.user.roles,
      };

      setUser(userData);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="secondary">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              color="secondary"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              focused
              {...register("email")}
            />
            <TextField
              color="secondary"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              focused
              {...register("password")}
            />
            <FormControlLabel sx={{ color:"#9C27B0"}}
              control={<Checkbox value="remember" color="primary" sx={{ color:"#9C27B0"}}/>}
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
              <Grid item xs sx={{ color:"#9C27B0"}}>
                <Link to="#" variant="body2" color="secondary">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item sx={{ color:"#9C27B0"}}>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
