// Home.js
import React, { useEffect } from "react";
import TravelForm from "../component/TravelForm";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom"; // useNavigate, useLocationを追加
import pako from "pako"; // pakoライブラリのインポート

function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // md以下を縦表示に切り替える
  const navigate = useNavigate();
  const location = useLocation(); // クエリパラメータの取得に使用

  // Base64を解凍して元のテキストに戻す関数
  const decompressText = (base64String) => {
    try {
      const compressedBytes = Uint8Array.from(atob(base64String), (c) =>
        c.charCodeAt(0)
      );
      const utf8Bytes = pako.ungzip(compressedBytes);
      const decodedText = new TextDecoder().decode(utf8Bytes);
      // 解凍されたテキストをJSONに変換
      const parsedData = JSON.parse(decodedText);
      return parsedData; // JSONオブジェクトを返す
    } catch (error) {
      return null; // エラー発生時はnullを返す
    }
  };

  useEffect(() => {
    // クエリパラメータに travelData があるか確認
    const params = new URLSearchParams(location.search);
    const travelDataBase64 = params.get("travelData");

    if (travelDataBase64) {
      const decompressedData = decompressText(travelDataBase64);
      if (decompressedData) {
        navigate("/tabi-jaws/preview", { state: decompressedData }); // travelDataをstateとして渡す
      } else {
        // 解凍エラーが発生した場合
        navigate("/tabi-jaws"); // エラー時にホームページに遷移
      }
    }
  }, [location.search, navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
        p: 2,
        flexDirection: isMobile ? "column" : "row", // 縦表示への切り替え
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          color: "#fff",
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
        <Typography
          component="span"
          onClick={() => navigate("/tabi-jaws/data")}
          sx={{ color: "#fff", fontWeight: "bold", cursor: "pointer" }}
        >
          こちら
        </Typography>
      </Box>
      <TravelForm />
    </Box>
  );
}

export default Home;
