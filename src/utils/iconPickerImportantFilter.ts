import { ImportantEnum } from '~types/todo.types';

export const iconPickerImportantFilter = (importantFilterMode: ImportantEnum) => {
  switch (importantFilterMode) {
    case ImportantEnum.DEFAULT:
      return 'none-priority';
    case ImportantEnum.HIGH:
      return 'high-priority';
    case ImportantEnum.NORMAL:
      return 'normal-priority';
    case ImportantEnum.LOW:
    default:
      return 'low-priority';
  }
};
