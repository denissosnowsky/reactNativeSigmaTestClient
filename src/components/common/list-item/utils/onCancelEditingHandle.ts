import { ImportantEnum } from '~types/todo.types';

export const onCancelEditingHandle = (
  isEditingTodoSoleAndUncompleted: boolean,
  todoWasChanged: boolean,
  openModal: () => void,
  cancelEdition: () => void,
  setChosenPriority: (arg: ImportantEnum | null) => void,
  todoPriority: ImportantEnum | null,
) => {
  if (isEditingTodoSoleAndUncompleted && todoWasChanged) {
    openModal();
  } else {
    cancelEdition();
    setChosenPriority(todoPriority);
  }
};
