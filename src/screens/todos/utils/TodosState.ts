import { Dispatch } from 'react';
import { Animated, Keyboard } from 'react-native';

import { todoThunks, todoActions } from '~store/todo';
import { ImportantEnum, TodoDTO } from '~types/todo.types';
import { dispatchSelection } from '~utils/dispatchSelection';

export class TodosState {
  public headerInitHeight = 90;
  public headerInitTopPadding = 80;
  public headerEndTopPadding = 40;
  public scrollAnimatedOffset = 20;
  public modalText = 'Todo was changed. Save changes?';

  scrollY: Animated.Value;
  editingInput: string;
  editingTodos: TodoDTO[];
  isChangeModalOpened: boolean;
  chosenPriority: ImportantEnum | null;
  dispatch: Dispatch<any>;
  setChosenPriority: (arg: ImportantEnum | null) => void;

  constructor(
    scrollY: Animated.Value,
    editingInput: string,
    editingTodos: TodoDTO[],
    isChangeModalOpened: boolean,
    chosenPriority: ImportantEnum | null,
    dispatch: Dispatch<any>,
    setChosenPriority: (arg: ImportantEnum | null) => void,
  ) {
    this.scrollY = scrollY;
    this.editingInput = editingInput;
    this.editingTodos = editingTodos;
    this.chosenPriority = chosenPriority;
    this.isChangeModalOpened = isChangeModalOpened;
    this.dispatch = dispatch;
    this.setChosenPriority = setChosenPriority;
  }

  get editingTodoPriority() {
    return this.editingTodos[0]?.important;
  }

  get isEditingTodoSoleAndUncompleted() {
    return this.editingTodos.length === 1 && this.editingTodos[0].completed === false;
  }

  get editingSoleAndUncompletedTodoId() {
    return this.isEditingTodoSoleAndUncompleted ? this.editingTodos[0].id : null;
  }

  get isEditingTodoChanged() {
    return (
      this.isEditingTodoSoleAndUncompleted &&
      (this.editingInput !== this.editingTodos[0].title ||
        (this.chosenPriority !== null ? this.chosenPriority !== this.editingTodoPriority : false))
    );
  }

  get onScroll() {
    return Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              y: this.scrollY,
            },
          },
        },
      ],
      { useNativeDriver: false },
    );
  }

  onPressHandle = () => {
    Keyboard.dismiss();
    if (this.isEditingTodoSoleAndUncompleted && this.isEditingTodoChanged) {
      this.dispatch(todoActions.todoEditChangeModalModeOn(true));
    } else {
      this.setChosenPriority(null);
      this.dispatch(todoActions.todoEditModeOff());
    }
  };

  agreeModalChangeHandler = () => {
    this.dispatch(
      todoThunks.todoChangeThunk(
        this.editingSoleAndUncompletedTodoId!,
        this.editingInput,
        this.chosenPriority !== null ? this.chosenPriority : this.editingTodoPriority,
      ),
    );
    this.dispatch(todoActions.todoEditChangeModalModeOn(false));
    this.setChosenPriority(null);
  };

  cancelModalChangeHandler = () => {
    this.dispatch(todoActions.todoEditModeOff());
    this.dispatch(todoActions.todoEditChangeModalModeOn(false));
    this.setChosenPriority(null);
  };
}
