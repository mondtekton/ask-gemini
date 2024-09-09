import { useContext, useState } from "react";
import { assets } from "../../../assets/assets";
import { Context } from "../../context/Context";
import "./Sidebar.css";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const {
    onSent,
    prevPrompts,
    setRecentPrompt,
    setLoading,
    setShowResult,
    setInterrupt,
  } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img
          className="menu"
          src={assets.menu_icon}
          alt="Menu icon"
          onClick={() => setExtended((prev) => !prev)}
        />
        <div
          className="new-chat"
          onClick={() => {
            setLoading(false);
            setShowResult(false);
          }}
        >
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div
                  className="recent-entry"
                  key={index}
                  onClick={() => loadPrompt(item)}
                >
                  <img src={assets.message_icon} alt="Recent message icon" />
                  <p>{item.slice(0, 15)}...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
