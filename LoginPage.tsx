import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("#", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/main");
      } else {
        setError(data.message || "Neplatné přihlašovací údaje");
      }
    } catch {
      setError("Chyba spojení s backendem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="login-container">
      <CssBaseline />
      <Container className="login-box" maxWidth="xs">
        <Typography variant="h4" className="login-title" gutterBottom>
          Přihlášení
        </Typography>

        {error && (
          <Typography className="error-message" color="error" gutterBottom>
            {error}
          </Typography>
        )}

        <form onSubmit={handleLogin} className="login-form">
          <TextField
            className="custom-input"
            label="Uživatelské jméno"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Mail size={20} className="input-icon" />
                </InputAdornment>
              ),
            }}
            disabled={loading}
          />

          <TextField
            className="custom-input"
            label="Heslo"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock size={20} className="input-icon" />
                </InputAdornment>
              ),
            }}
            disabled={loading}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="login-button"
            disabled={loading}
            sx={{ mt: 3 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Přihlásit"}
          </Button>
        </form>

        <Typography className="footer" variant="caption" align="center" mt={4}>
          © 2025 Kavalierglass, a.s.
        </Typography>
      </Container>
    </Box>
  );
};

export default LoginPage;
