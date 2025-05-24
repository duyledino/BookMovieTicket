import React from "react";

function SelectCalendarPublic() {
  return <div>
    <div className="flex justify-between w-[55%]">
      <div className="flex w-[30%]">
        <label for="film">1. Day</label>
        <select id="film" value={1}>
          <option key={``}></option>
        </select>
      </div>
      <div></div>
    </div>
  </div>;
}

export default SelectCalendarPublic;
