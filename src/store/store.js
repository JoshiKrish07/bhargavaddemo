
import { configureStore } from '@reduxjs/toolkit';
import auctionReducer from './slices/auctionSlices';
import authReducer from './slices/authSlices';
import bidDisplay from './slices/bidDisplaySlice';

const store = configureStore({
  reducer: {
    auction: auctionReducer,
    auth: authReducer,
    biddisplay: bidDisplay
  },
});

export default store;
