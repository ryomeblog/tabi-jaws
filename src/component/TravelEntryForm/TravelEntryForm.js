// TravelEntryForm.js
import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ja from "date-fns/locale/ja";
import { saveAs } from "file-saver"; // For file saving functionality
import pako from "pako";

// Function to compress text using Gzip and convert to Base64
function compressText(text) {
  const utf8Bytes = new TextEncoder().encode(text);
  const compressedBytes = pako.gzip(utf8Bytes);
  const base64String = btoa(String.fromCharCode(...compressedBytes));
  return base64String;
}

function TravelEntryForm({ travelData, setTravelData }) {
  const [title, setTitle] = useState(travelData.title || "");
  const [startDate, setStartDate] = useState(
    travelData.startDate ? new Date(travelData.startDate) : new Date()
  );
  const [endDate, setEndDate] = useState(
    travelData.endDate
      ? new Date(travelData.endDate)
      : () => {
          let tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          return tomorrow;
        }
  );
  const [departure, setDeparture] = useState(travelData.departure || "");
  const [destination, setDestination] = useState(travelData.destination || "");
  const [notes, setNotes] = useState(travelData.notes || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTravelData = {
      title,
      startDate: startDate.toLocaleDateString(),
      endDate: endDate.toLocaleDateString(),
      departure,
      destination,
      notes,
      scheduleData: generateScheduleData(startDate, endDate),
    };

    setTravelData(updatedTravelData);
  };

  const generateScheduleData = (start, end) => {
    let scheduleData = [];
    let currentDate = new Date(start);

    while (currentDate <= end) {
      scheduleData.push({
        date: currentDate.toLocaleDateString(),
        schedules: [],
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return scheduleData;
  };

  const handleExport = () => {
    
    // Convert travelData to JSON string
    const textData = JSON.stringify(travelData);

    // Compress the text data using the compressText function
    const compressedData = compressText(textData);

    // Create a Blob and save the file
    const blob = new Blob([compressedData], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, "travelData.txt");
  };

  const handleGeneratePreviewUrl = async () => {
    try {
      // travelDataをJSON文字列に変換して圧縮
      const compressedData = compressText(JSON.stringify(travelData));

      // プレビューURLを生成
      const previewUrl = `${
        window.location.origin
      }/tabi-jaws?travelData=${encodeURIComponent(compressedData)}`;

      // プレビューURLをクリップボードにコピー
      await navigator.clipboard.writeText(previewUrl);
      alert("プレビューURLがクリップボードにコピーされました！");
    } catch (error) {
      console.error("URLの生成中にエラーが発生しました:", error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 500,
          mx: "auto",
          mt: 4,
          p: 4,
          borderRadius: 3,
          boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
          background: "linear-gradient(135deg, #FFDEE9 0%, #B5FFFC 100%)",
          color: "#333",
        }}
      >
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold", mb: 3 }}
        >
          旅行情報
        </Typography>

        {/* Input fields for travel details */}
        <TextField
          label="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          inputProps={{ maxLength: 22 }}
          fullWidth
          sx={{ mb: 2, background: "#fff", borderRadius: 2 }}
        />

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <DatePicker
              label="開始日"
              value={startDate}
              onChange={(date) => setStartDate(date)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ background: "#fff", borderRadius: 2 }}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              label="終了日"
              value={endDate}
              onChange={(date) => setEndDate(date)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ background: "#fff", borderRadius: 2 }}
                />
              )}
            />
          </Grid>
        </Grid>

        <TextField
          label="出発地"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
          inputProps={{ maxLength: 8 }}
          fullWidth
          sx={{ mb: 2, background: "#fff", borderRadius: 2 }}
        />

        <TextField
          label="目的地"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          inputProps={{ maxLength: 8 }}
          fullWidth
          sx={{ mb: 2, background: "#fff", borderRadius: 2 }}
        />

        <TextField
          label="メモ"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          multiline
          rows={4}
          inputProps={{ maxLength: 1000 }}
          fullWidth
          sx={{ mb: 2, background: "#fff", borderRadius: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: "#f46b45",
            color: "#fff",
            ":hover": { backgroundColor: "#f5576c" },
          }}
        >
          保存
        </Button>

        {/* Export Button */}
        <Button
          variant="outlined"
          fullWidth
          sx={{
            mt: 2,
            color: "#f46b45",
            ":hover": { backgroundColor: "#f46b45", color: "#fff" },
          }}
          onClick={handleExport}
        >
          データをエクスポート
        </Button>

        {/* Generate Preview URL Button */}
        <Button
          variant="outlined"
          fullWidth
          sx={{
            mt: 2,
            color: "#f46b45",
            ":hover": { backgroundColor: "#f46b45", color: "#fff" },
          }}
          onClick={handleGeneratePreviewUrl}
        >
          プレビューURLを発行
        </Button>
      </Box>
    </LocalizationProvider>
  );
}

export default TravelEntryForm;
