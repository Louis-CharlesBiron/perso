import { useState } from 'react'
import './App.css'
import MainHeader from './components/MainHeader'
import MainList from './components/MainList'
import StatusInfo from './components/StatusInfo'
import LevelManager from './models/LevelManager'
import {LevelsContext} from './components/contexts/LevelsContext.jsx'

function App() {

  const levelManager = new LevelManager(useState([]))

  return (
    <LevelsContext.Provider value={levelManager}>

      <StatusInfo className="version">V2.0</StatusInfo>
      {/* <StatusInfo className="onLine"></StatusInfo> TODO */}

      <MainHeader/>
      <MainList/>
      
    </LevelsContext.Provider>
  )
}

export default App
