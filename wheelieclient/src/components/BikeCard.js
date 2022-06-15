/* eslint-disable no-restricted-globals */
import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { deleteBike } from '../api/data/BikeData';

export default function BikeCard({ bike, setBikes, biker }) {
  const navigate = useNavigate();

  const handleClick = (method) => {
    if (method === 'delete') {
      const del = confirm(`Are you sure you want to delete ${bike.brand}?`);

      if (del) {
        deleteBike(bike).then(setBikes);
      }
    } else {
        navigate(`/edit-bike/${bike.id}`)
    }
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {bike.brand}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Color: {bike.color}
          <br />
          Accessories: {bike.accessories}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleClick('edit')}>Edit</Button>
        <Button size="small" onClick={() => handleClick('delete')}>Delete</Button>
      </CardActions>
    </Card>
  );
}

BikeCard.propTypes = {
  bike: PropTypes.shape({
    bikerId: PropTypes.number,
    brand: PropTypes.string,
    color: PropTypes.string,
    accessories: PropTypes.string,
  }).isRequired
}
