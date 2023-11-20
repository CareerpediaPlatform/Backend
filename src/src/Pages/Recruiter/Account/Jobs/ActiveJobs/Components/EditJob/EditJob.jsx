import { useContext, useState, useEffect} from "react";
import "./EditJob.scss";

import PlusIcon from "../../../Assets/plus-icon.png";
import DeleteIcon from "../../../Assets/delete.png";



// Sidebar and Navbar
import Navbar from "../../../../../../../Components/Recruiter/Navbar/Navbar";
import Sidebar from "../../../../../../../Components/Recruiter/Sidebar/Sidebar";

// Context
import { SideBarContext } from "../../../../../../../Context/SidebarContext";

const EditData = [
  {
    jobTitle: "Developer",
    jobDescription: "Do Learn Whatever It is but learning how to learn is life's most important skill",
    jobRequirements: "Frontend Developer",
    responsibilities: "TeamWork",
    education: "BTech",
    salary: "$20,000",
    hiringMultipleCandidates: "20",
    addressLine: "Durgam Cheruvu",
    city: "Hyderabad",
    state: "Telangana",
    district: "Lorem Ipsum",
    pinCode: "123456",
    country: "India",
    skillExperience: "2 years",
  },
];

const EditJob = () => {
  const { close } = useContext(SideBarContext);

  const [data, setData] = useState({
    jobTitle: "",
    jobDescription: "",
    jobRequirements: "",
    responsibilities: "",
    education: "",
    salary: "",
    hiringMultipleCandidates: "",
    addressLine: "",
    city: "",
    state: "",
    district: "",
    pinCode: "",
    country: "",
    skillExperience: "",
  });

  const [add, setAdd] = useState([]);

  const [array, setArray] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    array.push(data);
    console.log(array);
    setData({
      jobTitle: "",
      jobDescription: "",
      jobRequirements: "",
      responsibilities: "",
      education: "",
      salary: "",
      hiringMultipleCandidates: "",
      addressLine: "",
      city: "",
      state: "",
      district: "",
      pinCode: "",
      country: "",
      skillExperience: "",
    });
  };

  const handleAdd = () => {
    add.push(data.skillExperience);
    setAdd([...add]);
    setData({ skillExperience: "" });
  };

  const handleDelete = (index) => {
    const del = [...add];
    del.splice(index, 1);
    setAdd(del);
  };

  useEffect(() => {
    setData(EditData[0]);
  }, []);

  return (
    <div className="recruiter-dashboard">
      <Sidebar />
      <div className="recruiter-dashboard-content">
        <Navbar type="jobs" />
        <div
          className="dashboard-details"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          <div className="edit-job">
            <div className="edition">
              <div className="left-edition">
                <h4>Job Title</h4>
                <p>A job title must describe one position only</p>
              </div>
              <div className="right-edition">
                <input
                  type="text"
                  placeholder="Enter your job title here"
                  name="jobTitle"
                  value={data.jobTitle}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="edition">
              <div className="left-edition">
                <h4>Job Description</h4>
                <p>
                  Provide a short description about the job. Keep it short and
                  to the point
                </p>
              </div>
              <div className="right-edition">
                <textarea
                  name="jobDescription"
                  placeholder="Enter the course description"
                  value={data.jobDescription}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="edition">
              <div className="left-edition">
                <h4>Job Requirements</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <div className="right-edition">
                <textarea
                  name="jobRequirements"
                  placeholder="Enter your requirements"
                  value={data.jobRequirements}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="edition">
              <div className="left-edition">
                <h4>Responsibilities</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <div className="right-edition">
                <textarea
                  name="responsibilities"
                  placeholder="Enter your Responsibilities"
                  value={data.responsibilities}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="edition">
              <div className="left-edition">
                <h4>Education</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <div className="right-edition">
                <input
                  type="text"
                  placeholder="Enter your Education"
                  onChange={handleChange}
                  name="education"
                  value={data.education}
                />
              </div>
            </div>

            <div className="edition">
              <div className="left-edition">
                <h4>Employment Type</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <div className="right-edition">
                <div className="edit-checkbox-fields">
                  <div className="edit-checkbox">
                    <input type="checkbox" id="FullTime" name="employmentType" value={"FullTime"} onChange={handleChange}/>
                    <label htmlFor="employmentType">Full - Time</label>
                  </div>
                  <div className="edit-checkbox">
                    <input type="checkbox" id="PartTime" name="employmentType" value={"PartTime"} onChange={handleChange}/>
                    <label htmlFor="employmentType">Part - Time</label>
                  </div>
                </div>
                <div className="edit-checkbox-fields">
                  <div className="edit-checkbox">
                    <input type="checkbox" id="Internship" name="employmentType" value={"Internship"} onChange={handleChange}/>
                    <label htmlFor="employmentType">Internship</label>
                  </div>
                  <div className="edit-checkbox">
                    <input type="checkbox" id="FreeLancer" name="employmentType" value={"FreeLancer"} onChange={handleChange}/>
                    <label htmlFor="employmentType">FreeLancer</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="edition">
              <div className="left-edition">
                <h4>Working Schedule</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <div className="right-edition">
                <select name="email" id="email" onChange={handleChange}>
                  <option value="SelectEmail">linda@framcreative.com</option>
                  <option value="PersonalEmail">Personal Email</option>
                  <option value="OfficialEmail">Official Email</option>
                </select>
              </div>
            </div>

            <div className="edition">
              <div className="left-edition">
                <h4>Salary</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <div className="right-edition">
                <input
                  type="text"
                  placeholder="linda@framcreative.com"
                  onChange={handleChange}
                  name="salary"
                  value={data.salary}
                />
              </div>
            </div>

            <div className="edition">
              <div className="left-edition">
                <h4>Hiring Multiple Candidates</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <div className="right-edition">
                <input
                  type="text"
                  placeholder="linda@framcreative.com"
                  onChange={handleChange}
                  name="hiringMultipleCandidates"
                  value={data.hiringMultipleCandidates}
                />
              </div>
            </div>

            <div className="edition">
              <div className="left-edition">
                <h4>Interview Type</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <div className="right-edition">
                <div className="edit-radio-fields">
                  <div className="edit-radio">
                    <input type="radio" id="onsite" name="InterviewType" value={"onsite"} onChange={handleChange}/>
                    <label for="InterviewType">onsite</label>
                  </div>
                  <div className="edit-radio">
                    <input type="radio" id="online" name="InterviewType" value={"online"} onChange={handleChange}/>
                    <label for="InterviewType">online</label>
                  </div>

                  <div className="edit-radio">
                    <input type="radio" id="PhoneCall" name="InterviewType" value={"PhoneCall"} onChange={handleChange}/>
                    <label for="InterviewType">Phone call</label>
                  </div>
                </div>
                <div className="edit-interview-fields">
                  <div className="interview-type">
                    <label for="AddressLine">Address Line</label>
                    <input
                      type="text"
                      placeholder="Address Line"
                      name="addressLine"
                      onChange={handleChange}
                      value={data.addressLine}
                    />
                  </div>
                  <div className="interview-type">
                    <label for="City">City</label>
                    <input
                      type="text"
                      placeholder="City"
                      name="city"
                      onChange={handleChange}
                      value={data.city}
                    />
                  </div>
                </div>
                <div className="edit-interview-fields">
                  <div className="interview-type">
                    <label for="District">District</label>
                    <input
                      type="text"
                      placeholder="District"
                      onChange={handleChange}
                      name="district"
                      value={data.district}
                    />
                  </div>
                  <div className="interview-type">
                    <label for="State">State</label>
                    <input
                      type="text"
                      placeholder="State"
                      onChange={handleChange}
                      name="state"
                      value={data.state}
                    />
                  </div>
                </div>
                <div className="edit-interview-fields">
                  <div className="interview-type">
                    <label for="PinCode">Pin Code</label>
                    <input
                      type="number"
                      placeholder="PinCode"
                      onChange={handleChange}
                      name="pinCode"
                      value={data.pinCode}
                    />
                  </div>
                  <div className="interview-type">
                    <label for="Country">Country</label>
                    <input
                      type="text"
                      placeholder="Country"
                      onChange={handleChange}
                      name="country"
                      value={data.country}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="edition">
              <div className="left-edition">
                <h4>Skills & Experience</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <div className="right-edition">
                <div className="edit-skill">
                  <input
                    type="text"
                    placeholder="linda@framcreative.com"
                    name="skillExperience"
                    value={data.skillExperience}
                    onChange={handleChange}
                  />
                  <img
                    src={PlusIcon}
                    alt=""
                    onClick={handleAdd}
                    id="plusIcon"
                  />
                </div>
                <div className="add-buttons">
                  {add &&
                    add.map((item, index) => {
                      return (
                        <div className="delete-buttons" key={index}>
                          <button>{item}</button>
                          <img
                            src={DeleteIcon}
                            alt="delete"
                            onClick={() => handleDelete(index)}
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            <div className="button-edition">
              <button className="edit-button" onClick={handleSubmit}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditJob;
