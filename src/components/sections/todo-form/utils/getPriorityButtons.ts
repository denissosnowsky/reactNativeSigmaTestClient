import { IconsNames, ImportantEnum } from '~types/todo.types';

export const getPriorityButtons = (
  setPriorityDropdown: (arg: boolean) => void,
  setChosenPriority: (arg: ImportantEnum) => void,
): Array<{ name: IconsNames; action: () => void }> => {
  return [
    {
      name: 'none-priority',
      action: () => {
        setChosenPriority(ImportantEnum.DEFAULT);
        setPriorityDropdown(false);
      },
    },
    {
      name: 'high-priority',
      action: () => {
        setChosenPriority(ImportantEnum.HIGH);
        setPriorityDropdown(false);
      },
    },
    {
      name: 'normal-priority',
      action: () => {
        setChosenPriority(ImportantEnum.NORMAL);
        setPriorityDropdown(false);
      },
    },
    {
      name: 'low-priority',
      action: () => {
        setChosenPriority(ImportantEnum.LOW);
        setPriorityDropdown(false);
      },
    },
  ];
};
