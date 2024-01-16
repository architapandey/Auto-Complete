import { useEffect, useRef, useState } from "react";
import OptionListItem from "./OptionListItem.jsx";
import Tag from "../Tag/index.jsx";
import "./index.css";

const CustomAutocomplete = ({ options, defaultValue }) => {
  const [value, setValue] = useState(defaultValue || []);
  const [focused, setFocused] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const inputRef = useRef(null);
  const listboxRef = useRef(null);

  useEffect(() => {
    // Add click event listener to handle clicks outside the input and listbox
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        listboxRef.current &&
        !listboxRef.current.contains(event.target)
      ) {
        setFilteredOptions([]);
        setFocused(false);
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDelete = (index) => {
    const newValue = [...value];
    newValue.splice(index, 1);
    setValue(newValue);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    const filteredOptions = options.filter((option) =>
      option.title.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredOptions(filteredOptions);
  };

  const handleOptionClick = (option) => {
    const isSelected = value.includes(option);

    if (!isSelected) {
      const newValue = [...value, option];
      setValue(newValue);
    } else {
      const newValue = value.filter((item) => item !== option);
      setValue(newValue);
    }

    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setFilteredOptions([]);
  };

  return (
    <div className="root">
      <div className={`input-wrapper ${focused ? "focused" : ""}`}>
        {value.map((option, index) => (
          <Tag option={option} onDelete={() => handleDelete(index)} />
        ))}
        <input
          ref={inputRef}
          className="input-box"
          onFocus={() => {
            setFocused(true);
            setFilteredOptions(options);
          }}
          onChange={handleInputChange}
        />
      </div>
      <div className="list-box" ref={listboxRef}>
        {focused &&
          filteredOptions.map((option) => (
            <OptionListItem
              handleOptionClick={handleOptionClick}
              option={option}
              value={value}
            />
          ))}
      </div>
    </div>
  );
};

export default CustomAutocomplete;
