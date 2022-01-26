import { useState } from 'react';

import globalStyles from '~global/constants.style';

export const useChangeColor = (): [string, () => void] => {
  const [color, setColor] = useState(0);
  const colorsArray = [
    globalStyles.HEADER_COLOR_1,
    globalStyles.HEADER_COLOR_2,
    globalStyles.HEADER_COLOR_3,
    globalStyles.HEADER_COLOR_4,
    globalStyles.HEADER_COLOR_5,
    globalStyles.HEADER_COLOR_6,
    globalStyles.HEADER_COLOR_7,
  ];

  const setNewColor = () => {
    if (color < colorsArray.length - 1) {
      setColor((color) => color + 1);
    } else {
      setColor(0);
    }
  };

  return [colorsArray[color], setNewColor];
};
