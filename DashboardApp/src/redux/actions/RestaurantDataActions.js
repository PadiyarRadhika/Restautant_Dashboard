import { actionConstants } from "../ActionConstants";

export function onSetRestaurantData(restaurantData) {
  return {
    type: actionConstants.RestaurantListing.setRestaurantData,
    restaurantData
  };
}

export function onDeleteRestaurant(restaurantData, deleteItem) {
  let existingRestaurantData = JSON.parse(JSON.stringify(restaurantData));
  var deleteItemIndex = existingRestaurantData.findIndex(function(element) {
    return element.restaurant.id === deleteItem.id;
  });
  if (deleteItemIndex !== -1) {
    existingRestaurantData.splice(deleteItemIndex, 1);
  }

  return {
    type: actionConstants.RestaurantListing.deleteRestaurant,
    restaurantData: existingRestaurantData
  };
}

export function onUpdateRestaurantName(restaurantData, updatedItem) {
  let existingRestaurantData = JSON.parse(JSON.stringify(restaurantData));
  let updateItemIndex = existingRestaurantData.findIndex(function(element) {
    return element.restaurant.id === updatedItem.id;
  });
  existingRestaurantData[updateItemIndex].restaurant.name = updatedItem.name;

  return {
    type: actionConstants.RestaurantListing.updateRestaurantName,
    restaurantData: existingRestaurantData
  };
}

export function onAddRestaurantName(restaurantData, addItemName) {
  let existingRestaurantData = JSON.parse(JSON.stringify(restaurantData));
  existingRestaurantData.unshift({
    restaurant: { ...addItemName, id: Math.random() }
  });
  // Push will add to the end of the array, if we want to replicate our newly added item at the top of the list,
  // unshift adds to the front of the array
  return {
    type: actionConstants.RestaurantListing.addRestaurantName,
    restaurantData: existingRestaurantData
  };
}
