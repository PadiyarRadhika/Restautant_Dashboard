import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as RestaurantListAction from "../redux/actions/RestaurantDataActions";

import DashboardService from "../services/DashboardService";
import { Colors } from "@app/index.js";
import { scale } from "@utilities";

import { RestaurantCard, AddEditModal } from "@components";
const Strings = require("../assets/Strings.json");

export class RestaurantsListC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantListData: null,
      displayEditModal: false,
      isEditRestaurantName: false,
      isLoading: true,
    };
  }
  componentDidMount() {
    if (this.props.restaurantData && this.props.restaurantData.length > 0) {
      this.setState({
        restaurantListData: this.props.restaurantData,
        isLoading: false,
      });
    }
    this.fetchRestaurantData();
  }

  componentWillReceiveProps(props) {
    if (props.restaurantData) {
      this.setState({ restaurantListData: props.restaurantData });
    }
  }

  fetchRestaurantData() {
    const { actions } = this.props;
    DashboardService.getRestaurantData().then(
      (responseData) => {
        if (responseData) {
          // set it to redux store
          this.setState({ isLoading: false });
          actions.onSetRestaurantData(responseData.restaurants);
        }
      },
      (err) => {
        this.setState({ isLoading: false });
      }
    );
  }

  onAddRestaurantName(addItem) {
    const { actions } = this.props;
    if (addItem && addItem.name && addItem.name.length > 0) {
      actions.onAddRestaurantName(this.state.restaurantListData, addItem);
    }
  }

  onDeleteRestaurantConfirmed(deleteItem) {
    const { actions } = this.props;
    actions.onDeleteRestaurant(this.state.restaurantListData, deleteItem);
  }

  onEditRestaurantNameConfirmed(deleteItem) {
    this.setState({
      displayEditModal: true,
      deleteItem: deleteItem,
      isEditRestaurantName: true,
    });
  }

  onUpdateRestaurantItem(updatedItem) {
    const { actions } = this.props;
    if (updatedItem && updatedItem.name && updatedItem.name.length > 0) {
      actions.onUpdateRestaurantName(
        this.state.restaurantListData,
        updatedItem
      );
    }
  }

  renderRestaurantCardItem = ({ item, index }) => {
    return (
      <RestaurantCard
        restaurantItemData={item.restaurant}
        onDeleteConfirm={(deleteItem) => {
          this.onDeleteRestaurantConfirmed(deleteItem);
        }}
        onEditConfirm={(deleteItem) => {
          this.onEditRestaurantNameConfirmed(deleteItem);
        }}
      />
    );
  };

  renderRestaurantListing() {
    return (
      <FlatList
        data={this.state.restaurantListData}
        renderItem={this.renderRestaurantCardItem}
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `${index}`}
        ListEmptyComponent={this.renderEmptyListView}
        contentContainerStyle={{ marginBottom: scale(20) }}
      />
    );
  }
  renderEmptyListView() {
    return (
      <View style={styles.emptyListContainer}>
        <Text style={styles.emptylistText}>
          {Strings.restaurant._no_listing_error_msg}
        </Text>
      </View>
    );
  }

  renderAddRestaurantNameButton() {
    return (
      <TouchableOpacity
        style={styles.addButtonConatiner}
        onPress={() => {
          this.setState({
            displayEditModal: true,
            isEditRestaurantName: false,
          });
        }}
      >
        <Text style={styles.plusIconStyle}>+</Text>
      </TouchableOpacity>
    );
  }
  renderAddEditModal() {
    return (
      <AddEditModal
        isEditRestaurantName={this.state.isEditRestaurantName}
        visible={this.state.displayEditModal}
        deleteItem={this.state.deleteItem}
        onEditModalClose={() => {
          this.setState({ displayEditModal: false });
        }}
        onUpdate={(updatedItem) => {
          this.setState(
            {
              displayEditModal: false,
              isEditRestaurantName: false,
              deleteItem: null,
            },
            () => {
              this.onUpdateRestaurantItem(updatedItem);
            }
          );
        }}
        onAddNew={(newItem) => {
          this.setState(
            {
              displayEditModal: false,
              isEditRestaurantName: false,
            },
            () => {
              this.onAddRestaurantName(newItem);
            }
          );
        }}
      />
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <ActivityIndicator
          size="large"
          color={Colors.primaryColor}
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        />
      );
    } else if (this.state.restaurantListData) {
      return (
        <View style={{ flex: 1 }}>
          <SafeAreaView style={{ marginHorizontal: scale(20) }}>
            {this.renderRestaurantListing()}
          </SafeAreaView>
          {this.state.displayEditModal && this.renderAddEditModal()}
          {this.renderAddRestaurantNameButton()}
        </View>
      );
    } else return <View />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(RestaurantListAction, dispatch),
  };
};

const mapStateToProps = (state) => ({
  restaurantData: state.restauantDataReducer.restaurantData,
});
export const RestaurantsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantsListC);

const styles = StyleSheet.create({
  emptylistText: {
    color: Colors.warningColor,
    fontSize: scale(14),
    fontWeight: "bold",
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: scale(100),
  },
  plusIconStyle: {
    fontSize: scale(20),
    fontWeight: "bold",
    color: Colors.white,
  },
  addButtonConatiner: {
    flex: 1,
    position: "absolute",
    bottom: scale(20),
    left: scale(20),
    height: scale(60),
    width: scale(60),
    borderRadius: scale(30),
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
  },
});
