import React from "react";
import { Box, Typography, Chip, Stack, Card, CardContent } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import TravelSvg from "./TravelSvg";
import TravelEndSvg from "./TravelEndSvg";

function TravelPreview({ travelData }) {
  const calculateTotalBudget = (travelData) => {
    let totalBudget = 0;
  
    travelData.scheduleData.forEach(day => {
      day.schedules.forEach(schedule => {
        if (schedule.budget) {
          totalBudget += Number(schedule.budget);
        }
      });
    });
  
    return totalBudget;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        width: "100%",
        maxWidth: "100vw", // 横幅を制限
        boxSizing: "border-box", // padding を含めて幅を計算
        maxHeight: "calc(100vh - 160px)",
        overflowY: "auto",
      }}
    >
      {/* イベントと移動のアイテム表示 */}
      <Box sx={{ width: "100%", overflowX: "hidden" }}> {/* 横スクロールを防ぐ */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              marginBottom: "40px",
            }}
          >
            {/* 追加情報の表示 */}
            <Box
              sx={{
                marginBottom: "20px",
                backgroundColor: "gray",
                borderRadius: "8px",
                padding: "15px",
                textAlign: "center",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <Typography
                variant="h5"
                sx={{ marginBottom: "10px", fontWeight: "bold" }}
              >
                {travelData.title}
              </Typography>

              {/* 予算のカード表示 */}
              <Card
                sx={{
                  marginBottom: "10px",
                  maxWidth: 300,
                  width: "100%",
                  marginX: "auto",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#ffd500",
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    予算
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "1.2rem", color: "#000" }}
                  >
                    {new Intl.NumberFormat("ja-JP", {
                      style: "currency",
                      currency: "JPY",
                    }).format(calculateTotalBudget(travelData))}
                  </Typography>
                </CardContent>
              </Card>

              {/* 期間 表示 */}
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={1}
                sx={{ marginBottom: "10px" }}
              >
                <Chip
                  label={`${travelData.startDate} ～ ${travelData.endDate}`}
                  color="success"
                />
              </Stack>

              {/* 出発地 -> 目的地 表示 */}
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={1}
                sx={{ marginBottom: "10px" }}
              >
                <Chip
                  label={`${travelData.departure}`}
                  color="primary"
                />
                <ArrowForward color="action" />
                <Chip
                  label={`${travelData.destination}`}
                  color="secondary"
                />
              </Stack>

              {/* メモがある場合の表示 (カード形式) */}
              {travelData.notes && (
                <Card
                  sx={{
                    marginTop: "10px",
                    backgroundColor: "#f1f1f1",
                    borderRadius: "8px",
                    padding: "10px",
                  }}
                >
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{ textAlign: "left" }}
                    >
                      メモ:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        whiteSpace: "pre-line",
                        textAlign: "left",
                      }}
                    >
                      {travelData.notes}
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Box>

            {/* TravelSvgの表示 */}
            {travelData.scheduleData.map((data, index) => (
              <Box key={index} sx={{ marginTop: index !== 0 ? "-10px" : "0" }}>
                <TravelSvg schedules={data.schedules} date={data.date} />
              </Box>
            ))}
            <Box sx={{ marginTop: "-10px" }}>
              <TravelEndSvg />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default TravelPreview;
