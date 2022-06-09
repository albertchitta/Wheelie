/* eslint-disable no-restricted-globals */
import * as React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { deleteTrail } from '../api/data/TrailData';
import { useNavigate } from 'react-router-dom';

export default function TrailCard({ trail, setTrails }) {
  const navigate = useNavigate();

  const handleClick = (method) => {
    if (method === 'delete') {
      const del = confirm(`Are you sure you want to delete ${trail.name}?`);

      if (del) {
        deleteTrail(trail).then(setTrails);
      }
    } else if (method === 'edit') {
        navigate(`/edit-trail/${trail.id}`)
    } else if (method === 'add') {
      trail.bikerId = 1;
      console.warn('added');
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
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleClick('add')}>Add</Button>
        <Button size="small" onClick={() => handleClick('edit')}>Edit</Button>
        <Button size="small" onClick={() => handleClick('delete')}>Remove</Button>
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
