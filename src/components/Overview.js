import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import { scale } from "../utils";

const SPACE = " ";

const DisplayCard = (
  title,
  icon,
  value,
  iconSize = 18,
  iconColor = "#f55742",
  customWrapperStyle,
  customTitleStyle,
  customValueStyle
) => {
  return (
    <View style={[styles.cardWrapperStyle, customWrapperStyle]}>
      <View style={styles.cardTitleWrapperStyle}>
        <Icon name={icon} size={iconSize} color={iconColor} />
        <Text style={[styles.cardTitleStyle, customTitleStyle]}>{title}</Text>
      </View>

      <Text style={[{ paddingStart: 10, color: "#5c5b5b" }, customValueStyle]}>
        {value}
      </Text>
    </View>
  );
};

const Overview = (props) => {
  console.log(props, "restaurantDetails");
  const { restaurantDetails } = props;
  let userRating = restaurantDetails && restaurantDetails.user_rating;
  return (
    <ScrollView style={{ padding: scale(5) }} bounces={false}>
      {!!restaurantDetails.timings &&
        DisplayCard("Timings", "watch-later", restaurantDetails.timings)}
      {!!restaurantDetails.location && !!restaurantDetails.location.address
        ? DisplayCard(
            "Location",
            "room",
            restaurantDetails.location.address +
              SPACE +
              restaurantDetails.location.city
          )
        : null}
      {!!restaurantDetails.phone_numbers &&
        DisplayCard(
          "Call us:",
          "settings-phone",
          restaurantDetails.phone_numbers
        )}

      {!!userRating &&
        DisplayCard(" Total Votes", "thumb-up", userRating.votes)}
    </ScrollView>
  );
};

export default Overview;

const styles = StyleSheet.create({
  cardTitleStyle: {
    color: "#f55742",
    fontSize: 16,
    fontWeight: "bold",
    paddingStart: 5,
  },
  cardTitleWrapperStyle: {
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  cardWrapperStyle: {
    paddingVertical: scale(8),
    backgroundColor: "white",
    borderRadius: 4,
    margin: 10,
  },
});
