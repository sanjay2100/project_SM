import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Header from "../components/Header";
import axios from "axios";
import './css/playYt.css'
import { useCookies } from "react-cookie";
import jwt_decode from 'jwt-decode'
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";

const PlayYT = () => {
    const [File, setFile] = useState([])
    const [Like, setLike] = useState(null)
    const [cookie, setCookie] = useCookies("my-cookies")
    const [Email, setEmail] = useState("")
    const [other, setOther] = useState([])
    const Token = cookie.jwt1
    const decodedtoken = jwt_decode(Token)
    const Userid = decodedtoken.id
    const Nav=useNavigate()

    const [Liked, setLiked] = useState(false)
    const [LikeIcon, setLikeIcon] = useState("fa-solid fa-thumbs-up")
    const [LikeCount, setLikeCount] = useState(0)
    const [views, setViews] = useState(0)


    useEffect(() => {
        axios.get(`http://localhost:3001/Auths/user/${Userid}`)
            .then((res) => { setEmail(res.data.Email) })

    }, [])
    //
    useEffect(() => {
        axios.get('http://localhost:3001/YoutubeUpload/YoutubeGet')
            .then((res) => {
                setOther(res.data)
            })
    }, [])



    // useEffect(() => {
    //     axios.get('http://localhost:3001/Upload/Video')
    //         .then((res) => {
    //             setOther(res.data)
    //         })
    // }, [])

    useEffect(() => {
        const id = localStorage.getItem("Video_id")
        axios.post(`http://localhost:3001/Like/likedVideos`, {
            id: id,
            Email: Email
        })
            .then((res) => {
                if (res.data.message === "Liked") {
                    setLiked(true)
                    setLikeIcon("fa-solid fa-heart")
                    if (res.data.Likecount) {
                        setLikeCount(res.data.Likecount)
                    }
                }
                else {
                    setLiked(false)
                    setLikeIcon("fa-solid fa-thumbs-up")
                }
            })


    }, [Email])

    const getSiddata=async(id)=>{
        try {
            await axios.get(`http://localhost:3001/YoutubeUpload/YoutubeGet/${id}`)
                .then((res) => setFile([res.data]))


        }



        catch (error) {
            console.log(error);
        }
    }

    const getData = async () => {
        try {
            const id = localStorage.getItem("Video_id")
            await axios.get(`http://localhost:3001/YoutubeUpload/YoutubeGet/${id}`)
                .then((res) => setFile([res.data]))


        }



        catch (error) {
            console.log(error);
        }
    }

    const filename=File.map(item=>item.Name)

    
    

    useEffect(() => {
        if (Array.isArray(File) && File.length > 0) {
            File.map((item) => {
                setViews(item.views + 1)
            })
        }

    }, [File.length,filename])


    useEffect(() => {
        if (views > 0) {
            const id = localStorage.getItem("Video_id")
            axios.patch(`http://localhost:3001/YoutubeUpload/YoutubeViews/${id}`, {
                views: views
            })
        }


    }, [views])

    const PostLike = (id) => {
        if (Like !== "" || Like !== null) {
            axios.post(`http://localhost:3001/Like/video`, {
                id: id,
                Email: Email
            })
                .then((res) => {
                    console.log(res.data);
                    if (res.data === "Like Added") {
                        setLiked(true)
                        setLikeIcon("fa-solid fa-heart")
                    }
                    else {
                        setLiked(false)
                        setLikeIcon("fa-solid fa-thumbs-up")
                    }
                })
        }
    }



    const lasttwo = Array[File.length - 2]
    console.log(lasttwo);

    const localpath = 'http://localhost:3001/'
    const id = localStorage.getItem("Video_id")
    useEffect(() => {
        
        getData()
        Nav('/PlayYT')
    }, [ localStorage.getItem("Video_id")])
    
    return (
        <div>
            <Header />
            {File.map((item, index) => {
                const FileID=item._id
                return (
                    <div className="Player-Screen">
                        <div className="Player-block" key={index}>
                            <div hidden={window.innerWidth > 600 ? false : true}>
                                <ReactPlayer width='750px' height='500px' className="YTPlayer" url={item.Link} playing={true} controls />
                            </div>
                            <div hidden={window.innerWidth < 500 ? false : true}>
                                <ReactPlayer width='350px' height='200px' className="YTPlayer" url={item.Link} playing={true} controls/>
                            </div>
                            <div className="Player-titleblock">
                                <div>
                                    <h3>{item.Name}</h3>
                                    <p style={{color:'gray'}}>{item.Desc}</p>
                                </div>
                                <div className={Liked ? "LikeBtn-avtive" : "LikeBtn"} onClick={() => {

                                    PostLike(item._id)
                                }}>
                                    <div style={{ display: 'flex', gap: '3px' }}><i class={LikeIcon}></i> <p className="Like-pTag" hidden={Liked ? true : false}>Like</p><p hidden={Liked ? false : true} className="Like-count">{LikeCount}</p></div>
                                    <div style={{ display: 'flex', gap: '3px', color: 'gray' }}><p className="Like-count"><i class="fa-solid fa-eye"></i></p>
                                        <p className="Like-count">{views}</p></div>
                                </div>
                            </div>
                        </div>
                        <div className="Player-Right">
                            {other.map((item,index) => {
                                return (
                                    <div className={FileID===item._id?"Side-Div-active":"Side-Div"} style={{cursor:'pointer'}} key={index} onClick={()=>getSiddata(item._id)}>
                                        <img className="Side-thumbnail" src={localpath+item.filename}/>
                                        <div className="Side-Text">
                                            <h3 className="Side-Title">{item.Name}</h3>
                                            <p className={FileID===item._id?"Side-Desc-Active":"Side-Desc"}>{item.Desc}</p>
                                        </div>
                                    </div>
                                ) 
                            })}
                    </div>
                    </div>
    )
})}

        </div >
    )
}

export default PlayYT


