// ResponsiveScheduleForm.js
import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Grid,
  Paper,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";

function ResponsiveScheduleForm({ travelData, setTravelData }) {
  const handleInputChange = (dateIndex, scheduleIndex, field, value) => {
    const newData = { ...travelData };
    newData.scheduleData[dateIndex].schedules[scheduleIndex][field] = value;
    setTravelData(newData);
  };

  const handleAddSchedule = (dateIndex) => {
    const newData = { ...travelData };
    newData.scheduleData[dateIndex].schedules.push({
      number: newData.scheduleData[dateIndex].schedules.length + 1,
      time: "",
      title: "",
      description: "",
      budget: 0,
      links: [],
    });
    setTravelData(newData);
  };

  const handleDeleteSchedule = (dateIndex, scheduleIndex) => {
    const newData = { ...travelData };
    newData.scheduleData[dateIndex].schedules.splice(scheduleIndex, 1);
    setTravelData(newData);
  };

  const handleLinkChange = (dateIndex, scheduleIndex, linkIndex, value) => {
    const newData = { ...travelData };
    newData.scheduleData[dateIndex].schedules[scheduleIndex].links[linkIndex] = value;
    console.log("newData:", newData)
    setTravelData(newData);
  };

  const handleAddLink = (dateIndex, scheduleIndex) => {
    const newData = { ...travelData };
    newData.scheduleData[dateIndex].schedules[scheduleIndex].links.push("");
    setTravelData(newData);
  };

  const handleDeleteLink = (dateIndex, scheduleIndex, linkIndex) => {
    const newData = { ...travelData };
    newData.scheduleData[dateIndex].schedules[scheduleIndex].links.splice(linkIndex, 1);
    setTravelData(newData);
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: { xs: 2, sm: 4 },
        backgroundColor: "#f7f8fa",
        borderRadius: 3,
        overflowX: "hidden",
      }}
    >
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ color: "#333", fontWeight: "bold", marginBottom: 3 }}
      >
        日付別予定
      </Typography>

      {travelData.scheduleData.map((scheduleDay, dateIndex) => (
        <Box
          key={dateIndex}
          component={Paper}
          elevation={3}
          sx={{
            padding: { xs: 2, sm: 3 },
            borderRadius: 3,
            marginBottom: 3,
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#444" }}>
            {scheduleDay.date}
          </Typography>

          {scheduleDay.schedules.map((schedule, scheduleIndex) => (
            <Box
              key={scheduleIndex}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                paddingY: 2,
                borderBottom: "1px solid #e0e0e0",
                marginBottom: 2,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label="順番"
                    type="number"
                    value={schedule.number}
                    onChange={(e) =>
                      handleInputChange(dateIndex, scheduleIndex, "number", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label="時間"
                    placeholder="hh:mm"
                    value={schedule.time}
                    onChange={(e) =>
                      handleInputChange(dateIndex, scheduleIndex, "time", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="タイトル"
                    value={schedule.title}
                    inputProps={{ maxLength: 14 }}
                    onChange={(e) =>
                      handleInputChange(dateIndex, scheduleIndex, "title", e.target.value)
                    }
                  />
                </Grid>
              </Grid>

              <TextField
                fullWidth
                label="詳細"
                multiline
                rows={3}
                value={schedule.description}
                inputProps={{ maxLength: 1000 }}
                onChange={(e) =>
                  handleInputChange(dateIndex, scheduleIndex, "description", e.target.value)
                }
              />

              <TextField
                fullWidth
                label="予算"
                type="number"
                value={schedule.budget}
                onChange={(e) =>
                  handleInputChange(dateIndex, scheduleIndex, "budget", e.target.value)
                }
              />

              {/* Links Array */}
              {schedule.links.map((link, linkIndex) => (
                <Box key={linkIndex} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TextField
                    fullWidth
                    label={`リンク${linkIndex + 1}`}
                    value={link}
                    onChange={(e) =>
                      handleLinkChange(dateIndex, scheduleIndex, linkIndex, e.target.value)
                    }
                  />
                  <IconButton
                    onClick={() => handleDeleteLink(dateIndex, scheduleIndex, linkIndex)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}

              {/* Add New Link */}
              <Button
                startIcon={<AddIcon />}
                onClick={() => handleAddLink(dateIndex, scheduleIndex)}
              >
                リンク追加
              </Button>

              {/* Delete Schedule Button */}
              <Button
                startIcon={<DeleteIcon />}
                onClick={() => handleDeleteSchedule(dateIndex, scheduleIndex)}
                color="error"
              >
                このスケジュールを削除
              </Button>
            </Box>
          ))}

          {/* Add New Schedule Button */}
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleAddSchedule(dateIndex)}
            sx={{ marginTop: 2 }}
          >
            新しいスケジュールを追加
          </Button>
        </Box>
      ))}
    </Box>
  );
}

export default ResponsiveScheduleForm;
