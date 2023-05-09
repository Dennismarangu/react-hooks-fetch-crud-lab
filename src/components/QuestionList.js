import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";
import NewQuestionForm from "./NewQuestionForm";
import axios from "axios";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [setPage] = useState("List");


  useEffect(() => {
    axios.get("http://localhost:4000/questions")
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/questions/${id}`)
      .then(response => {
        setQuestions(questions.filter(question => question.id !== id));
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleCorrectIndexChange = (id, correctIndex) => {
    axios.patch(`http://localhost:4000/questions/${id}`, { correctIndex })
      .then(response => {
        const updatedQuestions = questions.map(question => {
          if (question.id === id) {
            return {
              ...question,
              correctIndex
            };
          } else {
            return question;
          }
        });
        setQuestions(updatedQuestions);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleNewQuestionSubmit = (formData) => {
    axios.post("http://localhost:4000/questions", formData, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        const newQuestion = response.data;
        setQuestions([...questions, newQuestion]);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <button onClick={() => setPage("Form")}>New Question</button>
      <ul>
        {questions.map(question => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={() => handleDelete(question.id)}
            onCorrectIndexChange={(correctIndex) => handleCorrectIndexChange(question.id, correctIndex)}
          />
        ))}
      </ul>
      <NewQuestionForm onSubmit={handleNewQuestionSubmit} />
    </section>
  );
}

export default QuestionList;
