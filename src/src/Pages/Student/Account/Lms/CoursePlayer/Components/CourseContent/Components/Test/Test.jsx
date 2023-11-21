import "./../Videos/VideosList.scss"
import playCircle from "../../../../../../Assets/docIcon.png"


const Test = () => {
    const list=[
        {name:"Check Your Understanding: What You Offer the World",
      points:2,
      duration:15},
        {name:"Self-Assessment of Job Skills and Experience",
      points:2,
      duration:15}]
    return (
        <div className='contents-list'>
          <div className="contents-list-heading">
            <img src={playCircle} alt="playCircle" />
            <h2>Test</h2>
          </div>
    
          <div className="list">
            {
              list && list.map((test,i)=>{
                return(
                  <div className='content-slot' key={i}>
                    <div className="title">
                      <h4>{i+1}-</h4>
                      <h3>{test.name}</h3>
                    </div>
                    <div className="points-duration">
                      <p>{test.points} points</p>
                      <div className='duration'>
                        <p>{test.duration} min</p>
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

export default Test
