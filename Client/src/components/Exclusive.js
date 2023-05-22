import React from "react";
import './css/Exclusive.css'
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Exclusive = () => {
    const [Data, setdata] = useState([])
    const Nav=useNavigate()
    useEffect(() => {
        try {
            axios.get("http://localhost:3001/Upload/Video")
            .then((res) => setdata(res.data))
        }
        catch (error) {
            console.log(error);
        }
    }, [])
    const VideoClicked = (id) => {
        localStorage.setItem("Video_id", id)
        Nav('/Play')
    }

    const localpath = "http://localhost:3001/"

    return (
        <div className="Exclusive-div">
            <div className="Excusive-TitleBlock">
                <h2 className="Exclusive-title">Site Exclusive Contents</h2>
            </div>
            <div className="Exclusive-outer">

            {
                Data.map(item => (
                    item.Files.map(sub => {
                        if (sub.fieldName === "file1") {

                            return (

                                    <div className="Excusive-card" onClick={()=>VideoClicked(item._id)}>
                                        <img className="Excusive-img" src={localpath + sub.filename} alt='' />
                                        <h1 className="Exclusive-Name">{item.Name}</h1>
                                    </div>

                            )

                        }
                    })
                ))
            }
                                                </div>

        </div>
    )
}


export default Exclusive