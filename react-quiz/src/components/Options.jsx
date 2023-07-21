export default function OptionList(props) {
  const { question, dispatch, answer } = props;

  function handleClick(ansIndex) {
    dispatch({ type: "newAnswer", payload: ansIndex });
  }

  const optionsArr = question.options.map((option, index) => {
    return (
      <button
        key={option}
        className={`btn btn-option 
          ${index === answer ? "answer" : ""} 
          ${
            answer !== null
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
        onClick={() => {
          handleClick(index);
        }}
        disabled={answer !== null}
      >
        {option}
      </button>
    );
  });

  return <div className="options">{optionsArr}</div>;
}
