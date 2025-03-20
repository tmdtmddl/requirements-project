import React, { Ref } from "react";

interface Props {
  id: string;
  value: string;
  onChange: (value: string) => void;
  ref: Ref<HTMLInputElement | HTMLSelectElement>;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  isSelectTag?: boolean;
  data?: string;
}
const TextInput = ({
  id,
  label,
  onChange,
  ref,
  value,
  data,
  isSelectTag,
  placeholder,
  type,
}: Props) => {
  return (
    <div>
      <label htmlFor=""></label>
      {isSelectTag ? (
        <select>
          <option value="" />
        </select>
      ) : (
        <input />
      )}
    </div>
  );
};

export default TextInput;
