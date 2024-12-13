import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from './../../api';
import CONSTANTS from '../../utils/constants';

const initialState = {
  tours: [],
  isFetching: false,
  error: null,
  totalTours: 0,
};

export const getToursThunk = createAsyncThunk(
  `${CONSTANTS.TOURS_SLICE_NAME}/get`,
  async ({ page = 1, limit = 10 }, thunkAPI) => {
    try {
      const {
        data: { data, total },
      } = await API.getTours(page, limit);
      return { tours: data, totalTours: total };
    } catch (err) {
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.response.data.errors,
      });
    }
  }
);

export const getPopularToursThunk = createAsyncThunk(
  `${CONSTANTS.TOURS_SLICE_NAME}/get?limit=3`,
  async (payload, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await API.getPopularTours();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.response.data.errors,
      });
    }
  }
);

const ToursSlice = createSlice({
  name: CONSTANTS.TOURS_SLICE_NAME,
  initialState,
  extraReducers: builder => {
    // getTours
    builder.addCase(getToursThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getToursThunk.fulfilled, (state, action) => {
      state.isFetching = false;
      state.tours = [...state.tours, ...action.payload.tours];
      state.totalTours = action.payload.totalTours;
    });
    builder.addCase(getToursThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });
    // getPopularTours (3)
    builder.addCase(getPopularToursThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getPopularToursThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.tours = [...payload];
    });
    builder.addCase(getPopularToursThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });
  },
});

const { reducer } = ToursSlice;

export default reducer;
