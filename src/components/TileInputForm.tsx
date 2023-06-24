import {useState} from "react";
import {MAX_CHARS_PER_ROW, VALID_CHARS} from "../mathler/Constants";

type TileInputFormProps = {
    onAdd: Function,
    onDelete: Function,
    currentEquation: string[]
}

export default function TileInputForm({ onAdd, onDelete, currentEquation } : TileInputFormProps) {

    const [val, setVal] = useState('');

    const isOperator = (char: string) => '+-*/'.includes(char);

    return (
      <div className="flex w-1/2 m-auto mt-4 justify-between">
          <input disabled={currentEquation.length >= MAX_CHARS_PER_ROW}
                 className="rounded-md p-2"
                 type="text"
                 value={val}
                 placeholder="Input next value"
                 maxLength={1}
                 onChange={(e) => {
                     if (VALID_CHARS.includes(e.target.value)) {
                         setVal(e.target.value)
                     }
                 }}/>
          <button
              disabled={val.length !== 1 || !VALID_CHARS.includes(val) || currentEquation.length === MAX_CHARS_PER_ROW}
              className="rounded-md text-white"
              onClick={() => {
                  if (isOperator(currentEquation[currentEquation.length-1]) && isOperator(val)) {
                      console.error('Invalid input');
                  } else if (isOperator(val) && currentEquation.length === 0) {
                      console.error('Invalid input');
                  } else {
                      onAdd(val);
                      setVal('');
                  }
              }}>
              Add</button>
          <button className="rounded-md text-white"
                  disabled={currentEquation.length === 0}
                  onClick={() => onDelete()}>
              Delete</button>
      </div>
    );
}