import './App.css';
import React,{Suspense} from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {Login,Signup} from './Pages/Login';
import { ToastContainer } from 'react-toastify';
//mport Home from './Pages/Home';
import Content from './Pages/Contents';
import Dashboard from './Pages/Dashboard';
import Play from './Pages/Play';
//import PlayYT from './Pages/PlayYT';
const PlayYT=React.lazy(()=>import('./Pages/PlayYT'))
const Home=React.lazy(()=>import('./Pages/Home'))

function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <BrowserRouter>
      <Suspense fallback={<div>Please Wait...</div>}>

      <Routes>
      <Route path='/' element={<Home/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/Content' element={<Content/>}/>
        <Route path='Dashboard' element={<Dashboard/>}/>
        <Route path='/Play' element={<Play/>}/>
        <Route path='/PlayYT' element={<PlayYT/>}/>
      </Routes>
      </Suspense>

      </BrowserRouter>
    </div>
  );
}

export default App;
