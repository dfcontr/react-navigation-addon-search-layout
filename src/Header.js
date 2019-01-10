import React from 'react';
import { Animated, Dimensions, Platform, StyleSheet, View } from 'react-native';
import { withNavigation, HeaderBackButton } from 'react-navigation';

const X_WIDTH = 375;
const X_HEIGHT = 812;
const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');
const isIPhoneX =
  Platform.OS === 'ios' && (D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH);

const NOTCH_HEIGHT = isIPhoneX ? 20 : 0;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 50 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const TITLE_OFFSET = Platform.OS === 'ios' ? 70 : 56;

export default class Header extends React.PureComponent {
  static HEIGHT = APPBAR_HEIGHT + STATUSBAR_HEIGHT + NOTCH_HEIGHT;

  _maybeRenderBackButton = () => {
    if (!this.props.backButton) {
      return;
    }

    return (
      <HeaderBackButton
        onPress={() => this.props.goBack()}
        pressColorAndroid={this.props.tintColor || '#fff'}
        tintColor={this.props.tintColor}
        title={this.props.backButtonTitle || null}
        truncatedTitle={this.props.backButtonTruncatedTitle || null}
        titleStyle={this.props.backButtonTitleStyle || null}
      />
    );
  };

  getContainerStyles = () => {
    const { showBorder, borderColor } = this.props;
    const platformContainerStyles = {
      borderBottomWidth: showBorder ? 1 : 0,
      borderBottomColor: borderColor,
      elevation: showBorder ? 1 : 0
    };

    return platformContainerStyles;
  };

  render() {
    let headerStyle = {};
    if (this.props.backgroundColor) {
      headerStyle.backgroundColor = this.props.backgroundColor;
    }

    return (
      <Animated.View
        style={[styles.container, this.getContainerStyles(), headerStyle]}
      >
        <View style={styles.appBar}>
          <View style={[StyleSheet.absoluteFill, styles.header]}>
            {this._maybeRenderBackButton()}
            {this.props.children}
          </View>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: STATUSBAR_HEIGHT + NOTCH_HEIGHT,
    height: STATUSBAR_HEIGHT + APPBAR_HEIGHT + NOTCH_HEIGHT
  },
  appBar: {
    flex: 1
  },
  header: {
    flexDirection: 'row'
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  title: {
    bottom: 0,
    left: TITLE_OFFSET,
    right: TITLE_OFFSET,
    top: 0,
    position: 'absolute',
    alignItems: Platform.OS === 'ios' ? 'center' : 'flex-start'
  },
  left: {
    left: 0,
    bottom: 0,
    top: 0,
    position: 'absolute'
  },
  right: {
    right: 0,
    bottom: 0,
    top: 0,
    position: 'absolute'
  }
});
