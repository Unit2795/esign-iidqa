import React from 'react';
import {IIDQA_INPUT} from "../Stage/Stage";
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Initialize(
  {
    setJsonInput,
    jsonInput
  } :
    {
      setJsonInput: React.Dispatch<React.SetStateAction<IIDQA_INPUT>>,
      jsonInput: IIDQA_INPUT
    }) {
  return (
    <div style={{
      textAlign: "center",
      padding: '24px'
    }}>
      <h2>Validating your data...</h2>
      <p>{jsonInput.firstName} {jsonInput.lastName}</p>
      <p>{jsonInput.email}</p>
      <p>{jsonInput.phone}</p>
      <CircularProgress />
    </div>
  );
}