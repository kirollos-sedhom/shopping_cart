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
      // the payload is the whole item, because i will need to add the item itself to my cart
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.subtotal = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      // this should be of type product
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      // the payload is just the id. i don't need more than that
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.subtotal = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    incrementCount: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );

      if (existingItem) {
        existingItem.quantity += 1;
      }
      state.subtotal = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    decrementCount: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );
        }
      }
      state.subtotal = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, incrementCount, decrementCount } =
  cartSlice.actions;
