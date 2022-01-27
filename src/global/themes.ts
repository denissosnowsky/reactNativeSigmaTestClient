import globalStyles from './constants.style';

export const themes = {
  light: {
    background: globalStyles.LIGHT_BACKGROUND_COLOR,
    placeholder: globalStyles.LIGHT_PLACEHOLDER_COLOR,
    listItemBG: globalStyles.LIGHT_LIST_ITEM_BG,
    textColor: globalStyles.LIGHT_MAIN_COLOR,
    modal: globalStyles.LIGHT_MODAL_BG,
    button: globalStyles.LIGHT_BUTTON_COLOR,
  },
  dark: {
    background: globalStyles.DARK_BACKGROUND_COLOR,
    placeholder: globalStyles.DARK_PLACEHOLDER_COLOR,
    listItemBG: globalStyles.DARK_LIST_ITEM_BG,
    textColor: globalStyles.DARK_MAIN_COLOR,
    modal: globalStyles.DARK_MODAL_BG,
    button: globalStyles.DARK_BUTTON_COLOR,
  },
};
