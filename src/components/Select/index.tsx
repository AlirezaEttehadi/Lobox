"use client";

import React, { useState, useRef, useEffect } from "react";

import "./index.scss";

interface Option {
  label: string;
  value: string;
  icon?: string;
}

interface MultiSelectProps {
  options: Option[];
  onChange: (selectedItems: Option[]) => void;
  placeholder: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  onChange,
  placeholder,
}) => {
  const [selectedItems, setSelectedItems] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemToggle = (selectedItem: Option) => {
    if (selectedItems.find((item) => item.value === selectedItem.value)) {
      setSelectedItems(
        selectedItems.filter(
          (selected) => selected.value !== selectedItem.value
        )
      );
    } else {
      setSelectedItems([...selectedItems, selectedItem]);
    }
  };

  const generateSelectedItemsString = () => {
    if (selectedItems.length > 3) {
      return (
        selectedItems
          .map((item) => item.label)
          .slice(0, 3)
          .join(", ") + ", ..."
      );
    }
    return selectedItems.map((item) => item.label).join(", ");
  };

  useEffect(() => {
    onChange(selectedItems);
  }, [selectedItems, onChange]);

  return (
    <div className={`multi-select ${isOpen ? "open" : ""}`} ref={dropdownRef}>
      <div className="selected-items" onClick={toggleDropdown}>
        {selectedItems.length === 0 ? (
          <div className="placeholder">{placeholder}</div>
        ) : (
          generateSelectedItemsString()
        )}
        <div className={`chevron-icon ${isOpen ? "open" : ""}`}>&#6129;</div>
      </div>
      {isOpen && (
        <div className="dropdown">
          {options.map((option) => {
            const isSelected = selectedItems.find(
              (item) => item.value === option.value
            );
            return (
              <div
                key={option.value}
                className={`dropdown-item ${isSelected ? "selected" : ""}`}
                onClick={() => handleItemToggle(option)}
              >
                <div>
                  {option.label}
                  {option.icon && (
                    <span className="item-icon">{option.icon}</span>
                  )}
                </div>
                {isSelected && <span className="check-icon">&#10003;</span>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
