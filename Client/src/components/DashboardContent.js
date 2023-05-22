import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode'
import { useCookies } from "react-cookie";
import './css/Dashboardcontents.css'

const DashboardContent = ({ State, setState }) => {
    const [cookies, setCokies] = useCookies('my-cookies')
    const [Email, setEmail] = useState("")
    const Token = cookies.jwt1
    const decodedToken = jwt_decode(Token)
    const id = decodedToken.id
    const [videoData, setvideoData] = useState([])
    const [EditData,setEditData]=useState("")
    useEffect(() => {
        axios.get(`http://localhost:3001/Auths/user/${id}`)
            .then((res) => { setEmail(res.data.Email) })


    }, [])

    useEffect(() => {
        if (Email !== "") {
            axios.get(`http://localhost:3001/Upload/Video_byEmail/${Email}`)
                .then((res) => setvideoData(res.data))
        }
    }, [Email])

    console.log(videoData);

    const localpath = "http://localhost:3001/"

    if (State == 0) {
        return (
            <div className="Dashboard-sec1">
                    <div className="Count-div">
                    <h2>{videoData.length}</h2>
                    <p>Videos Uploaded</p>
                </div>
            
                
            </div>
        )
    }

    if (State == 3) {
        return (
            <div className="Table-div">
                <div className="Popup">
                    <label>Tilte</label>
                    <input></input>
                    <label>Desc</label>
                    <input></input>
                </div>
            <table className="Dashboard-Table">
                <thead>
                    <th>Thumbnail</th>
                    <th>Title</th>
                    <th>Desc</th>
                    <th>Edit</th>
                </thead>
                {videoData.map(item => (
                    item.Files.map((sub, index) => {
                        if (sub.fieldName === "file1") {
                            return (

                                <tbody>
                                    <tr key={index}>
                                        <td>
                                            <img className="Thumbnail-Dashboard" src={localpath + sub.filename} alt="" />

                                        </td>
                                        <td>{item.Name}</td>
                                        <td>{item.Desc}</td>
                                        <td><button onClick={()=>{setEditData(item._id)}}>Edit</button></td>
                                    </tr>
                                </tbody>
                            )
                        }
                    })
                ))}
            </table>
            </div>
        )

    }
}


export default DashboardContent
