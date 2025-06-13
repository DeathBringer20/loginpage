import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
  InputAdornment,
  CircularProgress,
  Snackbar,
  Alert,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error" as "error" | "success",
  });

  const navigate = useNavigate();

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!username || !password) {
      setSnackbar({ open: true, message: "Zadejte uživatelské jméno a heslo", severity: "error" });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("#", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (stayLoggedIn) {
          localStorage.setItem("token", data.token);
        }

        setSnackbar({ open: true, message: "Přihlášení úspěšné", severity: "success" });
        setTimeout(() => navigate("#"), 1000);
      } else {
        setSnackbar({
          open: true,
          message: data.message || "Neplatné přihlašovací údaje",
          severity: "error",
        });
      }
    } catch {
      setSnackbar({ open: true, message: "Chyba spojení s backendem", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: (theme) =>
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, #000, #1f1f1f)"
            : theme.palette.background.default,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <CssBaseline />
      <Container
        maxWidth="xs"
        sx={{
          bgcolor: "background.paper",
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          boxShadow: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            fontStyle: "italic",
            textTransform: "uppercase",
            letterSpacing: 1,
            textAlign: "center",
            position: "relative",
            mb: 3,
            "&::after": {
              content: '""',
              display: "block",
              width: "150px",
              maxWidth: "80%",
              height: "2px",
              bgcolor: "currentColor",
              borderRadius: 1,
              mt: 1,
              mx: "auto",
            },
          }}
        >
          Přihlášení
        </Typography>

        <Box component="form" onSubmit={handleLogin} sx={{ width: "100%" }}>
          <TextField
            label="Uživatelské jméno"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
            autoComplete="username"
            disabled={loading}
            InputLabelProps={{ sx: { fontStyle: "italic" } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Mail size={20} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Heslo"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
            autoComplete="current-password"
            disabled={loading}
            sx={{ mb: 1 }}
            InputLabelProps={{ sx: { fontStyle: "italic" } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock size={20} />
                </InputAdornment>
              ),
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={stayLoggedIn}
                onChange={(e) => setStayLoggedIn(e.target.checked)}
                color="primary"
              />
            }
            label={<Typography fontSize={14}>Zůstat přihlášen</Typography>}
            sx={{ mb: 2 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              py: 1.2,
              borderRadius: 2,
              fontWeight: 500,
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.dark" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Přihlásit"}
          </Button>
        </Box>

        <Typography
          variant="caption"
          align="center"
          fontStyle="italic"
          color="text.secondary"
          mt={3}
        >
          © 2025 Kavalierglass, a.s.
        </Typography>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default LoginPage;
