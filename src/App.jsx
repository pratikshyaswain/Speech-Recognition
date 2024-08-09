import { useState } from "react";
import "./App.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";

function App() {
  const [textCopied, setTextCopied] = useState();
  const [isCopied, setCopied] = useClipboard(textCopied);

  const startListening = () => {
    SpeechRecognition.startListening({
      continuous: true,
    });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    // console.error("Browser doesn't support speech recognition.");
    return <p>Browser doesn't support speech recognition.</p>;
  }

  const handleSetTextCopied = () => {
    setTextCopied(transcript);
  };

  return (
    <>
      <div className="App">
        <h3>Speech to text Converting</h3>
        <br />
        <div className="main-content" onClick={handleSetTextCopied}>
          {transcript || "Click start and speak into your microphone."}
          <div className="btn-style">
            <button onClick={setCopied} disabled={!transcript}>
              {isCopied ? "Copied! 👍" : "Copy to clipboard "}
            </button>

            <button onClick={startListening}>Start</button>
            <button onClick={stopListening}>Stop</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
