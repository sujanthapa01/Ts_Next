import React from 'react'

interface ValidateButton {
    text : string;
    onClick? : () => void ;
    className? : string;

}

export default function button({text,onClick,className} : ValidateButton) {
  return (
   <button
    className={className ? className : "p-4 bg-blue-500 font-bold rounded-sm"} onClick={onClick}>{text}</button>
  )
}
