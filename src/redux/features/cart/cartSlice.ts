import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type ProductType } from "../../../components/Product/ProductDetails";

type CartItem = ProductType & { quantity: number };

type CartState = {
  items: CartItem[];
  subtotal: number;
};

const initialState: CartState = {
  items: [],
  subtotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductType>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.subtotal += action.payload.price;
      // this should be of type product
    },
  },
});

export default cartSlice.reducer;
export const { addToCart } = cartSlice.actions;
