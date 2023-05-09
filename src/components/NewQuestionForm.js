import React, { useState } from "react";

function NewQuestionForm(props) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit({ question, options, correctIndex });
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectIndex(0);
  };

  const handleOptionChange = (event, index) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Question:
        <input type="text" value={question} onChange={(event) => setQuestion(event.target.value)} />
      </label>
      {options.map((option, index) => (
        <label key={index}>
          Option {index + 1}:
          <input type="text" value={option} onChange={(event) => handleOptionChange(event, index)} />
        </label>
      ))}
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={(event) => setCorrectIndex(event.target.value)}>
          {options.map((option, index) => (
            <option key={index} value={index}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default NewQuestionForm;
