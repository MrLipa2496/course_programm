import axios from 'axios';

const httpClient = axios.create({ baseURL: 'http://localhost:5001/api' });

export const createClient = clientData =>
  httpClient.post('/clients', clientData);

export const createBooking = async bookingData => {
  const response = await httpClient.post('/bookings', bookingData);
  return response.data;
};

export const getPopularTours = () => httpClient.get('/tours?limit=3');

export const getTours = (page = 1, limit = 10) =>
  httpClient.get(`/tours?page=${page}&limit=${limit}`);

export const getTourDetails = tourId => httpClient.get(`/tours/${tourId}`);

export const getTransportations = (page = 1, limit = 10) =>
  httpClient.get(`/transportations?page=${page}&limit=${limit}`);

export const getHotels = (page, limit) =>
  httpClient.get(`/hotels?page=${page}&limit=${limit}`);

export const sendReceipt = receiptData =>
  httpClient.post('/send-receipt', receiptData);
