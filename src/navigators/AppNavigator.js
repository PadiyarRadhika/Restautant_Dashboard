import React from "react";
import { View, Text, Image } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator,
  TabNavigator,
} from "react-navigation";

import { Colors, RouteName } from "@app/index.js";
import { scale } from "@utilities";
import { RestaurantsList, Graph, RestaurantDetails } from "../containers";
import { Images } from "@assets";

export const HomeStack = createStackNavigator({
  RestaurantsList: {
    screen: RestaurantsList,
  },
  Graph: {
    screen: Graph,
  },
  RestaurantDetails: {
    screen: RestaurantDetails,
  },
});

const TabStack = TabNavigator(
  {
    RestaurantsList: {
      screen: RestaurantsList,
    },
    Graph: {
      screen: Graph,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let tabIcon = "";
        if (routeName === RouteName.RestaurantListing) {
          tabIcon = Images.buffetIcon;
        } else if (routeName === RouteName.Graph) {
          tabIcon = Images.graphIcon;
        }
        if (tabIcon) {
          return (
            <View
              style={{
                marginTop: scale(10),
                backgroundColor: focused ? Colors.primaryColor : Colors.white,
                borderRadius: scale(4),
              }}
            >
              <Image source={tabIcon} style={{ width: 50, height: 50 }} />
            </View>
          );
        } else return <View />;
      },
    }),
    tabBarOptions: {
      showLabel: false,
      tabStyle: { borderEndColor: Colors.border, borderEndWidth: 1 },
    },
  }
);

class AppWithNavigationState extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <HomeStack />
      </View>
    );
  }
}

export default AppWithNavigationState;
