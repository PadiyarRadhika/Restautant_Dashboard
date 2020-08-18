import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  Dimensions,
} from "react-native";

import { SmartImage } from "../components";
import { Colors } from "@app/index.js";
import { scale } from "@utilities";
import { Images } from "../assets/images";

const screenWidth = Dimensions.get("window").width;
const SPACE = " ";

export class RestaurantDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeHeaderIndex: 0,
      restaurantDetails:
        props && props.navigation
          ? props.navigation.state.params.restaurantData
          : null,
    };
  }

  renderHeader = () => {
    const { restaurantDetails } = this.state;
    return (
      <ImageBackground
        style={styles.headerBgImgStyle}
        resizeMode="cover"
        source={
          restaurantDetails.featured_image
            ? { uri: restaurantDetails.featured_image }
            : Images.restaurantPlaceholder
        }
      >
        <View style={styles.headerContentWrapper}>
          {!!restaurantDetails.name && (
            <Text style={styles.restNameStyle}>{restaurantDetails.name}</Text>
          )}
          {!!restaurantDetails.cuisines && (
            <Text style={styles.cuisinesTextStyle}>
              {restaurantDetails.cuisines}
            </Text>
          )}
        </View>
      </ImageBackground>
    );
  };

  renderTabContents = () => {
    switch (this.state.activeHeaderIndex) {
      case 0:
        return this.renderOverView();
      case 1:
        return this.renderReviews();
      case 2:
        return this.renderMenu();
      case 3:
        return this.renderPhotos();
    }
  };

  renderOverView() {
    const { restaurantDetails } = this.state;
    return (
      <View style={{ padding: scale(20) }}>
        <Text style={styles.basicHeaderTextStlye}>Main Highlights</Text>
        {restaurantDetails.highlights &&
          restaurantDetails.highlights.map((item, index) => (
            <View key={index} style={{ paddingVertical: scale(5) }}>
              <Text style={styles.basicHeaderDescStyle}>{"* " + item}</Text>
            </View>
          ))}
        {restaurantDetails.timings && (
          <View style={{ paddingVertical: scale(8) }}>
            <Text style={styles.basicHeaderTextStlye}>Timings</Text>
            <Text style={styles.basicHeaderDescStyle}>
              {restaurantDetails.timings}
            </Text>
          </View>
        )}
        {restaurantDetails.location && restaurantDetails.location.address && (
          <View style={{ padding: scale(8) }}>
            <Text style={styles.basicHeaderTextStlye}>Location</Text>
            <Text style={styles.basicHeaderDescStyle}>
              {restaurantDetails.location.address +
                SPACE +
                restaurantDetails.location.city}
            </Text>
          </View>
        )}
      </View>
    );
  }
  renderReviews() {
    return (
      <View>
        <Text>{"renderReviews"}</Text>
        <Text />
      </View>
    );
  }
  renderMenu() {
    return (
      <View>
        <Text />
      </View>
    );
  }
  renderPhotos() {
    return (
      <View>
        <Text />
      </View>
    );
  }

  renderTabHeaders = () => {
    const tabHeaderItems = ["Overview", "Reviews", "Menu", "Photos"];
    const { activeHeaderIndex } = this.state;
    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        style={{ width: screenWidth }}
      >
        {tabHeaderItems.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                this.setState({ activeHeaderIndex: index });
              }}
              key={index}
              style={[
                { width: screenWidth / tabHeaderItems.length },
                styles.tabItemStyle,
                activeHeaderIndex == index
                  ? {
                      borderBottomColor: Colors.secondaryColor,
                      borderBottomWidth: 5,
                    }
                  : null,
              ]}
            >
              <Text style={styles.tabItemTextStyle}>{item}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  renderContents = () => {
    return (
      <View>
        {this.renderTabHeaders()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          style={{}}
        >
          {this.renderTabContents()}
        </ScrollView>
      </View>
    );
  };
  render() {
    return this.state.restaurantDetails ? (
      <View style={{ flex: 1 }}>
        {this.renderHeader()}
        {this.renderContents()}
        <View />
      </View>
    ) : (
      <View />
    );
  }
}

const styles = StyleSheet.create({
  basicHeaderDescStyle: {
    fontSize: scale(12),
    fontWeight: "bold",
    color: "black",
  },
  basicHeaderTextStlye: {
    fontSize: scale(14),
    fontWeight: "500",
    color: Colors.secondaryColor,
  },
  tabItemTextStyle: {
    color: "black",
    fontSize: scale(14),
    fontWeight: "500",
  },
  tabItemStyle: {
    height: scale(50),
    alignItems: "center",
    justifyContent: "center",
  },
  headerBgImgStyle: {
    height: scale(150),
    width: "100%",
    justifyContent: "flex-end",
  },
  headerContentWrapper: {
    padding: scale(20),
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  restNameStyle: {
    fontWeight: "bold",
    color: Colors.white,
    fontSize: scale(18),
  },
  cuisinesTextStyle: {
    fontWeight: "500",
    color: Colors.white,
    fontSize: scale(12),
    paddingVertical: scale(5),
  },
});
