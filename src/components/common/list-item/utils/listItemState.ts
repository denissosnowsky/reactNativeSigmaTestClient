import { Dispatch } from 'react';

import { todoThunks, todoActions } from '~store/todo';
import { ImportantEnum, TodoDTO } from '~types/todo.types';
import { dispatchSelection } from '~utils/dispatchSelection';
import { onCancelEditingHandle } from './onCancelEditingHandle';
import { onSelectHandler } from './onSelectHandler';

export class ListItemState {
  isCompleted: boolean;
  isEdiditngMode: boolean;
  inputValue: string;
  editingTodos: TodoDTO[];
  chosenPriority: ImportantEnum | null;
  id: number;
  dispatch: Dispatch<unknown>;
  setChosenPriority: (arg: ImportantEnum | null) => void;

  constructor(
    isCompleted: boolean,
    chosenPriority: ImportantEnum | null,
    inputValue: string,
    isEdiditngMode: boolean,
    editingTodos: TodoDTO[],
    id: number,
    dispatch: Dispatch<unknown>,
    setChosenPriority: (arg: ImportantEnum | null) => void,
  ) {
    this.isCompleted = isCompleted;
    this.chosenPriority = chosenPriority;
    this.inputValue = inputValue;
    this.isEdiditngMode = isEdiditngMode;
    this.editingTodos = editingTodos;
    this.id = id;
    this.dispatch = dispatch;
    this.setChosenPriority = setChosenPriority;
  }

  get isMultipleEditingMode() {
    return this.editingTodos.length > 1 && this.isEdiditngMode;
  }

  get isCurrentItemEditing() {
    return this.editingTodos.some((todo) => todo.id === this.id);
  }

  get isIdShouldBeShown() {
    return this.isCompleted || !this.isCurrentItemEditing || this.isMultipleEditingMode;
  }

  get isUncompletedAndSoleEditingMode() {
    return this.isCurrentItemEditing && !this.isCompleted && !this.isMultipleEditingMode;
  }

  get isTodoSelectedOrCompleted() {
    return (
      (this.isCompleted && !this.isMultipleEditingMode) ||
      (this.isCurrentItemEditing && this.isMultipleEditingMode)
    );
  }

  get isEditingTodoSoleAndUncompleted() {
    return !this.isMultipleEditingMode && this.editingTodos[0]?.completed === false;
  }

  get editingTodoPriority() {
    return this.editingTodos[0]?.important;
  }

  get isEditingTodoChanged() {
    return (
      this.isEditingTodoSoleAndUncompleted &&
      (this.inputValue !== this.editingTodos[0].title ||
        (this.chosenPriority !== null ? this.chosenPriority !== this.editingTodoPriority : false))
    );
  }

  onEditingOffHandler = () => {
    return onCancelEditingHandle(
      this.isEditingTodoSoleAndUncompleted,
      this.isEditingTodoChanged,
      dispatchSelection(this.dispatch, todoActions.todoEditChangeModalModeOn(true)),
      dispatchSelection(this.dispatch, todoActions.todoEditModeOff()),
      this.setChosenPriority,
      null,
      this.changeFormInput,
    );
  };

  onSelectTodoHandler = () => {
    onSelectHandler(
      this.isMultipleEditingMode,
      this.isCurrentItemEditing,
      dispatchSelection(this.dispatch, todoActions.todoDeselectOn(this.id)),
      dispatchSelection(this.dispatch, todoActions.todoSelectOn(this.id)),
      this.onEditingOffHandler,
    );
  };

  onCheckPressTodoHandle = () => {
    this.dispatch(todoThunks.todoCompleteThunk(this.id));
  };

  onLongPressTodoHandle = () => {
    this.dispatch(todoActions.todoEditModeOn(this.id));
  };

  onInputChangeHandler = (value: string) => {
    this.dispatch(todoActions.todoEditingInputChange(value));
  };

  changeFormInput = (value: string) => {
    this.dispatch(todoActions.todoFormInputChange(value));
  };
}
