import { actionConstants } from "../ActionConstants";

export function RestaurantDataReducer(state = { restaurantData: [] }, action) {
  switch (action.type) {
    case actionConstants.RestaurantListing.setRestaurantData: {
      return {
        ...state,
        restaurantData: action.restaurantData
      };
    }
    case actionConstants.RestaurantListing.deleteRestaurant: {
      return {
        ...state,
        restaurantData: action.restaurantData
      };
    }
    case actionConstants.RestaurantListing.updateRestaurantName: {
      return {
        ...state,
        restaurantData: action.restaurantData
      };
    }
    case actionConstants.RestaurantListing.addRestaurantName: {
      return {
        ...state,
        restaurantData: action.restaurantData
      };
    }
    default:
      return state;
  }
}
