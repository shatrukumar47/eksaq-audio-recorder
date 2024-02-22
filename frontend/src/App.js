import { useEffect, useState } from "react";
import "./App.css";
import AudioList from "./components/AudioList";
import Recorder from "./components/Recorder";
import axios from "axios";

const baseAPI = "https://audio-recorder-backend.onrender.com/audio"

function App() {
  const [data, setData] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoadingSaveAudio, setIsLoadingSaveAudio] = useState(false);

  useEffect(()=>{
    fetchData()
  }, [])

  const fetchData = async()=>{
    try {
      setIsLoadingData(true)
      const res = await axios.get(baseAPI);
      setData(res?.data)
      setIsLoadingData(false)
    } catch (error) {
      setIsLoadingData(false)
      console.log("Error Fetching Audio : ", error)
    }
  }

  const handleSaveAudio = async(url)=>{
    try {
      setIsLoadingSaveAudio(true)
      const res = await axios.post(`${baseAPI}/add`, {url: url});
      if(res.data.action){
        alert(res.data.message);
      }
      setIsLoadingSaveAudio(false)
      fetchData();
    } catch (error) {
      setIsLoadingSaveAudio(false)
      console.log("Error Saving Audio : ", error)
    }
  }

  const handleDeleteAudio = async(audio)=>{
    try {
      setIsLoadingData(true);
      const res = await axios.delete(`${baseAPI}/delete/${audio?._id}`);
      if(res.data.action){
        alert(res.data.message)
      }
      setIsLoadingData(false)
      fetchData();
    } catch (error) {
      setIsLoadingData(false)
      console.log("Error Deleting Audio : ", error)
    }
  }
  
  return (
    <div className="App">
      <div style={{ width: "48%"}}>
        <Recorder handleSaveAudio={handleSaveAudio} isLoading={isLoadingSaveAudio} setIsLoading={setIsLoadingSaveAudio} />
      </div>
      <div style={{ width: "48%"}}>
        <AudioList data={data} handleDeleteAudio={handleDeleteAudio} isLoading={isLoadingData} />
      </div>
    </div>
  );
}

export default App;
