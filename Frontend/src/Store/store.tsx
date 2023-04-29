import { configureStore } from "@reduxjs/toolkit";
import crosshairReducer from "./Reducers/crosshair";
import targetsReducer from "./Reducers/targets";
import statusReducer from "./Reducers/status";
import multiplayerGameDetailsReducer from "./Reducers/multiplayerGameDetails";
import browserReducer from "./Reducers/browser";
//global state
export const store = configureStore({
  reducer: {
    crosshair: crosshairReducer,
    target: targetsReducer,
    status: statusReducer,
    multiplayerGameDetails: multiplayerGameDetailsReducer,
    browser: browserReducer,
  },
});

//creating types for useDispatch and useSelector with types for ez access
export type stateType = ReturnType<typeof store.getState>;
export type dispatchType = typeof store.dispatch;

export const appDispatch = store.dispatch;
