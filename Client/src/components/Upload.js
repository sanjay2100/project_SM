import axios from "axios";
import React, { useEffect, useState } from "react";
import './css/Upload.css'
import {toast} from 'react-toastify'
import { useCookies } from "react-cookie";
import jwt_decode from 'jwt-decode';

const Upload=({State, setState})=>{
    const[Name,setName]=useState("")
    const[Desc,setDesc]=useState('')
    const[File,setFile]=useState(null)
    const[Image,setImage]=useState(null)
    const[Email,setEmail]=useState('')
    const[Link,setLink]=useState('')
    const [cookies,setCookies]=useCookies('cookie-name')
    const jwt=cookies.jwt1
    const decodedToken=jwt_decode(jwt)
   // console.log(decodedToken);
    const id=decodedToken.id
   // console.log(id);

    const fetchUser=()=>{
        axios.get(`http://localhost:3001/Auths/user/${id}`)
        .then((res)=>{
            setEmail(res.data.userName)
            //console.log(Email);
        })

    }

    useEffect(()=>{
        fetchUser()
    },[])

    const Post=(e)=>{
        e.preventDefault()
        console.log(File);
        //console.log(Email_id);
        const formData=new FormData()
        formData.append("Name",Name)
        formData.append("Email",Email)
        formData.append("Desc",Desc)
        formData.append("file1",File)
        formData.append("file2",Image)
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
        axios.post("http://localhost:3001/Upload/Video",formData,{
            headers:{
                'Content-Type': 'multipart/form-data'

            }
        })
        .then((res)=>{
            if(res.data==="Video uploaded"){
                toast.success("Video uploaded",{
                    position:'top-center'
                })
            }
        })
    }
    const PostYT=(e)=>{
        e.preventDefault()
        console.log(File);
        //console.log(Email_id);
        const formData=new FormData()
        formData.append("Name",Name)
        formData.append("Email",Email)
        formData.append("Desc",Desc)
        formData.append("file1",File)
        formData.append("Link",Link)
        formData.append('views',0)
        
        axios.post("http://localhost:3001/YoutubeUpload/Youtube",formData,{
            headers:{
                'Content-Type': 'multipart/form-data'

            }
        })
        .then((res)=>{
            if(res.data==="Video uploaded"){
                toast.success("Video uploaded",{
                    position:'top-center'
                })
            }
        })
    }

   if(State===1){ return(
        <div className="Upload-Outer">
            <form className="Upload-box"  encType='multipart/form-data' method="post" onSubmit={Post}>
                <label>Title</label>
                <input  className="Text-box" onChange={(e)=>setName(e.target.value)}/>
                <label>Desc</label>
                <input className="Text-box" onChange={(e)=>setDesc(e.target.value)}/>
                <label>Image</label>
                <input className="Text-box" name="file1" type='file'onChange={(e)=>setFile(e.target.files[0])}/>
                <label>File</label>
                <input className="Text-box" name="file2" type='file'onChange={(e)=>setImage(e.target.files[0])}/>
                <button type="submit">Upload</button>
            </form>
        </div>
    )}
    else if(State===2){
         return(
            <div className="Upload-Outer">
                <form className="Upload-box"  encType='multipart/form-data' method="post" onSubmit={PostYT}>
                    <label>Title</label>
                    <input  className="Text-box" onChange={(e)=>setName(e.target.value)}/>
                    <label>Desc</label>
                    <input className="Text-box" onChange={(e)=>setDesc(e.target.value)}/>
                    <label>Thumbnail</label>
                    <input className="Text-box" name="file1" type='file'onChange={(e)=>setFile(e.target.files[0])}/>
                    <label>YT Link</label>
                    <input className="Text-box"  type='text'onChange={(e)=>setLink(e.target.value)}/>
                    <button type="submit">Upload</button>
                </form>
            </div>
        )
    }
    else{
        return null
    }
}

export default Upload