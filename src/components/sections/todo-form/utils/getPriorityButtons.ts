import { IconsNames, ImportantEnum } from '~types/todo.types';

export const getPriorityButtons = (
  setChosenPriority: (arg: ImportantEnum) => void,
): Array<{ name: string; icon: IconsNames; action: () => void }> => {
  return [
    {
      name: 'none-priority',
      icon: 'none-priority',
      action: () => {
        setChosenPriority(ImportantEnum.DEFAULT);
      },
    },
    {
      name: 'high-priority',
      icon: 'high-priority',
      action: () => {
        setChosenPriority(ImportantEnum.HIGH);
      },
    },
    {
      name: 'normal-priority',
      icon: 'normal-priority',
      action: () => {
        setChosenPriority(ImportantEnum.NORMAL);
      },
    },
    {
      name: 'low-priority',
      icon: 'low-priority',
      action: () => {
        setChosenPriority(ImportantEnum.LOW);
      },
    },
  ];
};
