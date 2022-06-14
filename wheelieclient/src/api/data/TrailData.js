import axios from 'axios';
import { getToken } from '../authManager';

const dbUrl = 'https://localhost:7108/trails';

// Get all trails for explore page
const getTrails = () => new Promise((resolve, reject) => {
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

// Get trails for biker's trail page
const getTrailsByBikerId = (bikerId) => new Promise((resolve, reject) => {
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

// Get trail info
const getTrail = (firebaseUserId) => new Promise((resolve, reject) => {
    return getToken().then((token) => {
        axios
        .get(`${dbUrl}/${firebaseUserId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => resolve(response.data))
        .catch(reject);
    });
});

// Create a new trail for explore page
const createTrail = (trail) => new Promise((resolve, reject) => {
    return getToken().then((token) => {
        axios
        .post(dbUrl, trail, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => resolve(response.data))
        .catch(reject);
    });
});

// Update trail info
const updateTrail = (trail) => new Promise((resolve, reject) => {
    return getToken().then((token) => {
        axios
        .patch(`${dbUrl}/${trail.id}`, trail, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(() => getTrails().then(resolve))
        .catch(reject);
    });
});

// Delete trail
const deleteTrail = (trail) => new Promise((resolve, reject) => {
    return getToken().then((token) => {
        axios
        .delete(`${dbUrl}/${trail.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(() => getTrails().then(resolve))
        .catch(reject);
    });
});

export {
    getTrails, getTrailsByBikerId, getTrail, createTrail, updateTrail, deleteTrail
}
