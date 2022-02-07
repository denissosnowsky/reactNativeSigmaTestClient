import { ImportantEnum } from '~types/todo.types';

export const onCancelEditingHandle = (
  isOneNonCompleteEditing: boolean,
  todoWasChanged: boolean,
  openModal: () => void,
  canelClb: () => void,
  setChosenPriority: (arg: ImportantEnum | null) => void,
  todoPriority: ImportantEnum | null,
) => {
  if (isOneNonCompleteEditing && todoWasChanged) {
    openModal();
  } else {
    canelClb();
    setChosenPriority(todoPriority);
  }
};
