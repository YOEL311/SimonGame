import * as React from 'react';
import {useRef} from 'react';
import {View, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import Circle from '../components/circle';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
const COLORS = ['blue', 'red', 'green', 'yellow'];
const lengthColors = COLORS.length;

function GameScreen() {
  const refShowColor = useRef<(arr: number[]) => void>(() => {});
  const levelOfUser = useRef(0);
  const dispatch = useDispatch();
  const onColorPress = (index: number) => {
    if (stateOfGame.current === 'DISPLAY' || index === -1) {
      return;
    }
    if (listColors[levelOfUser.current] === index) {
      userSuccess();
    } else {
      dispatch({
        type: 'USER_LOSE',
        payload: (levelOfUser.current + 1) * 10,
      });
    }
  };
  const userSuccess = () => {
    if (listColors.length - 1 === levelOfUser.current) {
      nextLevel();
    } else {
      levelOfUser.current = levelOfUser.current + 1;
    }
  };

  const [listColors, setListColors] = React.useState<number[]>([
    getRandomInt(lengthColors),
  ]);
  const stateOfGame = React.useRef<'LISTENER' | 'DISPLAY'>('DISPLAY');

  const addColorToList = React.useCallback(() => {
    const newColor = getRandomInt(lengthColors);
    setListColors(oldArray => [...oldArray, newColor]);
  }, []);

  React.useEffect(() => {
    refShowColor?.current?.(listColors);
  }, [listColors]);

  const nextLevel = () => {
    levelOfUser.current = 0;
    addColorToList();
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#BBBDBD',
      }}>
      <View style={{padding: 40}} />
      <Circle
        stateOfGame={stateOfGame}
        refShowColor={refShowColor}
        onColorPress={onColorPress}
        colors={COLORS}
      />
    </View>
  );
}
export default GameScreen;
