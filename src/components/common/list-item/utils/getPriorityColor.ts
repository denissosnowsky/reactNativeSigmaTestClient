import { ImportantEnum } from '~types/todo.types';

import globalStyles from '~global/constants.style';

export const getPriorityColor = (priority: ImportantEnum) => {
  switch (priority) {
    case ImportantEnum.HIGH:
      return globalStyles.HIGH_P_COLOR;
    case ImportantEnum.NORMAL:
      return globalStyles.NORMAL_P_COLOR;
    case ImportantEnum.LOW:
      return globalStyles.LOW_P_COLOR;
    case ImportantEnum.DEFAULT:
    default:
      return globalStyles.WHITE_COLOR;
  }
};
