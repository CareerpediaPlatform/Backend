import  { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import "./CopyInputText.scss";

const CopyInputText = () => {
  const [inputValue, setInputValue] = useState("Careerpedia.co");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    alert(inputValue);
  };

  return (
    <div className="inputText">
      <CopyToClipboard text={inputValue} onCopy={handleCopy}>
      <input type="text" value={inputValue && inputValue} placeholder="link" readOnly/>
      </CopyToClipboard>
      
    </div>
  );
};

export default CopyInputText;
