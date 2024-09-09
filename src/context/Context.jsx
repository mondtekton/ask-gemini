import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();
const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const onSent = async (prompt) => {

    setResultData("");

    setLoading(true);
    setShowResult(true);
    let response;
    if (prompt !== undefined) {
      setRecentPrompt(prompt);
      response = await runChat(prompt);
      setPrevPrompts((prev) => [prompt, ...prev]);
    } else {
      const request = input;
      setInput("");
      setRecentPrompt(request);
      setPrevPrompts((prev) => [request, ...prev]);
      response = await runChat(request);
    }
    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i % 2 === 0) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }

    let result = newResponse.split("*").join("</br>");
    let resultArray = result.split(" ");
    for (let i = 0; i < resultArray.length; i++) {
      const nextWord = resultArray[i] + " ";
      delayPara(i, nextWord);
    }
    setLoading(false);
  };
  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    recentPrompt,
    setRecentPrompt,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    input,
    setInput,
  };

  // eslint-disable-next-line react/prop-types
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
export default ContextProvider;
