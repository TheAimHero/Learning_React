import React, { useReducer, useEffect, Fragment } from "react";

import Header from "./components/utils/Header";
import Main from "./components/utils/Main";
import Loader from "./components/utils/Loader";
import Error from "./components/utils/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import OptionList from "./components/Options";
import Button from "./components/utils/Button";
import ProgressBar from "./components/utils/ProgressBar";
import FinishScreen from "./components/FinishScreen";
import Timer from "./components/Timer";

const SECS_PER_QUESTION = 30;

function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "dataRecieved":
      return { ...state, questions: payload, status: "ready" };

    case "dataFailed":
      return { ...state, questions: [], status: "error" };

    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

    case "newAnswer":
      const question = state.questions[state.index];
      if (payload === question.correctOption) {
        return {
          ...state,
          answer: payload,
          points: state.points + question.points,
        };
      }

      return { ...state, answer: payload };

    case "nextQuestion":
      if (state.index < state.questions.length - 1) {
        return { ...state, index: state.index + 1, answer: null };
      }
      return { ...state, status: "finished", index: state.index + 1 };

    case "tick":
      if (state.secondsRemaining - 1 === 0) {
        return { ...state, status: "finished" };
      }
      return { ...state, secondsRemaining: state.secondsRemaining - 1 };

    case "resetQuiz":
      return {
        ...state,
        index: 0,
        answer: null,
        points: 0,
        status: "ready",
        secondsRemaining: SECS_PER_QUESTION,
      };

    default:
      throw new Error("Action Unknown");
  }
}

const initialState = {
  questions: [],
  secondsRemaining: null,
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { questions, status, index, answer, points, secondsRemaining } = state;

  useEffect(() => {
    fetch("http://localhost:5000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => {
        dispatch({
          type: "dataFailed",
          payload: { questions: [], status: "error" },
        });
        console.log(err.message);
      });
  }, []);

  function handleNextQuestion() {
    dispatch({ type: "nextQuestion" });
  }

  function handleClick() {
    dispatch({ type: "start" });
  }

  function handleReset() {
    dispatch({ type: "resetQuiz" });
  }

  const totalPoints = questions.reduce((prev, question) => {
    return prev + question.points;
  }, 0);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={questions.length} onClick={handleClick} />
        )}
        {status === "active" && (
          <Fragment>
            <ProgressBar
              points={points}
              index={index}
              totalPoints={totalPoints}
              answer={answer}
              totalQuestions={questions.length}
            />
            <Question question={questions[index]}>
              <OptionList
                question={questions[index]}
                dispatch={dispatch}
                answer={answer}
              />
            </Question>
            <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
            {answer !== null && (
              <Button className="btn" onClick={handleNextQuestion}>
                Next
              </Button>
            )}
          </Fragment>
        )}
        {status === "finished" && (
          <Fragment>
            <FinishScreen points={points} totalPoints={totalPoints} />
            <Button className="btn" onClick={handleReset}>
              Restart Quiz
            </Button>
          </Fragment>
        )}
      </Main>
    </div>
  );
}
