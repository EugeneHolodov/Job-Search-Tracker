import { configureStore } from "@reduxjs/toolkit";
import { cardsReducer } from "./slices/cards";
import { authReducer } from "./slices/auth";
import { questionsReducer } from "./slices/questions";

const store = configureStore({
  reducer: {
    cards: cardsReducer,
    auth: authReducer,
    questions: questionsReducer,
  },
});

export default store;
