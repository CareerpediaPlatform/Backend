import './NewThread.scss'

const NewThread = () => {
  return (
    <div className="new-thread">
        <div className="new-thread-top-bar">
            <h2>Create New Thread</h2>
            <p>Write and address new queries and issues</p>
        </div>

        <div className="new-thread-form">
            <div className="new-thread-form-input">
                <label>Title</label>
                <input type='text' placeholder='Discussion Title'/>
            </div>
            <div className="new-thread-form-input">
                <label>Description</label>
                <textarea type='textarea' placeholder='Discussion Title' className='textarea'/>
  
             </div>

             <div className="new-thread-form-submit">
                <button>Post</button>
             </div>
            
        </div>
    </div>
  )
}

export default NewThread
