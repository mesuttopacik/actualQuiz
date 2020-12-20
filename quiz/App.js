import React, { Component } from "react";
import { View, Text } from "react-native";

import {} from "react-native/Libraries/NewAppScreen";
import Quiz from "./android/app/src/component/Quiz/Quiz";

class App extends Component {
  render() {
    return (
      <View>
        <Text>app sayfası</Text>
        <Quiz />
      </View>
    );
  }
}

export default App;
