import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
// import thunk from 'redux-thunk'
import storage from 'redux-persist/es/storage'

// import { reducers, Logger, rootSaga, sagaMiddleware } from './reducer'
import {reducers} from '../reducer'

const persistConfig = {
  key: 'document',
  storage: storage,
  whitelist: ['app']
}

 const persistedReducer = persistReducer(persistConfig, reducers)

const config = () => {
  const store = createStore(
    persistedReducer,
    // compose(
    //   // applyMiddleware(sagaMiddleware)
    //   // applyMiddleware(thunk)    
    // )
  )
  const persistor = persistStore(store)

  // sagaMiddleware.run(rootSaga)

  return { store, persistor }
}

export default config
