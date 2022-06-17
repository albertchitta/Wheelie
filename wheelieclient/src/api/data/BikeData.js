import axios from 'axios';
import { getToken } from '../authManager';

const dbUrl = 'https://localhost:7108/bikes';

const getBikes = () => new Promise((resolve, reject) => {
    return getToken().then((token) => {
        axios
        .get(`${dbUrl}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => resolve(response.data))
        .catch(reject);
    });
});

// Get bikes by bikerId
const getBikesByBikerId = (bikerId) => new Promise((resolve, reject) => {
  return getToken().then((token) => {
      axios
      .get(`${dbUrl}/biker${bikerId}`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      })
      .then((response) => resolve(response.data))
      .catch(reject);
  });
});

// Get details on a bike
const getBike = (id) => new Promise((resolve, reject) => {
    return getToken().then((token) => {
        axios
        .get(`${dbUrl}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => resolve(response.data))
        .catch(reject);
    });
});

// Create a new bike
const createBike = (bike) => new Promise((resolve, reject) => {
    return getToken().then((token) => {
        axios
        .post(dbUrl, bike, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => resolve(response.data))
        .catch(reject);
    });
});

// Update bike info
const updateBike = (bike) => new Promise((resolve, reject) => {
    return getToken().then((token) => {
        axios
        .patch(`${dbUrl}/${bike.id}`, bike, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(() => getBikesByBikerId(bike.bikerId).then(resolve))
        .catch(reject);
    });
});

// Delete bike
const deleteBike = (bike) => new Promise((resolve, reject) => {
    return getToken().then((token) => {
        axios
        .delete(`${dbUrl}/${bike.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(() => getBikesByBikerId(bike.bikerId).then(resolve))
        .catch(reject);
    });
});

export {
    getBikes, getBikesByBikerId, getBike, createBike, updateBike, deleteBike
}
