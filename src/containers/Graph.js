import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
  ClippingRectangle
} from "react-native";

import { LineChart, BarChart, PieChart } from "react-native-chart-kit";

import { connect } from "react-redux";

import { Colors, getColorWithOpacity } from "@app/index.js";
import { scale } from "@utilities";
const Strings = require("../assets/Strings.json");

const screenWidth = Dimensions.get("window").width;

export class GraphC extends Component {
  getPriceRange = () => {
    let priceRangeArr = [];
    for (i = 1; i <= 4; i++) {
      priceRangeArr.push(i);
    }
    // Price range for Zomato data set is 1-4
    // Forms an array [1,2,3,4]
    return priceRangeArr;
  };

  getAvgCostData() {
    // Fetch the average cost for 2 of every restaurant and place in a separate array
    const { restaurantData } = this.props;
    let avgCostData = [];
    restaurantData.map(restaurantItem => {
      if (restaurantItem.restaurant.average_cost_for_two) {
        avgCostData.push(restaurantItem.restaurant.average_cost_for_two);
      }
    });
    return avgCostData;
    // return [2,45,140....]etc
  }

  getRatingRange() {
    //Ratings range from 1-5 for Zomato Data set
    // Forma an array [1,2,3,4,5]
    let ratingsRange = [];
    for (i = 1; i <= 5; i++) {
      ratingsRange.push(i);
    }
    return ratingsRange;
  }

  getCountOfRestauntsBasedOnPrice() {
    // Price is varied from 1-4 for Zomato dataset.
    // Calculate the number of restaurants that fall under one particular rating
    // Output = [{price : 1, count : 6}, {price : 2 , count : 12} ... {price : 4, count : 2 }]
    const { restaurantData } = this.props;
    let listData = [];
    restaurantData.map(restaurantItem => {
      // Grouping the restaurants based on same price value
      if (restaurantItem.restaurant.price_range) {
        let price = restaurantItem.restaurant.price_range;
        let existingData = listData.find(item => item.price === price);
        if (existingData) {
          // If that particular price object already exists, just increase the count
          existingData.count++;
        } else {
          // If it's a freah enrey, create a new object
          listData.push({ price: price, count: 1 });
        }
      }
    });
    listData.sort((a, b) => a.price - b.price); // sorting the data based on increasing order of price
    return listData;
  }

  getCountForPrice() {
    getSortedPriceArray = this.getCountOfRestauntsBasedOnPrice();
    let countArray = [];
    getSortedPriceArray.map(item => {
      if (item.count) {
        countArray.push(item.count % 100);
      }
    });
    return countArray;
  }

  formPieChartDataObject(listData) {
    // pie chart requires data array in the format [{name : name, accessor : accessor, color : required color}]
    let resultData = [];
    listData.map(priceItem => {
      resultData.push({
        name: priceItem.price + " price",
        count: priceItem.count,
        color: this.getPieChartColor(priceItem)
      });
    });
    return resultData;
  }

  getPieChartColor(priceItem) {
    // Get different colors for the pie chart sections based on their price value
    switch (priceItem.price) {
      case 1:
        return Colors.warningColor;
      case 2:
        return Colors.primaryColor;
      case 3:
        return Colors.darkTangerine;
      case 4:
        return Colors.secondaryColor;
      default:
        return Colors.greyLight;
    }
  }
  renderBarChart() {
    const data = {
      labels: this.getPriceRange(),
      datasets: [
        {
          data: this.getAvgCostData()
        }
      ]
    };

    const chartConfig = {
      backgroundGradientFrom: Colors.darkTangerine,
      backgroundGradientTo: Colors.secondaryColor,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5
    };
    return (
      <View style={{ flex: 1, marginTop: scale(10) }}>
        <Text style={styles.graphHeaderStyle}>
          {Strings.graph._bar_chart_description}
        </Text>
        <BarChart
          style={{ marginVertical: scale(20) }}
          data={data}
          width={scale(screenWidth - 10)}
          height={scale(screenWidth)}
          yAxisLabel="Rs"
          chartConfig={chartConfig}
          verticalLabelRotation={0}
        />
      </View>
    );
  }

  renderLineChart() {
    const data = {
      labels: [1, 2, 3, 4, 5],
      datasets: [
        {
          data: this.getCountForPrice(),
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
          strokeWidth: 3 // optional
        }
      ]
    };
    const chartConfig = {
      backgroundGradientFrom: Colors.darkTangerine,
      backgroundGradientTo: Colors.secondaryColor,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 1
    };
    return (
      <View>
        <Text style={[styles.graphHeaderStyle, { marginBottom: scale(10) }]}>
          {Strings.graph._line_chart_description}
        </Text>
        <LineChart
          data={data}
          width={screenWidth - 20}
          height={scale(screenWidth)}
          chartConfig={chartConfig}
        />
      </View>
    );
  }
  renderColorDescription(data) {
    return data.map((dataItem, index) => {
      return (
        <View style={{ flexDirection: "row" }} key={index}>
          <View
            style={[
              styles.colorCodeContainer,
              { backgroundColor: dataItem.color }
            ]}
          ></View>
          <Text>{dataItem.name}</Text>
        </View>
      );
    });
  }
  renderPieChart() {
    const chartConfig = {
      backgroundGradientFrom: Colors.darkTangerine,
      backgroundGradientTo: Colors.secondaryColor,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2
    };

    const data = this.formPieChartDataObject(
      this.getCountOfRestauntsBasedOnPrice()
    );

    return (
      <View style={{ marginVertical: scale(20) }}>
        <Text style={[styles.graphHeaderStyle, { marginBottom: scale(10) }]}>
          {Strings.graph._pie_chart_description}
        </Text>
        <View style={{ flexDirection: "row" }}>
          {this.renderColorDescription(data)}
        </View>
        <PieChart
          data={data}
          width={screenWidth - 60}
          height={220}
          chartConfig={chartConfig}
          accessor="count"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
    );
  }

  render() {
    const { restaurantData } = this.props;

    if (restaurantData && restaurantData.length > 0) {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.screenHeaderContainer}>
            <Text style={styles.screenHeaderText}>
              {Strings.graph._graph_screen_header}
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, marginHorizontal: scale(10) }}
          >
            {this.renderBarChart()}
            {this.renderLineChart()}
            {this.renderPieChart()}
          </ScrollView>
        </SafeAreaView>
      );
    } else
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errTextStyle}>{Strings.general.error_msg}</Text>
        </View>
      );
  }
}

const mapStateToProps = state => ({
  restaurantData: state.restauantDataReducer.restaurantData
});
export const Graph = connect(mapStateToProps, null)(GraphC);

const styles = StyleSheet.create({
  colorCodeContainer: {
    width: scale(15),
    height: scale(15),
    marginHorizontal: scale(5)
  },
  errTextStyle: {
    fontSize: scale(14),
    color: Colors.warningColor,
    fontWeight: "bold",
    textAlign: "center"
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(20)
  },
  screenHeaderText: {
    color: Colors.placeholderText,
    fontWeight: "bold",
    fontSize: scale(15)
  },
  screenHeaderContainer: {
    backgroundColor: Colors.greyLight,
    padding: scale(20),
    alignItems: "center",
    justifyContent: "center"
  },
  graphHeaderStyle: {
    color: Colors.secondaryColor,
    fontWeight: "bold",
    fontSize: scale(14)
  }
});
