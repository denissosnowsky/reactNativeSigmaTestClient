import { fetchNextPage } from '../fetchNextPage';

describe('FetchNextPage util', () => {
  it('fetchNextPage should fire the callback', () => {
    // Given
    const isCanLoadMorePages = true;
    const dispatch = jest.fn();
    // When
    fetchNextPage(isCanLoadMorePages, dispatch)();
    // Then
    expect(dispatch).toHaveBeenCalled();
  });

  it('fetchNextPage shouldn"t fire the callback', () => {
    // Given
    const isCanLoadMorePages = false;
    const dispatch = jest.fn();
    // When
    fetchNextPage(isCanLoadMorePages, dispatch)();
    // Then
    expect(dispatch).not.toHaveBeenCalled();
  });
});
