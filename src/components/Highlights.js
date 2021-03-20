import React from "react";
import { View, Text, FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const HighLights = (props) => {
  const { restaurantDetails } = props;
  return (
    <View>
      {restaurantDetails.highlights ? (
        <View
          style={{
            padding: 10,
            backgroundColor: "white",
            borderRadius: 4,
            margin: 10,
          }}
        >
          <FlatList
            bounces={false}
            data={restaurantDetails.highlights}
            renderItem={({ item, index }) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: index % 2 == 0 ? "white" : "#e6e2df",
                  padding: 5,
                }}
              >
                <Icon name="loyalty" size={20} color="#f55742" />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "#5c5b5b",
                  }}
                >
                  {item}
                </Text>
              </View>
            )}
            keyExtractor={(item) => item}
          />
        </View>
      ) : null}
    </View>
  );
};

export default HighLights;
