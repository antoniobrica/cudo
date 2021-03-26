import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const CONTAINER_REDUX_FEATURE_KEY = 'containerRedux';

/*
 * Update these interfaces according to your requirements.
 */
export interface ContainerReduxEntity {
  id: number;
}

export interface ContainerReduxState extends EntityState<ContainerReduxEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
}

export const containerReduxAdapter = createEntityAdapter<
  ContainerReduxEntity
>();

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchContainerRedux())
 * }, [dispatch]);
 * ```
 */
export const fetchContainerRedux = createAsyncThunk(
  'containerRedux/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getContainerReduxs()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialContainerReduxState: ContainerReduxState = containerReduxAdapter.getInitialState(
  {
    loadingStatus: 'not loaded',
    error: null,
  }
);

export const containerReduxSlice = createSlice({
  name: CONTAINER_REDUX_FEATURE_KEY,
  initialState: initialContainerReduxState,
  reducers: {
    add: containerReduxAdapter.addOne,
    remove: containerReduxAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContainerRedux.pending, (state: ContainerReduxState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchContainerRedux.fulfilled,
        (
          state: ContainerReduxState,
          action: PayloadAction<ContainerReduxEntity[]>
        ) => {
          containerReduxAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(
        fetchContainerRedux.rejected,
        (state: ContainerReduxState, action) => {
          state.loadingStatus = 'error';
          state.error = action.error.message;
        }
      );
  },
});

/*
 * Export reducer for store configuration.
 */
export const containerReduxReducer = containerReduxSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(containerReduxActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const containerReduxActions = containerReduxSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllContainerRedux);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = containerReduxAdapter.getSelectors();

export const getContainerReduxState = (
  rootState: unknown
): ContainerReduxState => rootState[CONTAINER_REDUX_FEATURE_KEY];

export const selectAllContainerRedux = createSelector(
  getContainerReduxState,
  selectAll
);

export const selectContainerReduxEntities = createSelector(
  getContainerReduxState,
  selectEntities
);
