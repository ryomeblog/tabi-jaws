// TravelForm.js
import { useState } from 'react';
import { TextField, Box, Button, Typography, Grid } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ja from 'date-fns/locale/ja'; // 日本語ロケールのインポート

function TravelForm() {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState([null, null]);
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [budget, setBudget] = useState(0);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title,
      duration,
      departure,
      destination,
      budget,
      notes,
    };
    console.log(formData);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 600,
          mx: 'auto',
          mt: 4,
          p: 4,
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          background: 'linear-gradient(135deg, #FFDEE9 0%, #B5FFFC 100%)',
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', color: '#333', fontWeight: 'bold' }}>
          旅行情報
        </Typography>

        {/* Title */}
        <TextField
          label="タイトル"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2, background: '#ffffff90', borderRadius: 2 }}
        />

        {/* Duration */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <DatePicker
              label="開始日"
              value={duration[0]}
              onChange={(newValue) => setDuration([newValue, duration[1]])}
              renderInput={(params) => <TextField {...params} sx={{ background: '#ffffff90', borderRadius: 2 }} />}
              inputFormat="yyyy/MM/dd" // 入力フォーマットの指定
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              label="終了日"
              value={duration[1]}
              onChange={(newValue) => setDuration([duration[0], newValue])}
              renderInput={(params) => <TextField {...params} sx={{ background: '#ffffff90', borderRadius: 2 }} />}
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
          sx={{ mb: 2, background: '#ffffff90', borderRadius: 2 }}
        />
        <TextField
          label="目的地"
          fullWidth
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          sx={{ mb: 2, background: '#ffffff90', borderRadius: 2 }}
        />

        {/* Budget */}
        <TextField
          label="予算（円）"
          type="number"
          fullWidth
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          sx={{ mb: 2, background: '#ffffff90', borderRadius: 2 }}
        />

        {/* Notes */}
        <TextField
          label="メモ"
          fullWidth
          multiline
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          sx={{ mb: 2, background: '#ffffff90', borderRadius: 2 }}
        />

        {/* Submit */}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, backgroundColor: '#ff7e5f', ':hover': { backgroundColor: '#ff5f7e' } }}>
          送信
        </Button>
      </Box>
    </LocalizationProvider>
  );
}

export default TravelForm;
