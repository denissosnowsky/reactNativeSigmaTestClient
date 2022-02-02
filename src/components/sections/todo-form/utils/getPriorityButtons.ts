import { IconsNames, ImportantEnum } from '~types/todo.types';

export const getPriorityButtons = (
  setPriorityDropdown: (arg: boolean) => void,
  setTemporaryNewPriority: (arg: IconsNames) => void,
  setChosenPriority: (arg: ImportantEnum) => void,
): Array<{ name: IconsNames; action: () => void }> => {
  return [
    {
      name: 'none-priority',
      action: () => {
        setChosenPriority(ImportantEnum.DEFAULT);
        setTemporaryNewPriority('none-priority');
        setPriorityDropdown(false);
      },
    },
    {
      name: 'high-priority',
      action: () => {
        setChosenPriority(ImportantEnum.HIGH);
        setTemporaryNewPriority('high-priority');
        setPriorityDropdown(false);
      },
    },
    {
      name: 'normal-priority',
      action: () => {
        setChosenPriority(ImportantEnum.NORMAL);
        setTemporaryNewPriority('normal-priority');
        setPriorityDropdown(false);
      },
    },
    {
      name: 'low-priority',
      action: () => {
        setChosenPriority(ImportantEnum.LOW);
        setTemporaryNewPriority('low-priority');
        setPriorityDropdown(false);
      },
    },
  ];
};
