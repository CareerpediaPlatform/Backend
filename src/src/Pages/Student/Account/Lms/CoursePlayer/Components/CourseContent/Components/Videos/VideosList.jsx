import './VideosList.scss'
// images
import playIcon from "../../../../../../Assets/play.png"
import playCircle from "../../../../../../Assets/playCircle.png"
const list=[
  {name:"Profit and loss",
points:2,
duration:15},
  {name:"Speed, Distance and Time",
points:2,
duration:15},
  {name:"Ratio and Proportion",
points:2,
duration:15},
  {name:"Permutation and Combination",
points:2,
duration:15},
  {name: "Triangles",
points:2,
duration:15}
]

const VideosList = () => {
  return (
    <div className='contents-list'>
      <div className="contents-list-heading">
        <img src={playCircle} alt="playCircle" />
        <h2>6 videos</h2>
      </div>

      <div className="list">
        {
          list && list.map((video,i)=>{
            return(
              <div className='content-slot' key={i}>
                <div className="title">
                  <h4>{i+1}-</h4>
                  <h3>{video.name}</h3>
                </div>
                <div className="points-duration">
                  <p>{video.points} points</p>
                  <div className='duration'>
                    <img src={playIcon} alt="playIcon" />
                    <p>{video.duration} min</p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default VideosList
