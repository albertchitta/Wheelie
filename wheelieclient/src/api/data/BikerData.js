import axios from 'axios';
import { getToken } from '../authManager';

const dbUrl = 'https://localhost:7108/bikers';

const getBikers = () => new Promise((resolve, reject) => {
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

const getBiker = (firebaseUserId) => new Promise((resolve, reject) => {
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

const createBiker = (biker) => new Promise((resolve, reject) => {
    return getToken().then((token) => {
        axios
        .post(dbUrl, biker, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => resolve(response.data))
        .catch(reject);
    });
});

const updateBiker = (biker) => new Promise((resolve, reject) => {
    return getToken().then((token) => {
        axios
        .patch(`${dbUrl}/${biker.firebaseUserId}`, biker, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(() => getBikers().then(resolve))
        .catch(reject);
    });
});

const deleteBiker = (biker) => new Promise((resolve, reject) => {
    return getToken().then((token) => {
        axios
        .delete(`${dbUrl}/${biker.firebaseUserId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(() => getBikers().then(resolve))
        .catch(reject);
    });
});

export {
    getBikers, getBiker, createBiker, updateBiker, deleteBiker
}
