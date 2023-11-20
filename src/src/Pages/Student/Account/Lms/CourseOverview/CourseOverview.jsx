import './CourseOverview.scss'

// Components
import MyCourses from "./Components/MyCourses/MyCourses"
import AvailableCourses from "./Components/AvailableCourses/AvailableCourses"

const CourseOverview = ({type}) => {
  return (
    <div className='course-overview'>
     <MyCourses type={type}/>
     <AvailableCourses type={type}/>
    </div>
  )
}

export default CourseOverview
