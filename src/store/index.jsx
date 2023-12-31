
// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./slices/userSlice";
import GetUserReducer from '../features/UserSlice';
import storage from 'redux-persist/lib/storage';
// import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';



const persistConfig = {
    key: 'root',
    storage
}
const persistedReducer = persistReducer(persistConfig, GetUserReducer)


export const store = configureStore({
    reducer: {user : persistedReducer},
    // eslint-disable-next-line no-undef
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
});

export const persistor = persistStore(store)


// export const store = configureStore({
//     reducer: {
//         user: GetUserReducer,
//     },
// });