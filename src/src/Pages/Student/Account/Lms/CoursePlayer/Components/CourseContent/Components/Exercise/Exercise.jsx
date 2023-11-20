import '../Videos/VideosList.scss'

// images
import playCircle from "../../../../../../Assets/book.png"

const Exercise = () => {
    const list=[
        {name:"Check Your Understanding: What You Offer the World",
      points:2,
      duration:15},
        {name:"Self-Assessment of Job Skills and Experience",
      points:2,
      duration:15},
        {name:"Things, Actions and People",
      points:2,
      duration:15},
        {name:"Self-Assessment of Job Skills and Experience",
      points:2,
      duration:15}
      ]
    return (
        <div className='contents-list'>
          <div className="contents-list-heading">
            <img src={playCircle} alt="playCircle" />
            <h2>Exercise</h2>
          </div>
    
          <div className="list">
            {
              list && list.map((exercise,i)=>{
                return(
                  <div className='content-slot' key={i}>
                    <div className="title">
                      <h4>{i+1}-</h4>
                      <h3>{exercise.name}</h3>
                    </div>
                    <div className="points-duration">
                      <p>{exercise.points} points</p>
                      <div className='duration'>
                        <p>{exercise.duration} min</p>
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

export default Exercise
