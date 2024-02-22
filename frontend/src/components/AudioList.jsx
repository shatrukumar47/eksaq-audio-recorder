import React from "react";
import "../styles/AudioList.css";

const AudioList = ({ data, handleDeleteAudio,isLoading }) => {
  return (
    <div className="audio-list-container">
      <h1 className="logo">Recordings</h1>
      {!isLoading && <div className="audios-container">
        {
          data?.map((audio)=>{
            return <SingleAudio key={audio?._id} audio={audio} handleDeleteAudio={handleDeleteAudio} />
          })
        }
      </div>}
      {isLoading && <p className="loading">Loading ...</p>}
    </div>
  );
};

export default AudioList;

const SingleAudio = ({audio, handleDeleteAudio}) => {

  const handleRemove = ()=>{
    handleDeleteAudio(audio)
  }

  return <div className="single-audio-cont">
    <audio src={audio?.url} controls></audio>
    <a href={audio?.url} download target="_blank" >&#8675;</a>
    <button onClick={handleRemove}>Delete</button>
  </div>;
};
