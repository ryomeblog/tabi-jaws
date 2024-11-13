// TravelPlan.js
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Tabs, Tab, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material"; // 戻る矢印アイコン
import TravelPreview from "../component/TravelPreview/TravelPreview";
import TravelEntryForm from "../component/TravelEntryForm/TravelEntryForm";
import ResponsiveScheduleForm from "../component/ScheduleForm/ResponsiveScheduleForm";

function TravelPlan() {
  const navigate = useNavigate(); // navigateを設定
  const location = useLocation();
  const [travelData, setTravelData] = useState(location.state);
  const [tabValue, setTabValue] = useState(0);

  // タブの切り替え処理
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // 戻るボタンの処理
  const handleBackClick = () => {
    navigate("/tabi-jaws");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",
        color: "#fff",
        overflow: "hidden", // 全体のはみ出し防止
      }}
    >
      {/* 上部の戻るボタンとタブ */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#ffffff40",
          borderRadius: "10px",
          padding: "10px 10px",
        }}
      >
        {/* 戻るボタン */}
        <IconButton
          onClick={handleBackClick}
          sx={{
            color: "#fff",
            fontSize: "30px",
            marginRight: "20px",
            "&:hover": {
              backgroundColor: "#ffffff60",
            },
          }}
        >
          <ArrowBack />
        </IconButton>

        {/* タブ */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          orientation="horizontal"
          sx={{
            flexGrow: 1,
            background: "linear-gradient(135deg, #ff6a00 0%, #ffcc00 100%)",
            borderRadius: "10px",
          }}
        >
          <Tab
            label="概要"
            sx={{
              color: "#fff",
              backgroundColor: tabValue === 0 ? "#ff6a00" : "transparent",
              "&:hover": {
                backgroundColor: "#ff9e3d",
              },
            }}
          />
          <Tab
            label="行程"
            sx={{
              color: "#fff",
              backgroundColor: tabValue === 1 ? "#ff6a00" : "transparent",
              "&:hover": {
                backgroundColor: "#ff9e3d",
              },
            }}
          />
          <Tab
            label="プレビュー"
            sx={{
              color: "#fff",
              backgroundColor: tabValue === 2 ? "#ff6a00" : "transparent",
              "&:hover": {
                backgroundColor: "#ff9e3d",
              },
            }}
          />
        </Tabs>
      </Box>

      {/* コンテンツ部分 */}
      <Box
        sx={{
          flex: 1,
          padding: "15px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          overflowY: "auto", // スクロール可能にする
          backgroundColor: "#ffffff30",
          borderRadius: "10px",
          mt: 2, // タブとの間に余白を追加
        }}
      >
        {/* タブのコンテンツ表示 */}
        {tabValue === 0 && (
          <Box sx={{ width: "100%", maxWidth: 600 }}> {/* フォームの最大幅を設定 */}
            <TravelEntryForm travelData={travelData} setTravelData={setTravelData} />
          </Box>
        )}
        {tabValue === 1 && (
          <ResponsiveScheduleForm travelData={travelData} setTravelData={setTravelData} />
        )}
        {tabValue === 2 && <TravelPreview travelData={travelData} />}
      </Box>
    </Box>
  );
}

export default TravelPlan;
