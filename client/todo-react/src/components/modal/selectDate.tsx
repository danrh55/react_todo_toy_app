import SelectDay from "./selectDay";
import SelectMonth from "./selectMonth";
import SelectYear from "./selectYear";

function SelectDate() {
  return (
    <li>
      <label htmlFor="due">Due Date</label>
      <div className="date">
        <SelectDay></SelectDay>  /
        <SelectMonth></SelectMonth>  /
        <SelectYear></SelectYear>
      </div>
    </li>
  )
}

export default SelectDate;
