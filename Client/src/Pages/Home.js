import React, { useEffect, useState } from 'react'
import Header from "../components/Header";
import ReactPlayer from 'react-player'
import axios from 'axios';
import './css/home.css'
import { useNavigate } from 'react-router-dom';
import cover from './css/cover.jpg'
import AOS from 'aos';
import 'aos/dist/aos.css';
import AD from '../components/Ad';
import Exclusive from '../components/Exclusive';
import YT from './youtube3.png';
import image from './sanjay.png'

const Home = () => {

    const aos = AOS.init()

    const [File, setFile] = useState([])
    const Nav = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:3001/YoutubeUpload/YoutubeGet')
            .then((res) => {
                setFile(res.data)
            })
    }, [])
    const localpath = 'http://localhost:3001/'

    const VideoRoute = (id) => {
        localStorage.setItem("Video_id", id)
        Nav('/PlayYT')

    }

    const Lastitem = File.length
    const Start = Lastitem - 4;

    const String = File.slice(Start, Lastitem)
    const LatestItems = String.reverse();
    console.log(LatestItems);

    const [Pos, setPos] = useState(0)
    const [Left, setLeft] = useState(false)
    const [Right, setRight] = useState(false)

    const CaroselRight = () => {
        if (window.innerWidth > 1000) {
            if (Pos > -40) {
                setPos(Pos - 20)
                setRight(false)
                console.log(Pos);
            }
            else {
                setRight(true)
                setPos(Pos - 0)
            }
        }
        else if (window.innerWidth < 600) {
            if (Pos > -41) {
                setPos(Pos - 19)
                setRight(false)
                console.log(Pos);
            }
            else {
                setRight(true)
                setPos(Pos - 0)
            }
        }


    }

    const CaroselLeft = () => {
        if (window.innerWidth > 1000) {
            if (Pos < 0) {
                setPos(Pos + 20)
                console.log(Pos);
                setLeft(false)
            }
            else {
                setPos(Pos - 0)
                setLeft(true)
            }
        }
        else if (window.innerWidth < 600) {
            if (Pos < 0) {
                setPos(Pos + 19)
                console.log(Pos);
                setLeft(false)
            }
            else {
                setPos(Pos - 0)
                setLeft(true)
            }
        }

    }

    return (
        <div>
            <Header />
            <div className='Cover-section'>
                <img className='Cover-img' src={YT} alt="" />
                <h1 className='Cover-Title-S'>Sanjay</h1>
                <h1 className='Cover-Title-M'>Media</h1>
                
            </div>
            <div className='Latest-div' data-aos="fade-up">
                <h1 className='Category-heading'>Latest Uploads</h1>
                <div className='Category-flex-btn'>
                    <button className={!Left ? 'Arrow-fun' : 'Left-Arr-disabled'} onClick={() => CaroselLeft()}>&#60;</button>

                    <div className='Latest-division'>
                        {LatestItems.map(item => {
                            return (
                                <div className='Latest-card' style={{ transform: `translateX(${Pos}rem)` }} >
                                    <img className='Thumbnail-Latest' src={localpath + item.filename} alt=''onClick={() => VideoRoute(item._id)}/>
                                    <div className='Latest-card-body'>
                                        <div onClick={() => VideoRoute(item._id)}>
                                            <h3 className='Latestr-Title'>{item.Name}</h3>
                                            <p className='Latestr-Desc'>{item.Desc}</p>
                                            </div>
                                        <a href={item.Link}><button className='Latest-btn'>Watch on Youtube</button></a>

                                    </div>
                                </div>
                            )
                        })}

                    </div>
                    <button onClick={() => CaroselRight()} className={!Right ? 'Arrow-funRight' : "Right-Arr-disabled"}>&#62;</button>

                </div>
            </div>
            <div className='Card-division'>
                {File.map(item => {
                    return (
                        <div className='Display-card' onClick={() => VideoRoute(item._id)}>
                            <img className='Thumbnail' src={localpath + item.filename} alt='' />
                            <a href={item.Link}><button className='Latest-btn-Sec2'>Watch on Youtube</button></a>
                            <h3 className='Card-Name'>{item.Name}</h3>
                            <p className='Card-desc'>{item.Desc}</p>

                        </div>
                    )
                })}
            </div>
            <AD />
            <Exclusive />
        </div>
    )
}



export default Home