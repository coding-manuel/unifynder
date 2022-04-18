import React, { useEffect, useState } from "react";
import { Paper, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CoursesCard({ course }) {
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchImage = async () => {
      const img = await import(`../assets/${course}.png`);
      setImage(img.default);
      console.log(img);
    };

    fetchImage();
  }, [course]);

  const handleClick = () => {
    navigate(`/search/s=${course}`);
  };

  return (
    <Grid item sx={{ width: "150px" }} onClick={() => handleClick()}>
      <Paper elevation={2} sx={{ padding: "20px", cursor: "pointer" }}>
        <Stack alignItems="center" gap={1}>
          <img style={{ width: "60px" }} src={image} alt={course} />
          <Typography variant="subtitle2">{course}</Typography>
        </Stack>
      </Paper>
    </Grid>
  );
}
