import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from 'axios'
import './css/play.css'
import ReactPlayer from 'react-player'


const Play = () => {
    const [File, setFile] = useState([])
    const getData = async () => {
        try {
            const id = localStorage.getItem("Video_id")
            await axios.get(`http://localhost:3001/Upload/Video/${id}`)
                .then((res) => setFile([res.data]))
        }

        catch (error) {
            console.log(error);
        }
    }
    //console.log(File);

    useEffect(() => {
        getData();
    }, [])
    const localpath = 'http://localhost:3001/'
    return (
        <div>
            <Header />
            {
                File.map(item => {
                    return (
                        item.Files.map(sub => {
                            //console.log(sub.fieldName);
                            if(sub.fieldName==='file2'){return (
                                <div className="Video-Block">
                                        <div className="Player">
                                            
                                                <ReactPlayer width='750px' height='500px' url={localpath + sub.filename} controls/>
                                            <div className="Desc-block">
                                                <div className="Title-block">
                                                    <h2 className="Title">{item.Name}</h2>
                                                    <p className="Desc">{item.Desc}</p>
                                                </div>
                                         
                                           </div>
                                           </div>

                                </div>
                            )}
                        })

                    )
                })
            }


        </div>

    )
}



export default Play