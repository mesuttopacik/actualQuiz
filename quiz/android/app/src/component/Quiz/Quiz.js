import React, {Component} from 'react';
import {Button, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {QuizData} from './QuizData';

class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      userAnswer: null,
      currentQuestion: 0,
      options: [],
    };
  }

  nextquestion = () => {
    this.setState({
      // ...this.state.userAnswer,
      currentQuestion: this.state.currentQuestion + 1,
    });
    // console.log("tiklandı")
  };
  loadQuiz = () => {
    const {currentQuestion} = this.state;
    this.setState(() => {
      return {
        questions: QuizData[currentQuestion].question,
        options: QuizData[currentQuestion].options,
        answers: QuizData[currentQuestion].answer,
      };
    });
  };
  componentDidMount() {
    this.loadQuiz();
  }
  listOptions = () => {
    return this.state.options.map((option) => {
      return (
        <View key={option} style={styles.optionsST}>
          <Button title={option}> </Button>
        </View>
      );
    });
  };
  render() {
    const {questions} = this.state;
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.questionSty}>
            <Text style={styles.questionText}> {questions} </Text>
          </View>
          <View>
            <View>{this.listOptions()}</View>
            <TouchableOpacity
              // onPress={this.nextquestion()}
              style={styles.nextButtonTocuhST}>
              <Text>sonraki soru >></Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  questionSty: {
    alignItems: 'center',
    backgroundColor: '#80ffcc',
    marginTop: 20,
    margin: 20,
  },
  questionText: {
    margin: 30,
  },
  nextButtonTocuhST: {
    marginTop: 60,
    alignItems: 'center',
  },
  optionsST: {
    marginTop: 20,
  },
});

export default Quiz;
