import Svg, {Path} from 'react-native-svg';

import React from 'react';
import {View} from 'react-native';
import TouchableOpacityG from '../util/TouchableOpacityG';
import RNBeep from 'react-native-a-beep';
const {
  TONE_CDMA_ABBR_ALERT,
  TONE_CDMA_ANSWER,
  TONE_CDMA_KEYPAD_VOLUME_KEY_LITE,
  TONE_CDMA_CALLDROP_LITE,
} = RNBeep.AndroidSoundIDs;

const tones = [
  TONE_CDMA_ABBR_ALERT,
  TONE_CDMA_ANSWER,
  TONE_CDMA_KEYPAD_VOLUME_KEY_LITE,
  TONE_CDMA_CALLDROP_LITE,
];

function getCoordinatesForPercent(percent: number) {
  const x = Math.cos(2 * Math.PI * percent);
  const y = Math.sin(2 * Math.PI * percent);
  return [x, y];
}
const MS_ETCH_COLOR = 350;

const Circle = ({
  onColorPress,
  refShowColor,
  stateOfGame,
  colors,
}: {
  onColorPress: (index: number) => void;
  refShowColor: React.MutableRefObject<(arr: number[]) => void>;
  stateOfGame: React.MutableRefObject<'LISTENER' | 'DISPLAY'>;
  colors: string[];
}) => {
  const arrLength = colors.length;
  const [elRefs, setElRefs] = React.useState<
    React.RefObject<TouchableOpacityG>[]
  >([]);

  React.useEffect(() => {
    setElRefs(oldElRefs =>
      Array(arrLength)
        .fill(arrLength)
        .map((_, i) => oldElRefs[i] || React.createRef()),
    );
  }, [arrLength]);

  const slices = colors.flatMap((el, i) => {
    return [
      {
        percent: 0.245,
        color: el,
        myRef: elRefs[i],
        tone: tones[i],
        index: i,
      },
      {percent: 0.005, color: 'white', index: -1},
    ];
  });

  const sliceF = () => {
    let cumulativePercent = 0;
    let arr = [];
    arr = slices.map(slice => {
      const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
      cumulativePercent += slice.percent;
      const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
      const largeArcFlag = slice.percent > 0.5 ? 1 : 0;
      const pathData = [
        `M ${startX} ${startY}`, // Move
        `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
        'L 0 0', // Line
      ].join(' ');
      return (
        <TouchableOpacityG
          stateOfGame={stateOfGame}
          testID={`testPath-${slice.color}`}
          ref={slice.myRef}
          key={pathData}
          onPressIn={() => {
            RNBeep.PlaySysSound(slice.tone || 0);
            onColorPress(slice.index);
          }}>
          <Path d={pathData} fill={slice.color} key={pathData} />
        </TouchableOpacityG>
      );
    });
    return arr;
  };

  const sleep = (ms: number): Promise<void> =>
    new Promise(resolve => setTimeout(resolve, ms));

  const performerColor = async (index: number) => {
    elRefs[index]?.current?.makePressIn();
    RNBeep.PlaySysSound(tones[index]);
    await sleep(200);
    elRefs[index]?.current?.makePressOut();
  };

  const runOnArr = async (arr: number[]) => {
    stateOfGame.current = 'DISPLAY';
    for (let index = 0; index < arr.length; index++) {
      await sleep(MS_ETCH_COLOR);
      performerColor(arr[index]);
    }
    stateOfGame.current = 'LISTENER';
  };
  refShowColor.current = runOnArr;

  return (
    <>
      <View
        testID="circleTestId"
        style={[{alignItems: 'center', justifyContent: 'center'}]}>
        <Svg
          height="300"
          width="300"
          viewBox="-1 -1 2 2"
          style={{transform: [{rotate: '-45deg'}]}}>
          {sliceF()}
        </Svg>
      </View>
    </>
  );
};
export default Circle;
