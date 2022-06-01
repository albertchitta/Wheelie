import axios from 'axios';
import { getToken } from '../authManager';

const dbUrl = 'https://localhost:7108/trails';

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
