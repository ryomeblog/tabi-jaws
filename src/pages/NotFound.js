// NotFound.js
import { Box, Typography, Link } from "@mui/material";

function NotFound() {
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
        }}
      >
        <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
          このページは存在しません。
        </Typography>
        ホーム画面に戻る場合は
        <Link href="/" underline="hover" sx={{ color: '#fff', fontWeight: 'bold' }}>
          こちら
        </Link>
      </Box>
    </Box>
  );
}

export default NotFound;
