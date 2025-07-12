import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type ProductType } from "../../../components/Product/ProductDetails";

type CartItem = ProductType & { quantity: number };

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
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
      // this should be of type product
    },
  },
});

export default cartSlice.reducer;
export const { addToCart } = cartSlice.actions;
