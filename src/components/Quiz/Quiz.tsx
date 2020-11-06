import React from 'react';
import Radio from '@material-ui/core/Radio';
import {type} from "os";
import {IIDQA_INPUT} from "../Stage/Stage";

export default function Quiz(
  {
    setJsonInput,
    jsonInput
  } :
  {
    setJsonInput: React.Dispatch<React.SetStateAction<IIDQA_INPUT>>,
    jsonInput: IIDQA_INPUT
  }) {
  let returnJSX = [];

  if (jsonInput.questions.length === 3)
  {
    returnJSX = jsonInput.questions[jsonInput.activeQuestion].Choices.map((edge: any, index: number) => {
      return(
        <div key={edge.ChoiceId + jsonInput.questions[jsonInput.activeQuestion].QuestionId} style={{
          padding: '12px 0'
        }}>
          <label style={{
            cursor: "pointer"
          }}>
            <input type={'radio'} name={jsonInput.questions[jsonInput.activeQuestion].QuestionId} onChange={event => {
              setJsonInput(prevState => {
                prevState.answers[jsonInput.activeQuestion] = edge.ChoiceId;
                return({
                  ...prevState
                });
              })
            }}/>
            {edge.Text.Statement}
          </label>
        </div>
      );
    });

    return (
      <div style={{
        textAlign: 'center',
        padding: '32px 0'
      }}>
        <h2>Question {jsonInput.activeQuestion + 1}</h2>
        <h3>{jsonInput.questions[jsonInput.activeQuestion].Text.Statement}</h3>
        <p>{jsonInput.questions[jsonInput.activeQuestion].HelpText.Statement}</p>
        {returnJSX}
      </div>
    );
  }
  else
  {
    return <p>Loading...</p>
  }
}