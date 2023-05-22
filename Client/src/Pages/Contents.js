import React, { useEffect, useState } from 'react'
import './css/contents.css'
import axios from 'axios'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/sidebar'


const Content = () => {
    const [File, setFile] = useState([])
    const [Click, setClick] = useState("")
    const Nav = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:3001/Upload/Video')
            .then((res) => {
                setFile(res.data)
            })
    }, [])

    const VideoClicked = (id) => {
        localStorage.setItem("Video_id", id)
        Nav('/Play')
    }

    const localpath = 'http://localhost:3001/'

    return (
        <div>
            <Header />
            <div className='Screen'>
                <Sidebar />

                <div className='Content-block'>
                    {
                        File.map((item) => {

                            return (

                                <div className='Content-div' onClick={() => {
                                    VideoClicked(item._id)
                                }}>
                                    <div style={{display:'flex',alignItems:'center',gap:'20px'}}>

                                        {item.Files.map((sub) => {
                                            if (sub.fieldName === "file1") {
                                                return (
                                                    <img className='Thumbnail' src={localpath + sub.filename} alt='' />
                                                )
                                            }
                                        })}
                                        <div className='Desc-block'>
                                            <h1 className='Content-Heading'>{item.Name}</h1>
                                            <p style={{ margin: '0px' }}>{item.Desc}</p>
                                            <p style={{ textAlign: 'left' ,margin:'0px',color:'dodgerblue'}}>{item.Email}</p>

                                        </div>

                                    </div>
                                </div>
                            )

                        })
                    }
                </div>
            </div>
        </div>
    )
}



export default Content