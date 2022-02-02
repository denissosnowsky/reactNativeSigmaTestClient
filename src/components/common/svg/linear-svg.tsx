import * as React from 'react';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

export const LinearSVG: React.VFC<Props> = (props) => (
  <Svg height={props.height} width="55" preserveAspectRatio="xMinYMin slice">
    <Defs>
      <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
        <Stop offset="0" stopColor={props.color1} stopOpacity="0.9" />
        <Stop offset="0.7" stopColor={props.color2} stopOpacity="0.5" />
      </LinearGradient>
    </Defs>
    <Rect x="0" y="0" width="55" height={props.height} fill="url(#grad)" />
  </Svg>
);

type Props = {
  height: string;
  color1: string;
  color2: string;
};
