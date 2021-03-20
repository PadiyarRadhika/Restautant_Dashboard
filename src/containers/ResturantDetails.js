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
  SectionList,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";

import { Colors } from "@app/index.js";
import { scale } from "@utilities";
import { Images } from "../assets/images";
import { Rating } from "../components";
import Overview from "../components/Overview";
import HighLights from "../components/Highlights";

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
          <View
            style={{
              flexDirection: "row",
            }}
          >
            {!!restaurantDetails.name && (
              <Text style={[styles.restNameStyle, { flex: 1 }]}>
                {restaurantDetails.name}
              </Text>
            )}
            {!!restaurantDetails.user_rating &&
              !!restaurantDetails.user_rating.aggregate_rating && (
                <Rating
                  ratingValue={parseInt(
                    restaurantDetails.user_rating.aggregate_rating
                  )}
                />
              )}
          </View>
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
    const { activeHeaderIndex, restaurantDetails } = this.state;
    console.log(activeHeaderIndex, "activeHeaderIndex");
    switch (this.state.activeHeaderIndex) {
      case 0:
        return <Overview restaurantDetails={restaurantDetails} />;
      case 1:
        return <HighLights restaurantDetails={restaurantDetails} />;
      default:
        return null;
    }
  };

  renderTabHeaders = () => {
    const tabHeaderItems = ["Overview", "Main Highlights"];
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
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          {this.renderTabContents()}
        </ScrollView>
      </View>
    );
  };

  render() {
    return this.state.restaurantDetails ? (
      <View>
        {this.renderHeader()}
        {this.renderContents()}
      </View>
    ) : (
      <View />
    );
  }
}

const styles = StyleSheet.create({
  dotStyle: {
    backgroundColor: "#5c5b5b",
    width: 6,
    height: 6,
    borderRadius: 3,
    marginEnd: 10,
  },
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
    textAlign: "center",
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
