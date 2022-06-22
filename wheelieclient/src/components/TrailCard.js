/* eslint-disable no-restricted-globals */
import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { deleteTrail } from '../api/data/TrailData';
import { useNavigate } from 'react-router-dom';

export default function TrailCard({ trail, setTrails, biker }) {
  const navigate = useNavigate();

  const handleClick = (method) => {
    if (method === 'remove') {
      const del = confirm(`Are you sure you want to remove ${trail.name} from your trails?`);

      if (del) {
        deleteTrail(trail).then(setTrails);
        navigate('/trails');
      }
    } else {
        navigate(`/edit-trail/${trail.id}`);
    }
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={trail.imageUrl}
        alt={trail.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {trail.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Location: {trail.location}
          <br />
          Distance: {trail.distance} mi
          <br />
          Grade: {trail.grade}%
          <br />
          Time: {trail.time} hour(s)
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleClick('edit')}>Edit</Button>
        <Button size="small" onClick={() => handleClick('remove')}>Remove</Button>
      </CardActions>
    </Card>
  );
}

TrailCard.propTypes = {
  trail: PropTypes.shape({
    bikerId: PropTypes.number,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    location: PropTypes.string,
    distance: PropTypes.number,
    grade: PropTypes.number
  }).isRequired
}
