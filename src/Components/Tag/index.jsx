import { AiOutlineClose } from "react-icons/ai";
import "./index.css";

const Tag = ({ option, onDelete }) => {
  return (
    <div className="tag" onClick={onDelete}>
      <img width={20} height={20} src={option.image} alt="user-icon" />
      <span>{option.title}</span>
      <AiOutlineClose className="close-icon" />
    </div>
  );
};

export default Tag;
