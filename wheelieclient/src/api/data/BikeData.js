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

const getBikesByBikerId = (bikerId) => new Promise((resolve, reject) => {
  return getToken().then((token) => {
      axios
      .get(`${dbUrl}/bikes${bikerId}`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      })
      .then((response) => resolve(response.data))
      .catch(reject);
  });
});

const getBike = (id) => new Promise((resolve, reject) => {
    return getToken().then((token) => {
        axios
        .get(`${dbUrl}/bikes/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => resolve(response.data))
        .catch(reject);
    });
});

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

const updateBike = (bike) => new Promise((resolve, reject) => {
    return getToken().then((token) => {
        axios
        .patch(`${dbUrl}/${bike.id}`, bike, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(() => getBikes().then(resolve))
        .catch(reject);
    });
});

const deleteBike = (bike) => new Promise((resolve, reject) => {
    return getToken().then((token) => {
        axios
        .delete(`${dbUrl}/${bike.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(() => getBikes().then(resolve))
        .catch(reject);
    });
});

export {
    getBikes, getBikesByBikerId, getBike, createBike, updateBike, deleteBike
}
