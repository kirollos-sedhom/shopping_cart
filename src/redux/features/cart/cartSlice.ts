import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type ProductType } from "../../../components/Product/ProductDetails";
import type { RootState } from "../../app/store";

type CartItem = ProductType & { quantity: number };

type CartState = {
  items: CartItem[];
  subtotal: number;
};
const localStorageItemsRaw = localStorage.getItem("items");
const localStorageItems = localStorageItemsRaw
  ? JSON.parse(localStorageItemsRaw)
  : [];

const localStorageSubtotalRaw = localStorage.getItem("subtotal");
const localStorageSubtotal = localStorageSubtotalRaw
  ? parseFloat(localStorageSubtotalRaw)
  : 0;
const initialState: CartState = {
  items: localStorageItems,
  subtotal: localStorageSubtotal,
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
      state.subtotal = calculateSubtotal(state.items);
      // this should be of type product

      addToLocalStorage(state.items, state.subtotal);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      // the payload is just the id. i don't need more than that
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.subtotal = calculateSubtotal(state.items);

      addToLocalStorage(state.items, state.subtotal);
    },

    incrementCount: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );

      if (existingItem) {
        existingItem.quantity += 1;
      }
      state.subtotal = calculateSubtotal(state.items);
      addToLocalStorage(state.items, state.subtotal);
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
      state.subtotal = calculateSubtotal(state.items);
      addToLocalStorage(state.items, state.subtotal);
    },
  },
});

function calculateSubtotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

function addToLocalStorage(items: CartItem[], subtotal: number) {
  localStorage.setItem("items", JSON.stringify(items));
  localStorage.setItem("subtotal", subtotal.toString());
}

export default cartSlice.reducer;
export const { addToCart, removeFromCart, incrementCount, decrementCount } =
  cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartSubtotal = (state: RootState) => state.cart.subtotal;
export const selectCartItemCount = (state: RootState) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);
