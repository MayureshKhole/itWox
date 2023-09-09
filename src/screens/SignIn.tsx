import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { Button, TextField, Paper, Typography, Container } from "@mui/material";

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // State for handling form inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    localStorage.setItem("formData", JSON.stringify(formData));
    dispatch(authActions.login(formData));

    console.log(formData);
    navigate("/dashboard");
  };

  return (
    <div style={{ marginTop: "80px" }}>
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={3}
          style={{
            padding: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Sign In</Typography>
          <form
            onSubmit={handleSubmit}
            style={{ width: "100%", marginTop: 20 }}
          >
            <TextField
              placeholder="Any mail id"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              placeholder="123"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: 20 }}
            >
              Sign In
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default SignIn;
