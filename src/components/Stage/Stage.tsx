import React from 'react';
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Name from "../Name/Name";
import Button from "@material-ui/core/Button";
import Collect from "../Collect/Collect";
import Initialize from "../Initialize/Initialize";
import Quiz from "../Quiz/Quiz";
import Validate from "../Validate/Validate";
import Results from "../Results/Results";

export enum IIDQA_STAGE {
  // Gather name/phone/email
  NAME,
  // Gather SSN or Driver's License
  COLLECT,
  // Transmit to lambda proxy
  INITIALIZE,
  // Present quiz questions and gather responses
  QUIZ,
  VALIDATE,
  RESULTS
}


export interface IIDQA_INPUT {
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  ssn: string,
  licenseNum: string,
  licenseIssuer: string,
  stage: IIDQA_STAGE,
  questionID: string
  questions: any,
  answers: any,
  activeQuestion: number,
  passed: null | boolean,
  conversationID: string
}

export default function Stage() {
  let [jsonInput, setJsonInput] = React.useState<IIDQA_INPUT>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    ssn: '',
    licenseNum: '',
    licenseIssuer: '',
    stage: 0,
    questionID: "0",
    questions: [],
    answers: [0, 0, 0],
    activeQuestion: 0,
    passed: null,
    conversationID: ""
  });

  let returnItem = (
    <p>
      Loading...
    </p>
  );

  if (jsonInput.stage === IIDQA_STAGE.NAME)
  {
    returnItem = (
      <Name setJsonInput={setJsonInput} jsonInput={jsonInput}/>
    );
  }
  else if (jsonInput.stage === IIDQA_STAGE.COLLECT)
  {
    returnItem = (
      <Collect setJsonInput={setJsonInput} jsonInput={jsonInput}/>
    );
  }
  else if (jsonInput.stage === IIDQA_STAGE.INITIALIZE)
  {
    returnItem = (
      <Initialize setJsonInput={setJsonInput} jsonInput={jsonInput}/>
    );
  }
  else if (jsonInput.stage === IIDQA_STAGE.QUIZ)
  {
    returnItem = (
      <Quiz setJsonInput={setJsonInput} jsonInput={jsonInput}/>
    );
  }
  else if (jsonInput.stage === IIDQA_STAGE.VALIDATE)
  {
    returnItem = (
      <Validate setJsonInput={setJsonInput} jsonInput={jsonInput}/>
    );
  }
  else if (jsonInput.stage === IIDQA_STAGE.RESULTS)
  {
    returnItem = (
      <Results setJsonInput={setJsonInput} jsonInput={jsonInput}/>
    );
  }

  async function putResponses() {
    let responses = [];

    for (let i = 0; i < jsonInput.questions.length; i++)
    {
      responses.push(
        {
          "QuestionId": jsonInput.questions[i].QuestionId,
          "Choices": [
            {
              "Choice": `${jsonInput.answers[i]}`
            }
          ]
        }
      );
    }

    let body = {
        "conversationID": jsonInput.conversationID,
        "Type": "Continue",
        "Settings": {
          "Mode": "testing",
          "Locale": "en_US",
          "Venue": "online"
        },
        "Answers":       {
          "QuestionSetId": jsonInput.questionID,
          "Questions": responses
        }
      }
    ;

    let options = {
      "method": "put",
      "headers": {
        "Content-Type": "application/json"
      },
      "body": JSON.stringify(body)
    };

    // @ts-ignore
    let res = await fetch("https://xsovmd3uyg.execute-api.us-east-1.amazonaws.com/Prod/proxy", options);

    let parsable = await res.text();

    let data = JSON.parse(parsable);

    if (data.Status.TransactionStatus !== "passed")
    {
      setJsonInput(prevState => {
        return({
          ...prevState,
          questions: [],
          answers: [],
          ssn: '',
          licenseIssuer: '',
          licenseNum: '',
          firstName: '',
          phone: '',
          email: '',
          lastName: '',
          passed: false,
          stage: 5
        })
      })
    }
    else
    {
      for (let x = 0; x < data.Products.length; x++)
      {
        if (data.Products[x].ProductType === "IIDQA" && data.Products[x].ProductStatus === "pass")
        {
          setJsonInput(prevState => {
            return({
              ...prevState,
              questions: [],
              answers: [],
              ssn: '',
              licenseIssuer: '',
              licenseNum: '',
              firstName: '',
              phone: '',
              email: '',
              lastName: '',
              passed: true,
              stage: 5
            })
          })
        }
        else
        {
          setJsonInput(prevState => {
            return({
              ...prevState,
              questions: [],
              answers: [],
              ssn: '',
              licenseIssuer: '',
              licenseNum: '',
              firstName: '',
              phone: '',
              email: '',
              lastName: '',
              passed: false,
              stage: 5
            })
          })
        }
      }
    }
  }

  async function gatherQuestions() {
    let person: any = {
      "Context": "primary"
    };

    person["Name"] = {
      "FirstName": jsonInput.firstName,
      "LastName": jsonInput.lastName
    };

    if (jsonInput.phone !== "")
    {
      person["Phones"] = [{
        "Number": jsonInput.phone,
        "Context": "mobile",
        "Country": "US"
      }];
    }

    if (jsonInput.email !== "")
    {
      person["Emails"] = [jsonInput.email];
    }

    if (jsonInput.licenseNum.length >= 1)
    {
      person["Licenses"] = [{
          "Number": jsonInput.licenseNum,
          "Issuer": jsonInput.licenseIssuer,
          "Type": "drivers"
      }]
    }
    if (jsonInput.licenseNum.length >= 1)
    {
      person["SSN"] = [{
        "Number": jsonInput.ssn,
        "Type": "ssn9"
      }]
    }


    let body = JSON.stringify({
      "Type": "Initiate",
      "Settings":
        {
          "Mode": "testing",
          "SimulationType": "random",
          "Reference": "string",
          "Locale": "en_US",
          "Venue": "online"
        },
      "Persons": [
        person
      ]
    });

    let options = {
      "method": "post",
      "headers": {
        "Content-Type": "application/json"
      },
      "body": body
    };

    // @ts-ignore
    let res = await fetch("https://xsovmd3uyg.execute-api.us-east-1.amazonaws.com/Prod/proxy", options);

    let parsable = await res.text();

    let data = JSON.parse(parsable);

    if(data.Status.TransactionStatus === "failed")
    {
      alert('Individual could not be found');
      window.location.replace('/');
    }
    else
    {
      for (let i = 0; i < data.Products.length; i++)
      {
        if (data.Products[i].ProductType === "IIDQA")
        {
          setJsonInput(prevState => {
            return({
              ...prevState,
              questionID: data.Products[i].QuestionSet.QuestionSetId,
              questions: data.Products[i].QuestionSet.Questions,
              conversationID: data.Status.ConversationId,
              stage: 3
            });
          })
        }
      }
    }
  }

  async function increment()
  {
    setJsonInput(prevState => {
      if (prevState.stage === 0 && prevState.lastName.length >= 1 && prevState.firstName.length >= 1)
      {
        return({
          ...prevState,
          stage: 1
        })
      }
      else if (prevState.stage === 1)
      {
        gatherQuestions();
        return({
          ...prevState,
          stage: 2
        })
      }
      else if (prevState.stage === IIDQA_STAGE.QUIZ)
      {
        if (prevState.activeQuestion !== (prevState.questions.length -1))
        {
          return({
            ...prevState,
            activeQuestion: (prevState.activeQuestion + 1)
          });
        }
        else
        {
          putResponses();
          return({
            ...prevState,
            stage: 4
          });
        }
      }
      return ({...prevState})
    });
  }

  return (
    <div>
      <Card>
        <div style={{
          textAlign: 'center',
          background: "linear-gradient(90deg, #0033cc 0%, #006bb3 100%)"
        }}>
          <h1 style={{
            color: '#d9d9d9',
            padding: '24px 16px 24px 16px',
            margin: '0'
          }}>
                <span style={{
                  color: '#66ccff',
                  paddingRight: '12px'
                }}>
                  eSign Genie
                </span>
            Identity Questionnaire
          </h1>
        </div>
        {returnItem}
      </Card>
      {
        [2, 4, 5].includes(jsonInput.stage) ? ('') : (
          <Button type="submit" variant={"contained"} color="primary" style={{
            margin: 'auto',
            display: 'block'
          }} onClick={event => increment()}>Next</Button>
        )
      }

    </div>
  );
}