// TravelPreview.js
import React from "react";
import { Box, Typography, Chip, Stack, Card, CardContent } from "@mui/material"; // 必要なMUIコンポーネントをインポート
import { ArrowForward } from "@mui/icons-material"; // 矢印アイコンをインポート
import TravelSvg from "./TravelSvg";
import TravelEndSvg from "./TravelEndSvg";

function TravelPreview({ travelData }) {
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
        maxHeight: "calc(100vh - 160px)",
        overflowY: "auto",
      }}
    >
      {/* イベントと移動のアイテム表示 */}
      <Box sx={{ position: "relative", width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "20px",
            position: "relative",
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
                backgroundColor: "gray", // 背景色はgrayのまま
                borderRadius: "8px",
                padding: "15px",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{ marginBottom: "10px", fontWeight: "bold" }}
              >
                {travelData.overview}
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
                    }).format(travelData.budget)}
                  </Typography>
                </CardContent>
              </Card>

              {/* 出発地 -> 目的地 表示 */}
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={1}
                sx={{ marginBottom: "10px" }}
              >
                <Chip
                  label={`出発地: ${travelData.departure}`}
                  color="primary"
                />
                <ArrowForward color="action" />
                <Chip
                  label={`目的地: ${travelData.destination}`}
                  color="secondary"
                />
              </Stack>

              {/* メモがある場合の表示 (カード形式) */}
              {travelData.memo && (
                <Card
                  sx={{
                    marginTop: "10px",
                    backgroundColor: "#f1f1f1", // メモのカードに背景色を設定
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
                      {travelData.memo}
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
