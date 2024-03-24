import React from "react";

function decodeHTMLEntities(text) {
  var txt = document.createElement("textarea");
  txt.innerHTML = text;
  return txt.value;
}

export default function QuestionWithOptions(props) {
  const decodedQuestion = decodeHTMLEntities(props.questionText);

  function getStyle(isSelected, isCorrect) {
    let style = props.isAnswerPage
      ? isCorrect
        ? { backgroundColor: "#94D7A2" }
        : isSelected && !isCorrect
        ? { backgroundColor: "#F8BCBC" }
        : {}
      : isSelected
      ? { backgroundColor: "#D6DBF5" }
      : {};
    return style;
  }
  const optionsElements = props.options.map((option) => {
    const decodedOption = decodeHTMLEntities(option.optionTxt);
    return (
      <div
        className="m-2 cursor-pointer rounded-xl border border-[#4D5B9E] py-2 px-4 font-semibold text-[#293264]"
        style={getStyle(option.isSelected, option.isCorrect)}
        key={option.optid}
        onClick={() => props.onOptionClick(props.qid, option.optid)}
      >
        {decodedOption}
      </div>
    );
  });
  return (
    <div className="">
      <h1 className="mt-2 text-center text-2xl font-bold text-[#293264]">
        {decodedQuestion}
      </h1>

      <div className="m-2 mt-2 mb-4 flex flex-row justify-center rounded-xl py-2 px-4 font-semibold text-[#293264]">
        {optionsElements}
      </div>
      <hr />
    </div>
  );
}
