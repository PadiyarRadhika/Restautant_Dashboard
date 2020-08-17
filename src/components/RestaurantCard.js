import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import PropTypes from "prop-types";

import { Colors } from "@app/index.js";
import { scale } from "@utilities";
import { Images } from "../assets/images";
const Strings = require("../assets/Strings.json");

export class RestaurantCard extends Component {
  constructor(props) {
    super(props);
  }
  onDeleteClick(restaurantItemData) {
    Alert.alert(
      "",
      Strings.general._delete_warning_msg,
      [
        {
          text: Strings.general.Cancel,
          onPress: () => {},
          style: "cancel",
        },
        {
          text: Strings.general.OK,
          onPress: () => {
            this.props.onDeleteConfirm(restaurantItemData);
          },
        },
      ],
      { cancelable: false }
    );
  }

  onEditPress(deleteItem) {
    this.props.onEditConfirm(deleteItem);
  }

  render() {
    const { restaurantItemData } = this.props;
    if (restaurantItemData) {
      return (
        <View style={styles.maincontainer}>
          {restaurantItemData.featured_image ? (
            <Image
              source={{ uri: restaurantItemData.featured_image }}
              style={styles.featuredImageStyle}
            />
          ) : null}
          <View style={styles.restaurantInfoContainer}>
            <View style={styles.restaurantNameContainer}>
              {restaurantItemData.name ? (
                <Text style={styles.restaurantNAmeTextStyle} numberOfLines={2}>
                  {restaurantItemData.name}
                </Text>
              ) : (
                <Text
                  style={[
                    styles.restaurantNAmeTextStyle,
                    { color: Colors.warningColor },
                  ]}
                  numberOfLines={2}
                >
                  {Strings.restaurant._no_name_error_msg}
                </Text>
              )}
              <TouchableOpacity
                style={styles.editButtonContainer}
                onPress={() => {
                  this.onEditPress(restaurantItemData);
                }}
              >
                <Image source={Images.editIcon} style={styles.editIconStyle} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButtonContainer}
                onPress={() => {
                  this.onDeleteClick(restaurantItemData);
                }}
              >
                <Image source={Images.deleteIcon} style={styles.iconStyle} />
              </TouchableOpacity>
            </View>
            {restaurantItemData.cuisines ? (
              <Text style={styles.cuisinesTextStyle}>
                {restaurantItemData.cuisines}
              </Text>
            ) : null}
          </View>
        </View>
      );
    } else return null;
  }
}

RestaurantCard.defaultProps = {
  restaurantItemData: {},
  onDeleteConfirm: () => {},
  onEditConfirm: () => {},
};

RestaurantCard.propTypes = {
  restaurantItemData: PropTypes.object.isRequired,
  onDeleteConfirm: PropTypes.func,
  onEditConfirm: PropTypes.func,
};

const styles = StyleSheet.create({
  editIconStyle: { height: scale(30), width: scale(30) },
  cuisinesTextStyle: {
    fontSize: scale(12),
    color: Colors.placeholderText,
    fontWeight: "600",
  },
  iconStyle: { height: scale(20), width: scale(20) },
  editButtonContainer: {
    padding: scale(5),
    backgroundColor: Colors.secondaryColor,
    borderRadius: scale(4),
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: scale(10),
  },
  deleteButtonContainer: {
    padding: scale(10),
    backgroundColor: Colors.warningColor,
    borderRadius: scale(4),
    alignItems: "center",
    justifyContent: "center",
  },
  restaurantNAmeTextStyle: {
    flex: 1,
    fontSize: scale(18),
    fontWeight: "bold",
    color: Colors.secondaryColor,
  },
  restaurantNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scale(5),
  },
  restaurantInfoContainer: {
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
  },
  featuredImageStyle: { height: scale(100), width: "100%" },
  maincontainer: {
    backgroundColor: Colors.white,
    borderRadius: scale(4),
    borderColor: Colors.border,
    borderWidth: 2,
    marginVertical: scale(10),
  },
});
