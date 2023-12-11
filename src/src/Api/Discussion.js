import axios from "axios"
export const getDiscussion=async(props)=>{
    console.log(props)
   if(props){
        if(props=="mern1111"){
            const data=await axios.get("http://localhost:4000/student/discussion/mern1111")
            return data
        } 
        else if(props=="uiux1111"){
            const data=await axios.get("http://localhost:4000/student/discussion/uiux1111")
            return data
        } }
}