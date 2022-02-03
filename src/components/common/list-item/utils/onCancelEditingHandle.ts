import { ImportantEnum } from '~types/todo.types';

export const onCancelEditingHandle = (
  isOneNonCompleteEditing: boolean,
  todoWasChanged: boolean,
  openModal: () => void,
  canelClb: () => void,
  setChosenPriority: (arg: ImportantEnum) => void,
  todoPriority: ImportantEnum,
) => {
  if (isOneNonCompleteEditing && todoWasChanged) {
    openModal();
  } else {
    canelClb();
    setChosenPriority(todoPriority);
  }
};
