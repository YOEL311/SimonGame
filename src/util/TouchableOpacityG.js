import React, {Component} from 'react';
import {Animated, Easing} from 'react-native';
import {G} from 'react-native-svg';

const AnimatedG = Animated.createAnimatedComponent(G);

function flattenStyle(style) {
  if (style === null || typeof style !== 'object') {
    return undefined;
  }

  if (!Array.isArray(style)) {
    return style;
  }

  const result = {};
  for (let i = 0, styleLength = style.length; i < styleLength; ++i) {
    const computedStyle = flattenStyle(style[i]);
    if (computedStyle) {
      for (const key in computedStyle) {
        result[key] = computedStyle[key];
      }
    }
  }
  return result;
}

export default class TouchableOpacityG extends Component {
  static defaultProps = {
    activeOpacity: 0.2,
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.disabled !== prevProps.disabled) {
      this._opacityInactive(250);
    }
  };

  /**
   * Animate the touchable to a new opacity.
   */
  setOpacityTo = (value, duration) => {
    Animated.timing(this.state.anim, {
      toValue: value,
      duration: duration,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  touchableHandleActivePressIn = e => {
    if (e.dispatchConfig.registrationName === 'onResponderGrant') {
      this._opacityActive(0);
    } else {
      this._opacityActive(150);
    }
    this.props.onPressIn && this.props.onPressIn(e);
  };

  makePressIn = () => {
    this._opacityActive(0);
  };

  makePressOut = () => {
    this._opacityInactive(250);
  };

  touchableHandleActivePressOut = e => {
    this._opacityInactive(250);
    this.props.onPressOut && this.props.onPressOut(e);
  };

  touchableHandlePress = e => {
    if (this.props.stateOfGame.current === 'LISTENER') {
      this.props.onPress && this.props.onPress(e);
    }
  };

  touchableHandleLongPress = e => {
    this.props.onLongPress && this.props.onLongPress(e);
  };

  _opacityActive = duration => {
    this.setOpacityTo(this.props.activeOpacity, duration);
  };

  _opacityInactive = duration => {
    this.setOpacityTo(this._getChildStyleOpacityWithDefault(), duration);
  };

  _getChildStyleOpacityWithDefault = () => {
    const childStyle = flattenStyle(this.props.style) || {};
    return childStyle.opacity == null ? 1 : childStyle.opacity;
  };

  state = {
    anim: new Animated.Value(this._getChildStyleOpacityWithDefault()),
  };

  render() {
    return (
      <AnimatedG
        opacity={this.state.anim}
        onPress={this.touchableHandlePress}
        onLongPress={this.touchableHandleLongPress}
        onPressIn={this.touchableHandleActivePressIn}
        onPressOut={this.touchableHandleActivePressOut}>
        {this.props.children}
      </AnimatedG>
    );
  }
}
