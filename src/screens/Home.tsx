import React from "react";
import { Paper, Typography, Container } from "@mui/material";

const Home: React.FC = () => {
  return (
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
        <Typography variant="h5" gutterBottom>
          Welcome to the Home Page
        </Typography>

        <Typography variant="body1">
          Please sign in to see your posts.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Home;
