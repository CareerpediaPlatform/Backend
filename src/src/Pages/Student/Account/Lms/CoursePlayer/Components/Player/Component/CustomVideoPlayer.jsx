import { useState } from 'react';
import ReactPlayer from 'react-player';

const CustomVideoPlayer = () => {
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
    <div>
      <ReactPlayer
        url="your-video-url.mp4"
        playing={playing}
        volume={volume}
        onProgress={handleProgress}
      />

      <button onClick={handlePlayPause}>
        {playing ? 'Pause' : 'Play'}
      </button>

      <input
        type="range"
        min={0}
        max={1}
        step="any"
        value={volume}
        onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
      />

      <progress value={played} max={1} />

      <input
        type="range"
        min={0}
        max={1}
        step="any"
        value={played}
        onChange={(e) => setPlayed(parseFloat(e.target.value))}
      />
    </div>
  );
};

export default CustomVideoPlayer;
