import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./Auth/RegisterSlice";
import loginReducer from "./Auth/LoginSlice";
import userReducer from "./Auth/userSlice";
import contactReducer from './Contact/ContactSlice'

const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    user: userReducer,
    contact: contactReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // This disables the serializable check
    }).concat(),
});
export default store;
