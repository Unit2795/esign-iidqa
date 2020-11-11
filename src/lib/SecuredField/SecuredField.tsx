import React from 'react';
import TextField, {TextFieldProps} from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import Input, {InputProps} from '@material-ui/core/Input';
import {FormControl, InputLabel, OutlinedInputProps} from "@material-ui/core";
import OutlinedInput from "@material-ui/core/OutlinedInput";

export default function SecuredField(props: TextFieldProps) {
  let [masked, setMasked] = React.useState(true);

  const handleClickShowPassword = () => {
    setMasked(prevState => {
      return(!prevState);
    });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  return (
      <TextField {...props} type={!masked ? 'text' : 'password'} InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {!masked ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        )
      }}/>
  );
}