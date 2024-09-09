import { useContext, useRef } from "react";
import { assets } from "../../../assets/assets";
import { Context } from "../../context/Context";
import "./Main.css";
const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  } = useContext(Context);

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  const enterKeyPressed = (event) => {
    if (event.key === "Enter") input.length === 0 ? null : onSent();
  };

  const onSuggestionPressed = (suggestionRef) => {
    const prompt = suggestionRef.current.textContent;
    prompt !== null ? onSent(prompt) : nul;
  };

  return (
    <div className="main">
      <div className="nav">
        <p                                           >Chat Gemini</p>
        <img src={assets.user_icon} alt="user icon" />
      </div>
      {showResult ? (
        <div className="result">
          <div className="result-title">
            <img src={assets.user_icon} alt="" />
            <p>{recentPrompt}</p>
          </div>
          <div className="result-data">
            <img src={assets.gemini_icon} alt="" />
            {loading ? (
              <div className="loader">
                <hr />
                <hr />
                <hr />
              </div>
            ) : (
              <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
            )}
          </div>
        </div>
      ) : (
        <div className="main-container">
          <div className="greet">
            <p>
              <span>Hello, Dev</span>
            </p>
            <p>How can i help you today?</p>
          </div>
          <div className="cards">
            <div className="card" onClick={() => onSuggestionPressed(ref1)}>
              <p ref={ref1}>
                Suggest beautiful places to see on an upcoming road trip
              </p>
              <img src={assets.compass_icon} alt="" />
            </div>
            <div className="card" onClick={() => onSuggestionPressed(ref2)}>
              <p ref={ref2}>Briefly summarize this concept: urban planning</p>
              <img src={assets.bulb_icon} alt="" />
            </div>
            <div className="card" onClick={() => onSuggestionPressed(ref3)}>
              <p ref={ref3}>
                Brainstorm team bonding activities for our work retreat
              </p>
              <img src={assets.message_icon} alt="" />
            </div>
            <div className="card" onClick={() => onSuggestionPressed(ref4)}>
              <p ref={ref4}>Improve the readability of the following code</p>
              <img src={assets.code_icon} alt="" />
            </div>
          </div>
        </div>
      )}
      <div className="main-bottom">
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter a prompt here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={enterKeyPressed}
          />
          <div>
            <img src={assets.gallery_icon} alt="" />
            <img src={assets.mic_icon} alt="" />
            {input.length === 0 ? null : (
              <img
                src={assets.send_icon}
                alt=""
                onClick={() => (input.length === 0 ? null : onSent())}
              />
            )}
          </div>
        </div>
        <p className="bottom-info">
          Gemini may display inaccurate info, including about people, so
          double-check its responses.Your privacy and Gemini Apps
        </p>
      </div>
    </div>
  );
};

export default Main;
