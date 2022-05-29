import {render, fireEvent} from '@testing-library/react-native';
import React, {MutableRefObject} from 'react';
import Circle from '../../src/components/circle';

jest.mock('react-native-a-beep', () => require('react-native-a-beep/mock'));

describe('should test circle component', () => {
  it('should test to be rendered', async () => {
    const ref = React.createRef() as MutableRefObject<(arr: number[]) => void>;
    const onColorPress = jest.fn();
    const colors = ['red', 'green', 'blue', 'yellow'];
    const rendered = render(
      //@ts-ignore
      <Circle refShowColor={ref} onColorPress={onColorPress} colors={colors} />,
    );
    const circle = await rendered.findByTestId('circleTestId');
    expect(rendered).toMatchSnapshot();
    fireEvent.press(circle);
  });
});
