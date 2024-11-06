import { useRef, useState } from 'react'
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
import Sidebar from './components/Sidebar.jsx'
import { ActiveMenuContext, MENU_TYPES } from './components/contexts/ActiveMenuContext.jsx'
import OverviewMenu from './components/OverviewMenu.jsx'
import ProfileMenu from './components/ProfileMenu.jsx'

function App() {

  const levelManager = new LevelManager(useState([])),
        activeMenu = useState(MENU_TYPES.CLOSED),
        mainListRef = useRef(null)

  return (
    <LevelsContext.Provider value={levelManager}>
    <ActiveMenuContext.Provider value={activeMenu}>

      <StatusInfo className="version">V2.0</StatusInfo>
      {/* <StatusInfo className="onLine"></StatusInfo> TODO */}

      <MainHeader mainListRef={mainListRef}/>
      <MainList ref={mainListRef}/>

      <Menu headerText="Create">
        <LevelInfoMenu></LevelInfoMenu>
      </Menu>
 
      <Menu headerText="Search">
        <LevelSearchMenu></LevelSearchMenu>
      </Menu>

      <Menu headerText="Settings">
        <SettingsMenu></SettingsMenu>
      </Menu>

      <Sidebar headerText="Overview">
        <OverviewMenu></OverviewMenu>
      </Sidebar>

      <Sidebar headerText="Profile">
        <ProfileMenu></ProfileMenu>
      </Sidebar>
      
    </ActiveMenuContext.Provider>
    </LevelsContext.Provider>
  )
}

export default App
