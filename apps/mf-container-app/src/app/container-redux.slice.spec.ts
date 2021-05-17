import {
  fetchContainerRedux,
  containerReduxAdapter,
  containerReduxReducer,
} from './container-redux.slice';

describe('containerRedux reducer', () => {
  it('should handle initial state', () => {
    const expected = containerReduxAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(containerReduxReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchContainerReduxs', () => {
    let state = containerReduxReducer(
      undefined,
      fetchContainerRedux.pending(null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = containerReduxReducer(
      state,
      fetchContainerRedux.fulfilled([{ id: 1 }], null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = containerReduxReducer(
      state,
      fetchContainerRedux.rejected(new Error('Uh oh'), null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    );
  });
});
