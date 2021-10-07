import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { app } from "../firebase";

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await app
    .firestore()
    .collection("products")
    .where("user", "==", app.auth().currentUser.uid)
    .get();

  const resp = [];
  response.forEach((p) => {
    const data = p.data();
    data["id"] = p.id;
    resp.push(data);
  });
  return resp;
});

export const productSlice = createSlice({
  name: "product",
  initialState: {
    productList: [],
    name: "",
    description: "",
    discountExpires: "",
    discount: "",
    price: "",
    image: null,
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setDiscountExpires: (state, action) => {
      state.discountExpires = action.payload;
    },
    setDiscount: (state, action) => {
      state.discount = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.productList = action.payload;
    });
  },
});

export const {
  setName,
  setDescription,
  setDiscountExpires,
  setDiscount,
  setImage,
  setPrice,
} = productSlice.actions;

export default productSlice.reducer;
