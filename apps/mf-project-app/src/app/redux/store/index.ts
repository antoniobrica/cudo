import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'

// import { reducers, Logger, rootSaga, sagaMiddleware } from './reducer'
import {reducers} from '../reducer'

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['app', 'users']
}

 const persistedReducer = persistReducer(persistConfig, reducers)

const config = () => {
  const store = createStore(
    persistedReducer,
    // compose(
    //   // applyMiddleware(sagaMiddleware),
    //   window.devToolsExtension ? window.devToolsExtension() : f => f
    // )
  )
  const persistor = persistStore(store)

  // sagaMiddleware.run(rootSaga)

  return { store, persistor }
}

export default config
