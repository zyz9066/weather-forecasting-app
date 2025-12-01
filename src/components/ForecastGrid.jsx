import { Grid } from "@mui/material";
import ForecastCard from "./ForecastCard";

const groupIntoDays = (list) => {
  const byDate = {};
  list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!byDate[date]) byDate[date] = [];
    byDate[date].push(item);
  });
  return Object.entries(byDate).slice(0, 5).map(([date, items]) => {
    const temps = items.map((it) => it.main.temp);
    const min = Math.min(...temps);
    const max = Math.max(...temps);
    const midday = items[Math.floor(items.length / 2)];
    return {
      date,
      min,
      max,
      icon: midday.weather[0].icon,
      desc: midday.weather[0].description,
    };
  });
}

function ForecastGrid({ data, units, language }) {
  const days = groupIntoDays(data.list);

  return (
    <Grid container spacing={2}>
      {days.map((day) => (
        <Grid item xs={6} sm={4} md={2.4} key={day.date}>
          <ForecastCard key={day.date} day={day} units={units} language={language} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ForecastGrid;