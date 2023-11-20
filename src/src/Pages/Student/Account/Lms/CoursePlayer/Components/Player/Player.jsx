import "./Player.scss";
import PlayerNavbar from "../PlayerNavbar/PlayerNavbar";
import ReactPlayer from "react-player";
import { useState } from "react";
const Player = () => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [played, setPlayed] = useState(0);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
  };

  const handleProgress = (progress) => {
    setPlayed(progress.played);
  };
  return (
    <div className="player-components">
      <PlayerNavbar />
      <div className="video-player">
        <ReactPlayer
          url="https://youtu.be/oYrLsETgOhw"
          controls={true}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default Player;
