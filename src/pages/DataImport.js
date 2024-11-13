// DataImport.js
import React from "react";
import DecompressTextForm from "../component/DecompressTextForm";
import { Box } from "@mui/material";
import Header from "../component/Header"; // ヘッダーをインポート
import { useNavigate } from "react-router-dom"; // React RouterのuseNavigateフックをインポート

function DataImport() {
  const pageTitle = "データインポート";

  // react-router-domのuseNavigateフックを使用
  const navigate = useNavigate();

  // 戻るボタンをクリックしたときの処理
  const handleBackClick = () => {
    // React Routerを使って'/'に遷移
    navigate("/tabi-jaws");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
        p: 0, // パディングを削除
      }}
    >
      <Header pageTitle={pageTitle} onBackClick={handleBackClick} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1, // フレックスボックスの設定で中央に配置
          p: 2,
        }}
      >
        <DecompressTextForm />
      </Box>
    </Box>
  );
}

export default DataImport;
