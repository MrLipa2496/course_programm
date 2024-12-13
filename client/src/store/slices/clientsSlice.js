import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from '../../api';
import CONSTANTS from '../../utils/constants';

const initialState = {
  clients: [],
  isFetching: false,
  error: null,
  totalClients: 0,
};

// Thunk для отримання клієнтів
export const getClientsThunk = createAsyncThunk(
  `${CONSTANTS.CLIENTS_SLICE_NAME}/get`,
  async ({ page = 1, limit = 10 }, thunkAPI) => {
    try {
      const {
        data: { data, total },
      } = await API.getClients(page, limit);

      return { clients: data, totalClients: total };
    } catch (err) {
      return thunkAPI.rejectWithValue({
        status: err.response?.status || 500,
        message: err.response?.data?.errors || 'Unknown error',
      });
    }
  }
);

// Thunk для створення клієнта
export const createClientThunk = createAsyncThunk(
  `${CONSTANTS.CLIENTS_SLICE_NAME}/create`,
  async (clientData, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await API.createClient(clientData);

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
const ClientsSlice = createSlice({
  name: CONSTANTS.CLIENTS_SLICE_NAME,
  initialState,
  extraReducers: builder => {
    // getClients
    builder.addCase(getClientsThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getClientsThunk.fulfilled, (state, action) => {
      state.isFetching = false;
      state.clients = action.payload.clients;
      state.totalClients = action.payload.totalClients;
    });
    builder.addCase(getClientsThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });

    // createClient
    builder.addCase(createClientThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(createClientThunk.fulfilled, (state, action) => {
      state.isFetching = false;
      state.clients = [action.payload, ...state.clients];
    });
    builder.addCase(createClientThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });
  },
});

const { reducer } = ClientsSlice;

export default reducer;
