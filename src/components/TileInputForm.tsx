import {useState} from "react";
import {VALID_CHARS} from "../mathler/Constants";

type TileInputFormProps = {
    onSubmit: Function,
    onDelete: Function
}

export default function TileInputForm({ onSubmit, onDelete } : TileInputFormProps) {

    const [val, setVal] = useState('');

    return (
      <div className="flex w-1/2 m-auto mt-4 justify-between">
          <input className="rounded-md p-2" type="text" value={val} placeholder="Input next value" onChange={(e) => setVal(e.target.value)}/>
          <button
              disabled={val.length !== 1 || !VALID_CHARS.includes(val)}
              className="rounded-md text-white"
              onClick={() => onSubmit(val)}>
              Submit</button>
          <button className="rounded-md text-white"
                  onClick={() => onDelete}>
              Delete</button>
      </div>
    );
}
