import { TodoButtonsNameType, IconsNames } from '~types/todo.types';
import globalStyles from '~global/constants.style';

export const iconNamePicker = (buttonVariant: IconsNames): IconNamePickerReturn => {
  switch (buttonVariant) {
    case 'add':
      return { name: 'plus-circle', color: globalStyles.SUCCESS_COLOR };
    case 'delete':
      return { name: 'delete-circle', color: globalStyles.DELETE_COLOR };
    case 'save':
      return { name: 'content-save', color: globalStyles.LIGHT_MAIN_COLOR };
    case 'select-all':
      return {
        name: 'checkbox-multiple-marked-circle',
        color: globalStyles.SUCCESS_COLOR,
      };
    case 'default-hide':
      return { name: 'circle-off-outline', color: globalStyles.ICON_DEF_COLOR };
    case 'filter-opened':
      return { name: 'filter-menu-outline', color: globalStyles.ICON_DEF_COLOR };
    case 'filter-closed':
      return { name: 'filter', color: globalStyles.ICON_DEF_COLOR };
    case 'down':
      return { name: 'menu-down', color: globalStyles.ICON_DEF_COLOR };
    case 'up':
      return { name: 'menu-up', color: globalStyles.ICON_DEF_COLOR };
    case 'circle-outline':
      return { name: 'checkbox-blank-circle-outline', color: globalStyles.ICON_DEF_COLOR };
    case 'check':
      return { name: 'check-circle', color: globalStyles.SUCCESS_COLOR };
    case 'high-priority':
      return { name: 'bookmark', color: globalStyles.HIGH_P_COLOR };
    case 'normal-priority':
      return { name: 'bookmark', color: globalStyles.NORMAL_P_COLOR };
    case 'low-priority':
      return { name: 'bookmark', color: globalStyles.LOW_P_COLOR };
    case 'none-priority':
      return { name: 'bookmark-outline', color: globalStyles.ICON_DEF_COLOR };
    case 'pencil':
      return { name: 'pencil', color: globalStyles.LIGHT_CANCEL_COLOR };
    case 'logout':
      return { name: 'exit-run', color: globalStyles.ICON_DEF_COLOR };
    case 'cancel':
    default:
      return { name: 'cancel', color: globalStyles.LIGHT_CANCEL_COLOR };
  }
};

type IconNamePickerReturn = {
  name: TodoButtonsNameType;
  color: string;
};
