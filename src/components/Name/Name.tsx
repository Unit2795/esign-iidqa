import React from 'react';
import TextField from "@material-ui/core/TextField";
import {IIDQA_INPUT} from "../Stage/Stage";

export default function Name(
  {
    setJsonInput,
    jsonInput
  } :
  {
    setJsonInput: React.Dispatch<React.SetStateAction<IIDQA_INPUT>>,
    jsonInput: IIDQA_INPUT
  }) {
  return (
    <div>
      <form>
          <div style={{
            margin: '16px auto',
            padding: '16px',
            maxWidth: '512px'
          }}>
            <TextField fullWidth label={"First Name"} variant={"outlined"} style={{
              margin: '24px auto'
            }} onChange={event => {
              setJsonInput(prevState => {
                return({
                  ...prevState,
                  firstName: event.target.value
                });
              });
            }}/>
            <TextField fullWidth label={"Last Name"} variant={"outlined"} style={{
              margin: '24px auto'
            }} onChange={event => {
              setJsonInput(prevState => {
                return({
                  ...prevState,
                  lastName: event.target.value
                });
              });
            }}/>
            <TextField fullWidth label={"Email (Optional)"} variant={"outlined"} style={{
              margin: '24px auto'
            }} onChange={event => {
              setJsonInput(prevState => {
                return({
                  ...prevState,
                  email: event.target.value
                });
              });
            }}/>
            <TextField fullWidth label={"Phone Number (Optional)"} variant={"outlined"} style={{
              margin: '24px auto'
            }} onChange={event => {
              setJsonInput(prevState => {
                return({
                  ...prevState,
                  phone: event.target.value
                });
              });
            }}/>
          </div>
      </form>
    </div>
  );
}