import React from 'react';
import {IIDQA_INPUT} from "../Stage/Stage";
import Zoom from '@material-ui/core/Zoom';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

export default function Results(
  {
    setJsonInput,
    jsonInput
  } :
  {
    setJsonInput: React.Dispatch<React.SetStateAction<IIDQA_INPUT>>,
    jsonInput: IIDQA_INPUT
  }
) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '32px 0'
    }}>

        {jsonInput.passed ? (
          <div>
            <div>
              <Zoom in={true} timeout={1000}>
                <DoneIcon style={{
                  fontSize: '250px',
                  color: 'green'
                }}/>
              </Zoom>
            </div>
            <div>
              Verification successful!
            </div>
          </div>
        ) : (
          <div>
            <div>
              <Zoom in={true} timeout={1000}>
                <ClearIcon style={{
                  fontSize: '250px',
                  color: 'red'
                }}/>
              </Zoom>
            </div>
            <div>
              Verification failed
            </div>
          </div>
        )}
    </div>
  );
}