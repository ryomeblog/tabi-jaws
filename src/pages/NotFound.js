// NotFound.js
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // useNavigateを追加

function NotFound() {
  const navigate = useNavigate();
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
        
        <Typography
          component="span"
          onClick={() => navigate("/tabi-jaws/data")}
          sx={{ color: "#fff", fontWeight: "bold", cursor: "pointer" }}
        >
          こちら
        </Typography>
      </Box>
    </Box>
  );
}

export default NotFound;
