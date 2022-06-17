/* eslint-disable no-restricted-globals */
import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { deleteClothing } from '../api/data/ClothingData';

export default function ClothingCard({ clothing, clothings, setClothings, biker }) {
  const navigate = useNavigate();
  const set = clothings.indexOf(clothing) + 1;

  const handleClick = (method) => {
    if (method === 'delete') {
      const del = confirm(`Are you sure you want to delete Clothing Set #${set}?`);

      if (del) {
        deleteClothing(clothing).then(setClothings);
      } else {
        navigate(`/edit-clothing/${clothing.id}`)
      }
    }
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Clothing Set #{set}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Jersey: {clothing.jersey}
          <br />
          Sunglasses: {clothing.goggles}
          <br />
          Shoes: {clothing.shoes}
          <br />
          Helmet: {clothing.helmet}
          <br />
          Other: {clothing.other}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleClick('edit')}>Edit</Button>
        <Button size="small" onClick={() => handleClick('delete')}>Delete</Button>
      </CardActions>
    </Card>
  );
}

ClothingCard.propTypes = {
  clothing: PropTypes.shape({
    bikerId: PropTypes.number,
    jersey: PropTypes.string,
    goggles: PropTypes.string,
    shoes: PropTypes.string,
    helmet: PropTypes.string,
    other: PropTypes.string,
  }).isRequired
}
