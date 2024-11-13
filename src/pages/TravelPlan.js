// TravelPlan.js
import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material"; // 戻る矢印アイコン
import TravelPreview from "../component/TravelPreview/TravelPreview";

function TravelPlan() {
  const [tabValue, setTabValue] = useState(0);
  // テストデータ
  const travelData = {
    overview: "東京旅行一泊二日",
    departure: "北海道",
    destination: "東京",
    memo: "ハンバーグ\naaaあああああああ\nテスト",
    budget: 1000000000,
    scheduleData:[
      {
        date: "2024/11/13",
        schedules : [
          {
            time: "08:00",
            title: "新大阪 - 東京",
            budget: 10000,
            description: "特になし",
          },
          {
            time: "10:40",
            budget: 10000,
            title: "ああああああああああああああ",
            description: "あいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえお",
            links: ["http://localhost:3000/travel"],
          },
          {
            time: "11:00",
            budget: 10000,
            title: "観光地到着 & 撮影",
            description: "",
            links: ["http://localhost:3000/travelaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"],
          },
          {
            time: "12:30",
            title: "昼食",
            description: "a",
            links: [
              "http://localhost:3000/travel",
              "http://localhost:3000/travel",
            ],
          },
          {
            time: "13:30",
            title: "移動",
            description: "a",
            links: [
              "http://localhost:3000/travel",
              "http://localhost:3000/travel",
              "http://localhost:3000/travel",
              "http://localhost:3000/travel",
              "http://localhost:3000/travel",
              "http://localhost:3000/travel",
              "http://localhost:3000/travel",
              "http://localhost:3000/travel",
              "http://localhost:3000/travel",
              "http://localhost:3000/travel",
            ],
          },
          {
            time: "14:30",
            title: "移動",
            description: "a",
            links: ["http://localhost:3000/travel"],
          },
          {
            time: "15:30",
            title: "移動",
            // description: "a",
            links: ["http://localhost:3000/travel"],
          },
          {
            time: "15:30",
            title: "移動",
            // description: "a",
            links: ["http://localhost:3000/travel"],
          },
          {
            time: "15:30",
            title: "移動",
            // description: "a",
            links: ["http://localhost:3000/travel"],
          },
          {
            time: "15:30",
            title: "移動",
            // description: "a",
          },
          {
            time: "15:30",
            title: "移動",
            // description: "a",
          },
          {
            time: "15:30",
            title: "移動",
          },
          {
            time: "15:30",
            title: "移動",
          },
          {
            time: "15:30",
            title: "移動",
          },
          {
            time: "15:30",
            title: "移動",
          },
          {
            time: "15:30",
            title: "移動",
          },
          {
            time: "15:30",
            title: "移動",
          },
          {
            time: "15:30",
            title: "移動",
          },
          {
            time: "15:30",
            title: "移動",
          },
          {
            time: "15:30",
            budget: 10000,
            title: "移動",
          },
          {
            time: "15:30",
            budget: 10000,
            title: "移動",
          },
          {
            time: "15:30",
            budget: 10000,
            title: "移動",
            description: "a",
            links: [
              "http://localhost:3000/travel",
              "http://localhost:3000/travel",
            ],
          },
        ]
      },
      {
        date: "2024/11/14",
        schedules : [
          {
            time: "08:00",
            title: "新大阪 - 東京",
            description: "",
            links: ["http://localhost:3000/travel"],
            type: "train",
          },
          {
            time: "10:40",
            title: "東京 - 横浜",
            description: "",
            links: ["http://localhost:3000/travel"],
          },
          {
            time: "11:00",
            title: "観光地到着 & 撮影",
            description: "",
            link: "http://localhost:3000/travel",
          },
          {
            time: "12:30",
            title: "昼食",
            description: "",
            link: "http://localhost:3000/travel",
          },
          {
            time: "13:30",
            title: "移動",
            description: "",
            link: "http://localhost:3000/travel",
          },
        ]
      }
    ]
  };

  // タブの切り替え処理
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // 戻るボタンの処理
  const handleBackClick = () => {
    console.log("戻るボタンがクリックされました");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",
        color: "#fff",
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
          backgroundColor: "#ffffff30",
          borderRadius: "10px",
        }}
      >
        {/* タブのコンテンツ表示 */}
        {tabValue === 0 && (
          <Typography variant="h4" sx={{ color: "#fff", fontWeight: "bold" }}>
            概要
          </Typography>
        )}
        {tabValue === 1 && (
          <Typography variant="h4" sx={{ color: "#fff", fontWeight: "bold" }}>
            行程
          </Typography>
        )}
        {tabValue === 2 && <TravelPreview travelData={travelData} />}
      </Box>
    </Box>
  );
}

export default TravelPlan;
