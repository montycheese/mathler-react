import {useState} from "react";
import {MAX_CHARS_PER_ROW, VALID_CHARS} from "../mathler/Constants";

type TileInputFormProps = {
    onAdd: Function,
    onDelete: Function,
    isNextCharValid: Function,
    currentEquation: string[]
}

export default function TileInputForm({ onAdd, onDelete, currentEquation, isNextCharValid } : TileInputFormProps) {

    const [val, setVal] = useState('');



    const addVal = () => {
        const isValid = isNextCharValid(val);
        if (isValid) {
            onAdd(val);
            setVal('');
        }
    };


    return (
        <>
            <div className="flex w-4/5 sm:w-1/2 m-auto mt-4 gap-x-2 justify-center bg-slate-50	rounded-md p-2 drop-shadow-2xl">
                Input a number 0-9 or the math operation +, -, *, / to create an equation that equals the answer given.
            </div>
          <div className="flex w-full sm:w-1/2 m-auto mt-4 gap-x-2 justify-center">
              <input disabled={currentEquation.length >= MAX_CHARS_PER_ROW}
                     className="rounded-md p-2 drop-shadow-2xl"
                     type="text"
                     value={val}
                     placeholder="Input next value"
                     maxLength={1}
                     onChange={(e) => {
                         if (VALID_CHARS.includes(e.target.value)) {
                             setVal(e.target.value)
                         }
                     }}
                     onKeyDown={(e) => {
                         if (val.length > 0 && e.key === 'Enter') {
                             addVal();
                         }
                     }}
              />
              <button
                  disabled={val.length !== 1 || !VALID_CHARS.includes(val) || currentEquation.length === MAX_CHARS_PER_ROW}
                  className="text-white text-white bg-gray-900 p-2 rounded-lg drop-shadow-md disabled:opacity-25 hover:bg-gray-800 hover:drop-shadow-xl"
                  onClick={addVal}>
                  Add</button>
              <button className="text-white text-white bg-gray-900 p-2 rounded-lg drop-shadow-md disabled:opacity-25 hover:bg-gray-800 hover:drop-shadow-xl"
                      disabled={currentEquation.length === 0}
                      onClick={() => onDelete()}>
                  Delete</button>
          </div>
        </>
    );
}
