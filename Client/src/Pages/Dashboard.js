import React, { useState,useEffect } from 'react'
import './css/Dashboard.css'
import Header from '../components/Header'
import '../components/css/Sidebar.css'
import Upload from '../components/Upload'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router'
import DashboardContent from '../components/DashboardContent'

const Dashboard = () => {
    const [State, setState] = useState(0)
    const[cookie,setCookie]=useCookies('cookie-name')
    console.log(cookie.jwt1);
    const Nav=useNavigate()
    
    
    useEffect(() => {
        if (!cookie.jwt1) {
            Nav('/Login');
        }
    }, [cookie.jwt1, Nav]);




    if(!cookie.jwt1){
        
        return <p>Please Login!!!</p>
    }
       else {return (
            <div>
                <Header />
                <div className='Dashboard-body'>
                    <div className="Sidebar">
                        <ul className="Sidebar-ul">
                            <li className={State === 0 ? "Sidebar-li-active" : "Sidebar-li"} onClick={() => setState(0)}>Profile</li>
                            <li className={State === 1 ? "Sidebar-li-active" : "Sidebar-li"} onClick={() => setState(1)}>Upload Videos</li>
                            <li className={State === 2 ? "Sidebar-li-active" : "Sidebar-li"} onClick={() => setState(2)}>Upload YT</li>
                            <li className={State === 3 ? "Sidebar-li-active" : "Sidebar-li"} onClick={() => setState(3)}>My uploads</li>
                        </ul>
                    </div>
                    <div>
                        <Upload State={State} setState={setState}/>
                        <DashboardContent State={State} setState={setState}/>
                    </div>
                </div>
            </div>
        )}
    
   
    
}

export default Dashboard