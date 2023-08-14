import { configureStore } from '@reduxjs/toolkit';

import userSlice from './features/User/userSlice';
import cartSlice from './features/Cart/cartSlice';

const store = configureStore({ reducer: { user: userSlice, cart: cartSlice } });

export default store;
