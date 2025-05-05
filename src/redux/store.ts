// Redux store setup file
// Create a Redux store for global state management
import { configureStore } from "@reduxjs/toolkit";
// import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";

import authModalReducer from "@/redux/features/auth/auth-slice";
import modalReducer from "@/redux/features/modal/modal-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      authModal: authModalReducer,
      modal: modalReducer,
    },
  });
};

// export const persistor = persistStore(makeStore());

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
