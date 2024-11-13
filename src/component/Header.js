// Header.js
import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material"; // 戻る矢印アイコン

function Header({ pageTitle, onBackClick }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)", // インスタグラム風のカラフルなグラデーション
        padding: "10px 20px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <IconButton onClick={onBackClick} sx={{ color: "#fff" }}>
        <ArrowBack />
      </IconButton>
      <Typography
        variant="h6"
        sx={{
          color: "#fff", // 白色で文字が目立つように
          fontWeight: "bold",
          fontSize: "18px",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)", // 文字に影をつけて視認性を向上
        }}
      >
        {pageTitle}
      </Typography>
    </Box>
  );
}

export default Header;
