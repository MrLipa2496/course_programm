import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from '../../api';
import CONSTANTS from '../../utils/constants';

const initialState = {
  transportations: [],
  isFetching: false,
  error: null,
  totalTransportations: 0,
};

export const getTransportationsThunk = createAsyncThunk(
  `${CONSTANTS.TRANSPORTATION_SLICE_NAME}/get`,
  async ({ page = 1, limit = 10 }, thunkAPI) => {
    try {
      const {
        data: { data, total },
      } = await API.getTransportations(page, limit);
      return { transportations: data, totalTransportations: total };
    } catch (err) {
      return thunkAPI.rejectWithValue({
        status: err.response?.status || 500,
        message: err.response?.data?.errors || 'Unknown error',
      });
    }
  }
);

const TransportationSlice = createSlice({
  name: CONSTANTS.TRANSPORTATION_SLICE_NAME,
  initialState,
  extraReducers: builder => {
    // getTransportations
    builder.addCase(getTransportationsThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getTransportationsThunk.fulfilled, (state, action) => {
      state.isFetching = false;
      state.transportations = [
        ...state.transportations,
        ...action.payload.transportations,
      ];
      state.totalTransportations = action.payload.totalTransportations;
    });
    builder.addCase(getTransportationsThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });
  },
});

const { reducer } = TransportationSlice;

export default reducer;
