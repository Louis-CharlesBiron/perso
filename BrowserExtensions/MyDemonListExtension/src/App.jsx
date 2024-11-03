import { useState } from 'react'
import './App.css'
import MainHeader from './components/MainHeader'
import MainList from './components/MainList'
import StatusInfo from './components/StatusInfo'
import LevelManager from './models/LevelManager'
import {LevelsContext} from './components/contexts/LevelsContext.jsx'
import Menu from './components/Menu.jsx'
import LevelInfoMenu from './components/LevelInfoMenu.jsx'
import LevelSearchMenu from './components/LevelSearchMenu.jsx'
import SettingsMenu from './components/SettingsMenu.jsx'

function App() {

  const levelManager = new LevelManager(useState([]))

  return (
    <LevelsContext.Provider value={levelManager}>

      <StatusInfo className="version">V2.0</StatusInfo>
      {/* <StatusInfo className="onLine"></StatusInfo> TODO */}

      <MainHeader/>
      <MainList/>

      {/* <Menu headerText="Create">
        <LevelInfoMenu></LevelInfoMenu>
      </Menu> */}
 
      {/* <Menu headerText="Search">
        <LevelSearchMenu></LevelSearchMenu>
      </Menu> */}

      <Menu headerText="Settings">
        <SettingsMenu></SettingsMenu>
      </Menu>
      
    </LevelsContext.Provider>
  )
}

export default App
