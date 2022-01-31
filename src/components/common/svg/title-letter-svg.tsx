import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export const TitleLetterSVG: React.VFC<Props> = (props) => (
  <Svg width={140} height={90} viewBox="0 0 200 140" fill={props.color ?? '#000'} {...props}>
    <Path d="M109.2 42.5zM42.9 23C34.1 25.6 6.1 44.8 4.6 49.2c-.5 1.5-.7 3.1-.3 3.4.4.4 4.4-1.8 8.9-4.9 4.5-3.1 8.3-5.5 8.5-5.3.2.2-.2 7.7-.8 16.7-1.4 19.3-.8 24.4 3.1 24.4h2.5l.1-12c.2-13.5 1.2-30.9 2-33 .8-2 6.5-5.2 13.2-7.4 5.4-1.7 5.7-2 5.7-5.1" />
  </Svg>
);

type Props = {
  color?: string;
};
