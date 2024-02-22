import "./App.css";
import AudioList from "./components/AudioList";
import Recorder from "./components/Recorder";

function App() {
  
  return (
    <div className="App">
      <div style={{ width: "48%"}}>
        <h1 className="logo">Voice Recorder</h1>
        <Recorder />
      </div>
      <div style={{ width: "48%"}}>
        <AudioList />
      </div>
    </div>
  );
}

export default App;
