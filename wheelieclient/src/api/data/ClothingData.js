import axios from 'axios';
import { getToken } from '../authManager';

const dbUrl = 'https://localhost:7108/clothings';

const getClothings = () => new Promise((resolve, reject) => {
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

// Get clothings by bikerId
const getClothingsByBikerId = (bikerId) => new Promise((resolve, reject) => {
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

// Get clothing info
const getClothing = (id) => new Promise((resolve, reject) => {
    return getToken().then((token) => {
        axios
        .get(`${dbUrl}/clothings/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => resolve(response.data))
        .catch(reject);
    });
});

// Create clothing item
const createClothing = (clothing) => new Promise((resolve, reject) => {
    return getToken().then((token) => {
        axios
        .post(dbUrl, clothing, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => resolve(response.data))
        .catch(reject);
    });
});

// Update clothing info
const updateClothing = (clothing) => new Promise((resolve, reject) => {
    return getToken().then((token) => {
        axios
        .patch(`${dbUrl}/${clothing.id}`, clothing, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(() => getClothings().then(resolve))
        .catch(reject);
    });
});

// Delete clothing item
const deleteClothing = (clothing) => new Promise((resolve, reject) => {
    return getToken().then((token) => {
        axios
        .delete(`${dbUrl}/${clothing.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(() => getClothings().then(resolve))
        .catch(reject);
    });
});

export {
    getClothings, getClothingsByBikerId, getClothing, createClothing, updateClothing, deleteClothing
}
