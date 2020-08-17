import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";

import { Colors } from "@app/index.js";
import { scale } from "@utilities";

const Strings = require("../assets/Strings.json");

export class AddEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteItem: this.props.deleteItem ? this.props.deleteItem : null,
      addItem: null,
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.deleteItem) {
      this.setState({ deleteItem: newProps.deleteItem });
    }
  }

  onRestaurantNameEdit = (text) => {
    if (this.state.deleteItem) {
      let copyDeleteItem = JSON.parse(JSON.stringify(this.state.deleteItem)); // create a clone item to avoid reference issue
      copyDeleteItem.name = text;
      this.setState({ deleteItem: copyDeleteItem });
    } else {
      let copyAddItem = JSON.parse(JSON.stringify(this.state.addItem));
      if (copyAddItem && copyAddItem.name) {
        copyAddItem.name = text;
      } else {
        copyAddItem = {};
        copyAddItem.name = text;
      }
      this.setState({ addItem: copyAddItem });
    }
  };

  renderSubmitButton() {
    const { isEditRestaurantName } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          isEditRestaurantName
            ? this.props.onUpdate(this.state.deleteItem)
            : this.props.onAddNew(this.state.addItem);
        }}
        style={styles.submitButtonContainer}
      >
        <Text style={styles.updateTextStyle}>
          {isEditRestaurantName ? Strings.general.Update : Strings.general.Add}
        </Text>
      </TouchableOpacity>
    );
  }
  getInputValue() {
    if (this.props.isEditRestaurantName) {
      return this.state.deleteItem.name;
    } else if (this.state.addItem && this.state.addItem.name) {
      return this.state.addItem.name;
    } else return "";
  }
  render() {
    return (
      <Modal
        animationType="slide"
        visible={this.props.visible}
        transparent={true}
        onRequestClose={() => {
          this.props.onEditModalClose();
        }}
      >
        <TouchableHighlight
          style={styles.mainModalContainer}
          onPress={() => {
            this.props.onEditModalClose();
          }}
        >
          <View style={styles.innerConatiner}>
            <View style={styles.textinputWrapper}>
              <Text style={styles.headerTitleStyle}>
                {this.props.isEditRestaurantName
                  ? Strings.restaurant._edit_restaurant_name_msg
                  : Strings.restaurant._add_restaurant_name_msg}
              </Text>
              <TextInput
                maxLength={50}
                value={this.getInputValue()}
                style={styles.textInputStyle}
                underlineColorAndroid="transparent"
                onChangeText={(text) => {
                  this.onRestaurantNameEdit(text);
                }}
                autoFocus={true}
              />

              {this.renderSubmitButton()}
            </View>
          </View>
        </TouchableHighlight>
      </Modal>
    );
  }
}

AddEditModal.defaultProps = {
  deleteItem: null,
  addItem: null,
  isEditRestaurantName: false,
  visible: false,
  onEditModalClose: () => {},
  onUpdate: () => {},
  onAddNew: () => {},
};

AddEditModal.propTypes = {
  isEditRestaurantName: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired,
  onEditModalClose: PropTypes.func,
  onUpdate: PropTypes.func,
  onAddNew: PropTypes.func,
};

const styles = StyleSheet.create({
  textInputStyle: {
    backgroundColor: Colors.textinputBg,
    padding: scale(20),
    alignItems: "center",
    marginVertical: scale(10),
  },
  headerTitleStyle: { fontSize: scale(20), fontWeight: "700" },
  textinputWrapper: {
    backgroundColor: Colors.white,
    paddingVertical: scale(20),
    paddingHorizontal: scale(10),
  },
  updateTextStyle: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: scale(14),
  },
  submitButtonContainer: {
    padding: scale(10),
    backgroundColor: Colors.secondaryColor,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: scale(20),
  },
  innerConatiner: {
    backgroundColor: Colors.white,
    width: "100%",
    padding: scale(20),
  },
  textStyle: {
    fontWeight: "bold",
    fontSize: scale(20),
    color: Colors.white,
    textAlign: "center",
  },
  mainModalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "center",
    alignItems: "center",
  },
});
