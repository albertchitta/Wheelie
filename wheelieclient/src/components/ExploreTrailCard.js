/* eslint-disable no-restricted-globals */
import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTrail, deleteTrail } from '../api/data/TrailData';
import { useNavigate } from 'react-router-dom';

export default function ExploreTrailCard({ trail, setTrails, biker }) {
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
        trail.bikerId = biker.id;
        createTrail(trail).then(setTrails);
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
        <Button size="small" onClick={() => handleClick('add')}>Add</Button>
        {biker.role === 'admin' ? (
          <>
            <Button size="small" onClick={() => handleClick('edit')}>Edit</Button>
            <Button size="small" onClick={() => handleClick('delete')}>Remove</Button>
          </>
        ) : (
          ''
        )}
      </CardActions>
    </Card>
  );
}

ExploreTrailCard.propTypes = {
  trail: PropTypes.shape({
    bikerId: PropTypes.number,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    location: PropTypes.string,
    distance: PropTypes.number,
    grade: PropTypes.number
  }).isRequired
}
