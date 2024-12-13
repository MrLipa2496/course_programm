import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from '../../api';
import CONSTANTS from '../../utils/constants';

const initialState = {
  bookings: [],
  isFetching: false,
  error: null,
  totalBookings: 0,
};

export const getBookingsThunk = createAsyncThunk(
  `${CONSTANTS.BOOKINGS_SLICE_NAME}/get`,
  async ({ page = 1, limit = 10 }, thunkAPI) => {
    try {
      const {
        data: { data, total },
      } = await API.getBookings(page, limit);

      return { bookings: data, totalBookings: total };
    } catch (err) {
      return thunkAPI.rejectWithValue({
        status: err.response?.status || 500,
        message: err.response?.data?.errors || 'Unknown error',
      });
    }
  }
);

export const createBookingThunk = createAsyncThunk(
  `${CONSTANTS.BOOKINGS_SLICE_NAME}/create`,
  async (bookingData, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await API.createBooking(bookingData);

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue({
        status: err.response?.status || 500,
        message: err.response?.data?.errors || 'Unknown error',
      });
    }
  }
);

// Створення слайсу
const BookingsSlice = createSlice({
  name: CONSTANTS.BOOKINGS_SLICE_NAME,
  initialState,
  extraReducers: builder => {
    // getBookings
    builder.addCase(getBookingsThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getBookingsThunk.fulfilled, (state, action) => {
      state.isFetching = false;
      state.bookings = action.payload.bookings;
      state.totalBookings = action.payload.totalBookings;
    });
    builder.addCase(getBookingsThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });

    // createBooking
    builder.addCase(createBookingThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(createBookingThunk.fulfilled, (state, action) => {
      state.isFetching = false;
      state.bookings = [action.payload, ...state.bookings];
    });
    builder.addCase(createBookingThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });
  },
});

const { reducer } = BookingsSlice;

export default reducer;
