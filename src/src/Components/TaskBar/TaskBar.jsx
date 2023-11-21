import { useEffect, useState } from 'react';
import './TaskBar.scss'
// import { LinearProgress } from '@mui/material';

const TaskBar = ({users,length}) => {
    const [data,setData]=useState()
    useEffect(()=>{
        if(users){
            setData({...users})
        }
    },[])
 
    let color=length?"#0557A2":"#F2F4F7"
  return (
    <div className="taskBar-container">
          {/* content */}
    <div className="headings">
        <h2>{data && data.heading}</h2>
        <p>{data && data.para}</p>
    </div>

    <div className="taskBar">
      <div className="circle" style={{background:color}}>
        <div className="innerCircle"></div>
      </div>
      <div className="bar" >
        <div className="innerBar" style={{height:length+"%"}}>
        </div>
      </div>
    </div>

  
    </div>
  )
}

export default TaskBar
