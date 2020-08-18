import React, { Component } from "react";
import { Image, ImageBackground, StyleSheet } from "react-native";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";

export class SmartImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoaded: false,
      imageError: false,
    };
  }

  onImageLoad = () => {
    this.setState({ imageLoaded: true });
  };

  onImageError = () => {
    this.setState({ imageError: true });
  };

  isImageStillLoading() {
    const { source } = this.props;
    const { imageLoaded, imageError } = this.state;
    if (source == null) return true;
    if (!imageLoaded || imageError) return true;
    if (source && source.hasOwnProperty("uri")) {
      const tempSource = source;
      if (!tempSource.uri) return true;
    }
    return false;
  }

  render() {
    const {
      source,
      placeholder,
      style,
      placeholderStyle,
      width,
      height,
      resizeMode,
      fadeDuration,
      borderRadius,
      backgroundColor,
    } = this.props;

    return (
      <ImageBackground
        onLoadEnd={this.onImageLoad}
        onError={({ nativeEvent: { error } }) => {
          this.onImageError();
        }}
        style={[
          styles.imageStyles,
          width ? { width } : null,
          height ? { height } : null,
          borderRadius ? { borderRadius } : {},
          {
            backgroundColor: backgroundColor,
          },
          style,
        ]}
        source={source}
        resizeMode={resizeMode}
        fadeDuration={fadeDuration}
      >
        {this.isImageStillLoading() ? (
          placeholder ? (
            <Image
              nativeID={this.props.imageId}
              source={placeholder}
              style={[
                styles.placeholderStyles,
                width ? { width } : {},
                height ? { height } : {},
                borderRadius
                  ? {
                      borderRadius,
                    }
                  : {},
                placeholderStyle ? placeholderStyle : style,
              ]}
              resizeMode={resizeMode}
              fadeDuration={fadeDuration}
            />
          ) : (
            <ShimmerPlaceHolder
              autoRun={true}
              duration={2000}
              style={[
                styles.placeholderStyles,
                height && {
                  height,
                },
                width && {
                  width,
                },
                {
                  borderRadius:
                    borderRadius !== undefined
                      ? borderRadius
                      : width && height && width === height
                      ? width / 2
                      : 0,
                },
                placeholderStyle ? placeholderStyle : style,
              ]}
            />
          )
        ) : null}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  imageStyles: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  placeholderStyles: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
