import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function BikerCard({ biker }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={biker.imageUrl}
        alt={biker.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {biker.name}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {biker.userName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Location: {biker.location}
          <br />
          Level: {biker.level}
        </Typography>
      </CardContent>
    </Card>
  );
}

BikerCard.propTypes = {
  biker: PropTypes.shape({
    id: PropTypes.number,
    firebaseUserId: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    userName: PropTypes.string,
    level: PropTypes.string,
    location: PropTypes.string,
    imageUrl: PropTypes.string,
    role: PropTypes.string
  }).isRequired
}
