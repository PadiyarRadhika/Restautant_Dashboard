import React from "react";
import { View, Text, Image } from "react-native";
import { createBottomTabNavigator } from "react-navigation";

import { Colors, RouteName } from "@app/index.js";
import { scale } from "@utilities";
import { RestaurantsList, Graph } from "../containers";
import { Images } from "@assets";

export const TabStack = createBottomTabNavigator(
  {
    RestaurantsList: RestaurantsList,
    Graph: Graph
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
                borderRadius: scale(4)
              }}
            >
              <Image source={tabIcon} style={{ width: 50, height: 50 }} />
            </View>
          );
        } else return <View />;
      }
    }),
    tabBarOptions: {
      showLabel: false,
      tabStyle: { borderEndColor: Colors.border, borderEndWidth: 1 }
    }
  }
);

class AppWithNavigationState extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <TabStack />
      </View>
    );
  }
}

export default AppWithNavigationState;
