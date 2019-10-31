import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createMigrate, persistStore, persistReducer } from "redux-persist";
import reducer from "../reducers";
// import devTools from "remote-redux-devtools";
import storage from 'redux-persist/lib/storage'


// const migrations = {
//     // Added nativeCurrency & nativeCurrencySymbol initialValues
//     0: (state) => {
//         return {
//             ...state,
//             settings: {
//             ...state.settings,
//             nativeCurrency: 'USD',
//             nativeCurrencySymbol: '$',
//             }
//         }
//     }
// }

const persistConfig = {
  key: 'root',
  version: 0,
  storage,
  // migrate: createMigrate(migrations, {debug: false}),
}

const persistedReducer = persistReducer(persistConfig, reducer);

export default function configureStore(onCompletion: () => void): any {
  const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      }) : compose;

  const enhancer = composeEnhancers(
    applyMiddleware(thunk),
    // devTools({
    //   name: "MyApp",
    //   realtime: true
    // })
  );

  let store = createStore(persistedReducer, enhancer);
  let persistor = persistStore(store, null, onCompletion);
  // persistor.purge()
  return store;
}