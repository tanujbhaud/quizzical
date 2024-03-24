import React, { useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import QuestionWithOptions from "./QuestionWithOptions";

export default function Main() {
  const [loading, setloading] = useState(true);
  const [questionData, setQuestionData] = React.useState([]);
  const [amount, setamount] = useState("5");
  const [difficulty, setdifficulty] = useState("");
  const [category, setcategory] = useState("");
  const [type, settype] = useState("");
  const [pageFlags, setPageFlags] = React.useState({
    isStartPage: true,
    isAnswerPage: false,
    correctAnswerCount: 0,
  });

  function convertData(data) {
    const questionArr = [];
    for (let i = 0; i < data.results.length; i++) {
      //options
      const answers = [];
      answers.push({
        optid: nanoid(),
        optionTxt: data.results[i].correct_answer,
        isCorrect: true,
        isSelected: false,
      });
      const incorrectAnswers = data.results[i].incorrect_answers.map((ica) => {
        return {
          optid: nanoid(),
          optionTxt: ica,
          isCorrect: false,
          isSelected: false,
        };
      });
      questionArr.push({
        qid: nanoid(),
        questionText: data.results[i].question,
        options: shuffleArray(answers.concat(incorrectAnswers)),
      });
    }
    // console.log(questionArr);
    setQuestionData(questionArr);
  }

  function fetchQuestions() {
    setloading(true);
    axios
      .get("https://opentdb.com/api.php", {
        params: {
          amount: amount,
          difficulty: difficulty,
          category: category,
          type: type,
        },
      })
      .then((res) => {
        convertData(res.data);
        setloading(false);
      });
    // fetch("").then((response) => response.json());

    //change the page
    setPageFlags((prevFlags) => {
      return { isStartPage: false, isAnswerPage: false, correctAnswerCount: 0 };
    });
  }
  function onOptionClick(qid, optid) {
    //
    setQuestionData((preQuestionData) => {
      const postData = preQuestionData.map((question) => {
        const newQuestion =
          question.qid === qid
            ? {
                ...question,
                options: question.options.map((option) => {
                  const newOption =
                    option.optid === optid
                      ? {
                          ...option,
                          isSelected: !option.isSelected,
                        }
                      : { ...option, isSelected: false };
                  return newOption;
                }),
              }
            : question;
        return newQuestion;
      });
      return postData;
    });
  }

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      // Generate random number
      var j = Math.floor(Math.random() * (i + 1));

      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  }
  const questionElements = questionData.map((question) => {
    return (
      <QuestionWithOptions
        key={question.qid}
        questionText={question.questionText}
        options={question.options}
        qid={question.qid}
        onOptionClick={onOptionClick}
        isAnswerPage={pageFlags.isAnswerPage}
      />
    );
  });
  function checkAnswersOrPlayAgain() {
    //if isSelected and isCorrect Same increase the counter
    if (!pageFlags.isAnswerPage) {
      let correctAnswersCount = 0;

      questionData.forEach((question) => {
        question.options.forEach((option) => {
          option.isSelected && option.isCorrect && correctAnswersCount++;
        });
      });

      setPageFlags((prevFlags) => {
        return {
          ...prevFlags,
          correctAnswerCount: correctAnswersCount,
          isAnswerPage: true,
        };
      });
    } else {
      fetchQuestions();
    }
  }

  return (
    <div>
      {pageFlags.isStartPage ? (
        <>
          <div className=" flex h-[300px] w-full flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-10 text-[#293264]">
              Quizzical
            </h1>

            <div class="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  for="noq"
                  class="block mb-2 text-sm font-medium text-[#4D5B9E] "
                >
                  Number of Questions{" "}
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    setamount(e.target.value);
                  }}
                  id="noq"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:[#4D5B9E] focus:border-[#4D5B9E] block w-full p-2.5"
                  placeholder="Enter Amount of questions"
                  required
                />
              </div>
              <div>
                <label
                  for="categories"
                  class="block mb-2 text-sm font-medium text-[#4D5B9E] "
                >
                  Select an option
                </label>
                <select
                  id="categories"
                  onChange={(e) => {
                    setcategory(e.target.value);
                  }}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4D5B9E] focus:border-[#4D5B9E] block w-full p-2.5 "
                >
                  <option selected>Select Category</option>
                  <option value="any">Any Category</option>
                  <option value="9">General Knowledge</option>
                  <option value="10">Entertainment: Books</option>
                  <option value="11">Entertainment: Film</option>
                  <option value="12">Entertainment: Music</option>
                  <option value="13">
                    Entertainment: Musicals &amp; Theatres
                  </option>
                  <option value="14">Entertainment: Television</option>
                  <option value="15">Entertainment: Video Games</option>
                  <option value="16">Entertainment: Board Games</option>
                  <option value="17">Science &amp; Nature</option>
                  <option value="18">Science: Computers</option>
                  <option value="19">Science: Mathematics</option>
                  <option value="20">Mythology</option>
                  <option value="21">Sports</option>
                  <option value="22">Geography</option>
                  <option value="23">History</option>
                  <option value="24">Politics</option>
                  <option value="25">Art</option>
                  <option value="26">Celebrities</option>
                  <option value="27">Animals</option>
                  <option value="28">Vehicles</option>
                  <option value="29">Entertainment: Comics</option>
                  <option value="30">Science: Gadgets</option>
                  <option value="31">
                    Entertainment: Japanese Anime &amp; Manga
                  </option>
                  <option value="32">
                    Entertainment: Cartoon &amp; Animations
                  </option>
                </select>
              </div>
              <div>
                <label
                  for="diff"
                  class="block mb-2 text-sm font-medium text-[#4D5B9E] "
                >
                  Select Difficulty
                </label>
                <select
                  onChange={(e) => {
                    setdifficulty(e.target.value);
                  }}
                  id="diff"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4D5B9E] focus:border-[#4D5B9E] block w-full p-2.5 "
                >
                  <option selected>Any Difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div>
                <label
                  for="type"
                  class="block mb-2 text-sm font-medium text-[#4D5B9E] "
                >
                  Select Type
                </label>
                <select
                  onChange={(e) => {
                    settype(e.target.value);
                  }}
                  id="type"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4D5B9E] focus:border-[#4D5B9E] block w-full p-2.5 "
                >
                  <option seleected>Any Type</option>
                  <option value="multiple">Multiple Choice</option>
                  <option value="boolean">True / False</option>
                </select>
              </div>
            </div>

            <button
              className="mt-4 rounded-md bg-[#4D5B9E] p-3 text-white"
              onClick={fetchQuestions}
            >
              Start Quiz
            </button>
          </div>
        </>
      ) : (
        <div id="questions-page">
          {questionElements}
          <div className="flex items-center justify-center" id="buttonAndText">
            {pageFlags.isAnswerPage && (
              <h1 className="question">
                You score is {pageFlags.correctAnswerCount}/{amount}
              </h1>
            )}
            {loading && (
              <div className="flex justify-center items-center">
                Loading...{" "}
              </div>
            )}
            <button
              className="ml-4 mt-2 rounded-md bg-[#4D5B9E] p-3 text-white"
              onClick={checkAnswersOrPlayAgain}
            >
              {!pageFlags.isAnswerPage ? "Check Answers" : "Play Again"}
            </button>
            <button
              className="ml-4 mt-2 rounded-md bg-[#4D5B9E] p-3 text-white"
              onClick={() => [
                setPageFlags((prevFlags) => {
                  return {
                    isStartPage: true,
                    isAnswerPage: false,
                    correctAnswerCount: 0,
                  };
                }),
              ]}
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
