import { AiOutlineCheck } from "react-icons/ai";

const OptionListItem = ({ handleOptionClick, option, value }) => {
  const isSelected = value.includes(option);
  return (
    <div
      className={`list-item ${isSelected ? "selected-list-item" : ""}`}
      onClick={() => handleOptionClick(option)}
    >
      <div className="option-wrapper">
        <img width={20} height={20} src={option.image} alt="user-icon" />
        <span>{option.title}</span>
      </div>
      {!!isSelected && <AiOutlineCheck className="check-icon" />}
    </div>
  );
};

export default OptionListItem;
