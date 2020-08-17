import React, { Component } from "react";
import { Provider } from "react-redux";

import getStore from "./src/redux/store";
import AppWithNavigationState from "./src/navigators/AppNavigator";

class App extends Component {
  render() {
    return (
      <Provider store={getStore()}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default App;
