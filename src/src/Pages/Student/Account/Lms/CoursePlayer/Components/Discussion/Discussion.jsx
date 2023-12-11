import NewThread from './Components/NewThread/NewThread'
import ThreadsList from './Components/ThreadsList/ThreadsList'
import './Discussion.scss'
import { useState } from 'react'

const Discussion = () => {
  const [change,setChange]=useState(null)
  return (
   <div className="discussion">
    <div style={{display:change==null?"":"none"}}>
    <ThreadsList setChange={setChange}/>
    </div>

    <div style={{display:change===null?"none":""}}>
    <NewThread setChange={setChange}/>
    </div>
   </div>
  )
}

export default Discussion
