import React, { PureComponent } from "react";
import { View, FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export class Rating extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { ratingValue } = this.props;
    if (ratingValue) {
      return (
        <View>
          <FlatList
            contentContainerStyle={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
            data={Array(ratingValue).fill(1)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={() => {
              return <Icon name="star-rate" size={15} color="#f55742" />;
            }}
          />
        </View>
      );
    } else return null;
  }
}
