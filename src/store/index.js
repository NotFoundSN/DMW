import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { userService } from "./services";

export const store = configureStore({
  reducer: {
    [userService.reducerPath]: userService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userService.middleware),
});

setupListeners(store.dispatch);

export const {
  useLoginMutation,
  useRegisterMutation,
} = userService;