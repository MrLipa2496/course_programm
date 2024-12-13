import { configureStore } from '@reduxjs/toolkit';
import toursReducer from './slices/toursSlice';
import transportsReduser from './slices/transportsSlice';
import hotelsReduser from './slices/hotelsSlice';
import bookingsReducer from './slices/bookingsSlice';
import clientsReducer from './slices/clientsSlice';

const store = configureStore({
  reducer: {
    toursData: toursReducer,
    transportData: transportsReduser,
    hotelsData: hotelsReduser,
    bookingsData: bookingsReducer,
    clientsData: clientsReducer,
  },
});

export default store;
