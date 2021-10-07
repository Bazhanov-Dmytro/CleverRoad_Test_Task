import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import userReducer from "./userSlice";

export default configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
  },
});
