import './Attachments.scss'
import docIcon from '../../../../Assets/document.png'
import downIcon from '../../../../Assets/downIcon.png'
const list=[
  {
  id: 1,
  title: "12_Handy_Tips_For_Generating_Leads.doc",
  url: "https://via.placeholder.com/600/24f355",
  thumbnailUrl: "https://via.placeholder.com/150/24f355"
  },
  {
  id: 2,
  title: "Improve_Your_Business_Cards.pdf",
  url: "https://via.placeholder.com/600/24f355",
  thumbnailUrl: "https://via.placeholder.com/150/24f355"
  },
  {
  id: 3,
  title: "13_Handy_Tips_For_Generating_Leads.doc",
  url: "https://via.placeholder.com/600/24f355",
  thumbnailUrl: "https://via.placeholder.com/150/24f355"
  },
]
const Attachments = () => {
  return (
    <div className='attachments'>
      {
        list && list.map((doc,i)=>{
          return(
            <div className="attachment-doc" key={i}>
              <div className="attachment-doc-left">
                <img src={docIcon} alt="docIcon" />
                <h3>{doc.title}</h3>
              </div>
              <div className="attachment-doc-right">
                <img src={downIcon} alt='downIcon'/>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Attachments
