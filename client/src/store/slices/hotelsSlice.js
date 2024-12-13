import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from '../../api';
import CONSTANTS from '../../utils/constants';

const initialState = {
  hotels: [],
  isFetching: false,
  error: null,
  totalHotels: 0,
};

export const getHotelsThunk = createAsyncThunk(
  `${CONSTANTS.HOTELS_SLICE_NAME}/get`,
  async ({ page = 1, limit = 10 }, thunkAPI) => {
    try {
      const {
        data: { data, total },
      } = await API.getHotels(page, limit);

      return { hotels: data, totalHotels: total };
    } catch (err) {
      return thunkAPI.rejectWithValue({
        status: err.response?.status || 500,
        message: err.response?.data?.errors || 'Unknown error',
      });
    }
  }
);

const HotelsSlice = createSlice({
  name: CONSTANTS.HOTELS_SLICE_NAME,
  initialState,
  extraReducers: builder => {
    // getHotels
    builder.addCase(getHotelsThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
      state.hotels = [];
    });
    builder.addCase(getHotelsThunk.fulfilled, (state, action) => {
      state.isFetching = false;
      state.hotels = [...state.hotels, ...action.payload.hotels];
      state.totalHotels = action.payload.totalHotels;
    });
    builder.addCase(getHotelsThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });
  },
});

const { reducer } = HotelsSlice;

export default reducer;
