import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {IIDQA_INPUT} from "../Stage/Stage";
import TextField from "@material-ui/core/TextField";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';


export default function Collect(
  {
    setJsonInput,
    jsonInput
  } :
  {
    setJsonInput: React.Dispatch<React.SetStateAction<IIDQA_INPUT>>,
    jsonInput: IIDQA_INPUT
  }
) {
  let [select, setSelect] = React.useState('ssn');

  const handleChange = (event: any) => {
    setSelect(event.target.value);
  };

  let returnJSX = (<p>Loading...</p>);

  if (select === 'ssn')
  {
    returnJSX = (
      <TextField fullWidth label={"Social Security Number"} name={'ssn'} variant={"outlined"} style={{
        margin: '24px auto'
      }} onChange={event => {
        setJsonInput(prevState => {
          return({
            ...prevState,
            ssn: event.target.value
          });
        });
      }}/>
    );
  }
  else if (select === 'license')
  {
    returnJSX = (
      <React.Fragment>
        <TextField fullWidth label={"License Number"} name={'license-number'} variant={"outlined"} style={{
          margin: '24px auto'
        }} onChange={event => {
          setJsonInput(prevState => {
            return({
              ...prevState,
              licenseNum: event.target.value
            });
          });
        }}/>
        <TextField fullWidth label={"License Issuer"} name={'license-issuer'} variant={"outlined"} style={{
          margin: '24px auto'
        }} onChange={event => {
          setJsonInput(prevState => {
            return({
              ...prevState,
              licenseIssuer: event.target.value
            });
          });
        }}/>
      </React.Fragment>
    );
  }
  /*else if (select === "passport")
  {
    returnJSX = (
      <React.Fragment>
        <TextField fullWidth label={"Passport Number"} name={'passport-number'} variant={"outlined"} style={{
          margin: '24px auto'
        }}/>
        <TextField fullWidth label={"Country"} name={'passport-country'} variant={"outlined"} style={{
          margin: '24px auto'
        }}/>
        <TextField fullWidth label={"Issue Month"} name={'passport-issue-month'} variant={"outlined"} style={{
          margin: '24px auto'
        }}/>
        <TextField fullWidth label={"Issue Day"} name={'passport-issue-day'} variant={"outlined"} style={{
          margin: '24px auto'
        }}/>
        <TextField fullWidth label={"Issue Year"} name={'passport-issue-year'} variant={"outlined"} style={{
          margin: '24px auto'
        }}/>
        <TextField fullWidth label={"Expiration Month"} name={'passport-expiration-month'} variant={"outlined"} style={{
          margin: '24px auto'
        }}/>
        <TextField fullWidth label={"Expiration Day"} name={'passport-expiration-day'} variant={"outlined"} style={{
          margin: '24px auto'
        }}/>
        <TextField fullWidth label={"Expiration Year"} name={'passport-expiration-year'} variant={"outlined"} style={{
          margin: '24px auto'
        }}/>
      </React.Fragment>
    );
  }*/

  let formRef = React.useRef<any>();

  return (
    <div style={{
      margin: '24px auto',
      padding: '16px',
      maxWidth: '512px'
    }}>
      <FormControl fullWidth>
        <InputLabel>Choose Identification</InputLabel>
        <Select
          label={"Choose a credential"}
          value={select}
          onChange={handleChange}
          variant={"outlined"}>
          <MenuItem value={'ssn'}>SSN</MenuItem>
          <MenuItem value={'license'}>License</MenuItem>
        </Select>
      </FormControl>
      <div>
        {returnJSX}
      </div>
    </div>
  );
}