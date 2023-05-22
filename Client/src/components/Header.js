import React, { useEffect, useState } from 'react'
import './css/header.css'
import logo from '../components/youtube3.png'
import user from '../components/user.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useCookies } from 'react-cookie';


const Header=()=>{
    const {pathname}=useLocation()
    console.log(pathname);
    const[cookie,setCookie]=useCookies('cookie-name')
    const[jwt,setJwt]=useState(undefined)
    useEffect(()=>{
        setJwt(cookie.jwt1)
    })
    console.log(jwt);
    const[State,setState]=useState(true)

    const Open=()=>{
        if(State===true){
            setState(false)
        }
        else{
            setState(true)
        }
    }

    return(
        <div className='Header-Box'>
            <a href='https://www.youtube.com/@Sanjaymedia'><div className='Logo-sec'>
                <img className='Png-logo' src={logo} alt=''/>
                <h2 className='Name'>Sanjay Media</h2>
            </div></a>
            <div className='Nav-tab'>
            <Link to='/'><p className={pathname==='/'?'Nav-item-active':'Nav-item'}>Home</p></Link>
            <p className='Nav-item'>About Us</p>
            <Link to='/Content'><p className={pathname==='/Content'?'Nav-item-active':'Nav-item'}>Contents</p></Link>
            </div>
            <div className='Header-btn-sec'>
                <Link to='/Login'><button hidden={jwt!==undefined?true:false} className='Login-btn'>Login</button></Link>
                <img hidden={jwt!==undefined?false:true} className='User-img' src={user} alt="" onClick={Open}/>
            </div>
            <DashboardList State={State}/>
        </div>
    )
}

const DashboardList=({State})=>{
    const[cookie,setCookie,removeCookie]=useCookies('cookie-name')
    const Nav=useNavigate()
    const Logout=()=>{
        removeCookie("jwt1")
        Nav('/')
    }
    return(
        <div className='User-profile' hidden={State}>
            <ul>
                <Link to='/Dashboard'><li className='LiUser'>Dashboard</li></Link>
                <li className='LiUser' onClick={Logout}>LogOut</li>
            </ul>
        </div>
    )
}


export default Header