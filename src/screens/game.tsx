import * as React from 'react';
import {useRef} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import Circle from '../components/circle';
import {showToast} from '../../src/util/toast';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
const COLORS = ['blue', 'red', 'green', 'yellow'];
const lengthColors = COLORS.length;

function GameScreen() {
  const refShowColor = useRef<(arr: number[]) => void>(() => {});
  const levelOfUser = useRef(0);
  const dispatch = useDispatch();
  const [listColors, setListColors] = React.useState<number[]>([
    getRandomInt(lengthColors),
  ]);

  const stateOfGame = React.useRef<'LISTENER' | 'DISPLAY'>('DISPLAY');

  React.useEffect(() => {
    refShowColor?.current?.(listColors);
  }, [listColors]);

  const onColorPress = (index: number) => {
    if (stateOfGame.current === 'DISPLAY' || index === -1) {
      return;
    }
    if (listColors[levelOfUser.current] === index) {
      userSuccess();
    } else {
      showToast('you lose 🙁');
      dispatch({
        type: 'USER_LOSE',
        payload: listColors.length * 10,
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

  const addColorToList = React.useCallback(() => {
    const newColor = getRandomInt(lengthColors);
    setListColors(oldArray => [...oldArray, newColor]);
  }, []);

  const nextLevel = () => {
    showToast('nextLevel 🙂');
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
