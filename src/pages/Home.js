// Home.js
import React from "react";
import TravelForm from "../component/TravelForm";
import { Box, Typography, useMediaQuery, Link } from "@mui/material";
import { useTheme } from '@mui/material/styles';

function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // md以下を縦表示に切り替える

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
        p: 2,
        flexDirection: isMobile ? 'column' : 'row', // 縦表示への切り替え
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          color: '#fff',
          mb: isMobile ? 2 : 4, // モバイルでは余白を狭める
        }}
      >
        <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
          旅ジョーズ
        </Typography>
        <Typography variant="h5" sx={{ opacity: 0.8, mb: 2 }}>
          思い出に残る旅の計画を始めましょう！
        </Typography>
        既にデータをお持ちの方は
        <Link href="/data" underline="hover" sx={{ color: '#fff', fontWeight: 'bold' }}>
          こちら
        </Link>
      </Box>
      <TravelForm />
    </Box>
  );
}

export default Home;
