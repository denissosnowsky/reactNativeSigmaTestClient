import { ImportantEnum } from '~types/todo.types';

export const onCancelEditingHandle = (
  isEditingTodoSoleAndUncompleted: boolean,
  todoWasChanged: boolean,
  openModal: () => void,
  canelClb: () => void,
  setChosenPriority: (arg: ImportantEnum | null) => void,
  todoPriority: ImportantEnum | null,
) => {
  if (isEditingTodoSoleAndUncompleted && todoWasChanged) {
    openModal();
  } else {
    canelClb();
    setChosenPriority(todoPriority);
  }
};
