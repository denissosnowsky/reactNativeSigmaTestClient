import { onSelectHandler } from '../onSelectHandler';

describe('onSelectHandler', () => {
  it('onSelectHandler should fire deselect when current item is ediditng in multiple ediditng mode', () => {
    // Getting
    const deselectMockCallback = jest.fn();
    const selectMockCallback = jest.fn();
    const isMultipleEditing = true;
    const isCurrentItemEditing = true;
    // When
    onSelectHandler(
      isMultipleEditing,
      isCurrentItemEditing,
      deselectMockCallback,
      selectMockCallback,
    );
    // Then
    expect(deselectMockCallback).toHaveBeenCalled();
  });

  it('onSelectHandler should fire select when current item is ediditng in multiple ediditng mode', () => {
    // Getting
    const deselectMockCallback = jest.fn();
    const selectMockCallback = jest.fn();
    const isMultipleEditing = true;
    const isCurrentItemEditing = false;
    // When
    onSelectHandler(
      isMultipleEditing,
      isCurrentItemEditing,
      deselectMockCallback,
      selectMockCallback,
    );
    // Then
    expect(selectMockCallback).toHaveBeenCalled();
  });

  it('onSelectHandler shouldn"t fire any callback in non-multiple ediditng mode', () => {
    // Getting
    const deselectMockCallback = jest.fn();
    const selectMockCallback = jest.fn();
    const isMultipleEditing = false;
    const isCurrentItemEditing = false;
    // When
    onSelectHandler(
      isMultipleEditing,
      isCurrentItemEditing,
      deselectMockCallback,
      selectMockCallback,
    );
    // Then
    expect(deselectMockCallback).not.toHaveBeenCalled();
    expect(selectMockCallback).not.toHaveBeenCalled();
  });
});
