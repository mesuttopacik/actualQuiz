import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {QuizData} from './QuizData';

class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      userAnswer: null,
      currentQuestion: 0,
      options: [],
      quizEnd: false,
      score: 0,
      empty: 0,
      wrong: 0,
    };
  }

  nextquestion = () => {
    const {userAnswer, answers, score, empty, wrong} = this.state;
    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
    });
    // console.log(this.state.currentQuestion);
    // console.log(userAnswer,answers)
    if(userAnswer === answers){
      this.setState({
        score : score + 1
      })
    }else if (userAnswer === null){
      this.setState({
        empty: empty + 1
      })
    }else{
      this.setState({
        wrong: wrong + 1
      })
    }
  };
  componentDidUpdate(prevProps, prevState) {
    const {currentQuestion} = this.state;
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(() => {
        return {
          questions: QuizData[currentQuestion].question,
          options: QuizData[currentQuestion].options,
          answers: QuizData[currentQuestion].answer,
        };
      });
    }
  }
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
  checkAnswer = (answer) => {
    // const correctAnswer = this.state.answers
    this.setState({
      userAnswer: answer,
    });
    // if (answer === correctAnswer)  { kullanıcı işari ile gerçek değeri alıp karşılaşrıdım çalışyor
    //   console.log('skor');
    // }
  };
  // if(userAnswer === answers){
  //   this.setState({
  //     score : score + 1
  //   })
  // }
  finishHandler = () => {
    // console.log('sinav bitti skor table sayafası> ');
    const {userAnswer, answers, score, wrong, empty} = this.state;
    if(userAnswer === answers){
      this.setState({
        score : score + 1
      })
    }else if (userAnswer === null){
      this.setState({
        empty: empty + 1
      })
    }else{
      this.setState({
        wrong: wrong + 1
      })
    }
    if (this.state.currentQuestion === QuizData.length - 1) {
      this.setState({
        quizEnd: true,
      });
    }
  };
  listOptions = () => {
    const {options, userAnswer} = this.state;
    return options.map((option) => {
      return (
        <View key={option} style={styles.optionsST}>
          <TouchableOpacity
            style={[
              styles.button,
              userAnswer === option ? styles.selected : null,
            ]} //why we have to use null, reseach
            onPress={() => this.checkAnswer(option)}>
            <Text style={userAnswer === option ? styles.selected : null}>
              {option}
            </Text>
          </TouchableOpacity>
        </View>
      );
    });
  };
  componentDidMount() {
    this.loadQuiz();
  }
  correctAnswerListHandler = ({item, index}) => {
    return(
      <View>
      <Text>{item.answer}</Text>
      </View>
    )
  }
  render() {
    const {questions, currentQuestion, quizEnd} = this.state;
    if (quizEnd) {
      return (
        <SafeAreaView>
          <Text>sonuç sayfası</Text>
          <Text>cevaplar</Text>
          <FlatList 
          renderItem = {this.correctAnswerListHandler}
          keyExtractor = {(item) => item.id}
          data = {QuizData}/>
          <View>
          <Text>doğru {this.state.score}</Text>
          <Text>boş {this.state.empty}</Text>
          <Text>yanlış {this.state.wrong}</Text>
          </View>
          
          
          
        </SafeAreaView>
      );
    }
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.questionSty}>
            <Text style={styles.questionText}> {questions} </Text>
          </View>
          <Text>
            {currentQuestion + 1} - {QuizData.length}
          </Text>
          <View>
            <View>{this.listOptions()}</View>
            {currentQuestion < QuizData.length - 1 && (
              <TouchableOpacity
                onPress={() => this.nextquestion()}
                style={styles.nextButtonTocuhST}>
                <Text>sonraki soru >></Text>
              </TouchableOpacity>
            )}
            {currentQuestion === QuizData.length - 1 && (
              <TouchableOpacity
                onPress={() => this.finishHandler()}
                style={styles.nextButtonTocuhST}>
                <Text>sınavı bitir</Text>
              </TouchableOpacity>
            )}
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
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 10,
  },
  selected: {
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
  },
});

export default Quiz;
