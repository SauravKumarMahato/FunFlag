import React, { useState } from 'react';
import { Input } from "@material-tailwind/react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = 'YOUR_GEMINI_API_KEY'

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

const AIFun = () => {


    // const initialQuestions = [];

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1); // Start at -1 to show the start screen
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [value, setValue] = useState(null);

    async function run() {
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = 'Related to field ' + value + ' generate me 10 question and answers in below format  ' + JSON.stringify([
            {
                id: 1,
                question: "What is the capital of France?",
                options: ["Paris", "London", "Berlin", "Rome"],
                answer: "Paris"
            },
            {
                id: 2,
                question: "Who wrote the play 'Hamlet'?",
                options: ["William Shakespeare", "Jane Austen", "Charles Dickens", "Leo Tolstoy"],
                answer: "William Shakespeare"
            }
        ]);
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        setQuestions(JSON.parse(text));
        setCurrentQuestionIndex(0);
        console.log("questions are", value, questions);
    }


    const handleStartGame = async () => {
        await run(); // Wait for questions to be fetched
    };

    const handleNextQuestion = () => {
        if (selectedOption !== null) {
            const currentQuestion = questions[currentQuestionIndex];
            if (selectedOption === currentQuestion.answer) {
                setScore(score + 1);
            }
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedOption(null); // Reset selected option for the next question
            } else {
                setCompleted(true);
            }
        } else {
            alert("Please select an option before moving to the next question.");
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedOption(null); // Reset selected option when moving to the previous question
        } else {
            setCurrentQuestionIndex(questions.length - 1);
            setSelectedOption(null); // Reset selected option when moving to the last question
        }
    };

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    const restartQuiz = () => {
        setCurrentQuestionIndex(-1); // Reset to the start screen
        setSelectedOption(null);
        setScore(0);
        setCompleted(false);
    };


    const handleClick = () => {
        if (value == null) {
            alert('Enter the field first');
        } else {
            handleStartGame(); // Call your first function
            run(); // Call your additional function
        }
    };



    return (
        <>
            <h1 className="text-2xl font-light mt-14">
                Welcome to AI Fun Question/Answer Game section powered by GEMINI
            </h1>

            <div className="flex justify-center my-20">
                <div className="relative w-[100vh] flex flex-col py-6 px-4 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
                    {currentQuestionIndex === -1 && (
                        <div className="p-6 text-center">
                            <p className="font-sans text-xl antialiased font-semibold leading-relaxed text-inherit">
                                Let's Start the Game
                            </p>

                            <p className="font-sans text-xl antialiased font-light leading-relaxed text-inherit">
                                You will be asked altogether 10 question from the field you select below.
                            </p>

                            <p className="font-sans text-xl antialiased font-light leading-relaxed text-inherit">
                                Answer those questions and finally get you score.
                            </p>

                            <div className="grid justify-center gap-4">

                                <button
                                    className="mt-4 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                    type="button"
                                    onClick={handleClick}
                                >
                                    Go
                                </button>

                                <div className="w-72">
                                    <Input label="Type field you want to get quesions from ?" value={value} onChange={(e) => (setValue(e.target.value))} />
                                </div>

                            </div>
                        </div>
                    )}
                    {currentQuestionIndex >= 0 && (
                        <>
                            <div className="p-6">
                                <h5 className="block mb-2 font-sans text-2xl antialiased leading-snug tracking-normal text-blue-gray-900">{questions[currentQuestionIndex].question}</h5>
                                <div className="text-xl mt-2">
                                    <ol>
                                        {questions[currentQuestionIndex].options.map((option, index) => (
                                            <li key={index} className="flex items-center space-x-2">
                                                <input
                                                    type="radio"
                                                    id={`option${index + 1}`}
                                                    name="options"
                                                    value={option}
                                                    checked={selectedOption === option}
                                                    onChange={() => handleOptionChange(option)}
                                                    className="h-4 w-4 text-gray-700 focus:ring-gray-900 border-gray-300 rounded"
                                                />
                                                <label htmlFor={`option${index + 1}`}>{option}</label>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                            <div className="p-6 pt-0 flex justify-between">
                                <button
                                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                    type="button"
                                    onClick={handlePreviousQuestion}
                                >
                                    Previous Question
                                </button>
                                <button
                                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                    type="button"
                                    onClick={completed ? restartQuiz : handleNextQuestion}
                                >
                                    {completed ? 'Restart Quiz' : 'Next Question'}
                                </button>
                            </div>
                            {completed && (
                                <div className="p-6">
                                    <p className="font-sans text-xl antialiased font-light leading-relaxed text-inherit">
                                        Your score: {score}/{questions.length}
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default AIFun;
