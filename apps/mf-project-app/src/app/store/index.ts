import {configureStore} from '@reduxjs/toolkit'
import projectAppReducer from '../reducer/app/project.app.reducer'

const store = configureStore({
    reducer: { projects: projectAppReducer },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

