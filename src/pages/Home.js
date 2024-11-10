// Home.js
import React from "react";
import TravelForm from "../component/TravelForm";
import { Box, Typography } from "@mui/material";

function Home() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
        p: 2,
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          color: '#fff',
          mb: 4,
        }}
      >
        <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
          旅ジョーズ
        </Typography>
        <Typography variant="h5" sx={{ opacity: 0.8 }}>
          思い出に残る旅の計画を始めましょう！
        </Typography>
      </Box>
      <TravelForm />
    </Box>
  );
}

export default Home;
