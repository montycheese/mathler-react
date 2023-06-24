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
      <div className="flex w-1/2 m-auto mt-4 gap-x-2 justify-items-start">
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
              className="text-white text-white bg-gray-900 p-2 rounded-lg disabled:bg-gray-800 hover:bg-gray-800"
              onClick={() => {
                  const lastChar = currentEquation[currentEquation.length - 1];
                  if (isOperator(lastChar) && isOperator(val)) {
                      // two operators can not be side by side
                      console.error('Invalid input');
                  } else if (isOperator(val) && (currentEquation.length === 0 || currentEquation.length === 5)) {
                      // first or last char cannot be an operator
                      console.error('Invalid input');
                  } else if (lastChar === '0' && !isOperator(val)) {
                      // do not allow putting a number after 0
                      console.error('Invalid input');
                  } else if (lastChar === '/' && val === '0') {
                      // prevent divide by 0
                      console.error('Invalid input');

                  } else {
                      onAdd(val);
                      setVal('');
                  }
              }}>
              Add</button>
          <button className="text-white text-white bg-gray-900 p-2 rounded-lg disabled:bg-gray-800 hover:bg-gray-800"
                  disabled={currentEquation.length === 0}
                  onClick={() => onDelete()}>
              Delete</button>
      </div>
    );
}
