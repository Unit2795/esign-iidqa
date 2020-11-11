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
          <Zoom in={true}>
            <div>
              <DoneIcon style={{
                fontSize: '250px',
                color: 'green'
              }}/>
              <div>
                Verification successful!
              </div>
            </div>
          </Zoom>
        ) : (
          <div>
            <div>
              <Zoom in={true}>
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