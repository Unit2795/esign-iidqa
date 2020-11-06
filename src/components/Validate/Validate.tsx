import React from 'react';
import {IIDQA_INPUT} from "../Stage/Stage";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Validate(
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
      textAlign: "center"
    }}>
      <h2>Validating your data...</h2>
      <CircularProgress />
    </div>
  );
}