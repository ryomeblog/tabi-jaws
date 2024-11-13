// TravelForm.js
import { useState } from "react";
import { TextField, Box, Button, Typography, Grid } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ja from "date-fns/locale/ja"; // 日本語ロケールのインポート
import { useNavigate } from "react-router-dom"; // useNavigateをインポート

function TravelForm() {
  const navigate = useNavigate(); // navigateを設定
  const [title, setTitle] = useState("");
  const [startDuration, setStartDuration] = useState(new Date());
  const [endDuration, setEndDuration] = useState(() => {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const travelData = {
      title,
      startDate: startDuration.toLocaleDateString(),
      endDate: endDuration.toLocaleDateString(),
      departure,
      destination,
      notes,
      scheduleData: generateScheduleData(startDuration, endDuration),
    };

    // formDataを保持したまま別のページに遷移
    navigate("/travel", { state: travelData });
  };

  const generateScheduleData = (start, end) => {
    let scheduleData = [];
    let currentDate = new Date(start);
  
    while (currentDate <= end) {
      scheduleData.push({
        date: currentDate.toLocaleDateString(),
        schedules: []
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return scheduleData;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 600,
          mx: "auto",
          mt: 4,
          p: 4,
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          background: "linear-gradient(135deg, #FFDEE9 0%, #B5FFFC 100%)",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ textAlign: "center", color: "#333", fontWeight: "bold" }}
        >
          旅行情報
        </Typography>

        {/* Title */}
        <TextField
          label="タイトル"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2, background: "#ffffff90", borderRadius: 2 }}
        />

        {/* Duration */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <DatePicker
              label="開始日"
              value={startDuration}
              onChange={(newValue) => setStartDuration(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ background: "#ffffff90", borderRadius: 2 }}
                />
              )}
              inputFormat="yyyy/MM/dd" // 入力フォーマットの指定
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              label="終了日"
              value={endDuration}
              onChange={(newValue) => setEndDuration(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ background: "#ffffff90", borderRadius: 2 }}
                />
              )}
              inputFormat="yyyy/MM/dd"
            />
          </Grid>
        </Grid>

        {/* Departure and Destination */}
        <TextField
          label="出発地"
          fullWidth
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
          sx={{ mb: 2, background: "#ffffff90", borderRadius: 2 }}
        />
        <TextField
          label="目的地"
          fullWidth
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          sx={{ mb: 2, background: "#ffffff90", borderRadius: 2 }}
        />

        {/* Notes */}
        <TextField
          label="メモ"
          fullWidth
          multiline
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          sx={{ mb: 2, background: "#ffffff90", borderRadius: 2 }}
        />

        {/* Submit */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: "#ff7e5f",
            ":hover": { backgroundColor: "#ff5f7e" },
          }}
        >
          送信
        </Button>
      </Box>
    </LocalizationProvider>
  );
}

export default TravelForm;
