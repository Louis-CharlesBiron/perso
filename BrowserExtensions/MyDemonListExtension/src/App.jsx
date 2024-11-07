import { useRef, useState } from 'react'
import './App.css'
import MainHeader from './components/MainHeader'
import MainList from './components/MainList'
import StatusInfo from './components/StatusInfo'
import LevelManager from './models/LevelManager'
import {LevelsContext} from './components/contexts/LevelsContext.jsx'
import {UserContext} from './components/contexts/UserContext.jsx'
import Menu from './components/Menu.jsx'
import LevelInfoMenu from './components/LevelInfoMenu.jsx'
import LevelSearchMenu from './components/LevelSearchMenu.jsx'
import SettingsMenu from './components/SettingsMenu.jsx'
import Sidebar from './components/Sidebar.jsx'
import { ActiveMenuContext, MENU_TYPES } from './components/contexts/ActiveMenuContext.jsx'
import OverviewMenu from './components/OverviewMenu.jsx'
import ProfileMenu from './components/ProfileMenu.jsx'
import UserManager from './models/UserManager.js'

function App() {

  const levelManager = new LevelManager(useState([])),
        userManager = new UserManager(useState(null), useState(null)),
        activeMenu = useState(MENU_TYPES.CLOSED),
        mainListRef = useRef(null),
        usernameState = useState(null)


  return (
    <LevelsContext.Provider value={levelManager}>
    <UserContext.Provider value={userManager}>
    <ActiveMenuContext.Provider value={activeMenu}>

      <StatusInfo className="version">V2.0</StatusInfo>
      {/* <StatusInfo className="onLine"></StatusInfo> TODO */}

      <MainHeader mainListRef={mainListRef} usernameState={usernameState[0]}/>
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
    </UserContext.Provider>
    </LevelsContext.Provider>
  )
}

export default App



export const fakechrome = {storage:{
  syncv:{
      // settings
      $u:"LCB79",
      $s:"local",
      $l:[123012309, 333, 128, 111, 129, 222],
      // levels
      128:{a:128, b:"this._name128", c:"this._title", d:"this._url", e:"this._attempts", f:"this._progs", g:"this._time", h:"this._date", i:"this._enjoy", j:"this._length", k:"this._song", l:"this._songURL", m:"this._objects", n:"insane", o:"creator", p:"this._featureLevel", q:"this._gameVersion", r:"this._lazyLength", s:"sync"},
      129:{a:129, b:"this._name129", c:"this._title", d:"this._url", e:"this._attempts", f:"this._progs", g:"this._time", h:"this._date", i:"this._enjoy", j:"this._length", k:"this._song", l:"this._songURL", m:"this._objects", n:"insane", o:"creator", p:"this._featureLevel", q:"this._gameVersion", r:"this._lazyLength", s:"sync"},
      123012309:{a:123012309, b:"this._name123012309", c:"this._title", d:"this._url", e:"this._attempts", f:"this._progs", g:"this._time", h:"this._date", i:"this._enjoy", j:"this._length", k:"this._song", l:"this._songURL", m:"this._objects", n:"insane", o:"creator", p:"this._featureLevel", q:"this._gameVersion", r:"this._lazyLength", s:"sync"},
  },
  localv:{
      // levels
      111:{a:111, b:"this._name111", c:"this._title", d:"this._url", e:"this._attempts", f:"this._progs", g:"this._time", h:"this._date", i:"this._enjoy", j:"this._length", k:"this._song", l:"this._songURL", m:"this._objects", n:"insane", o:"creator", p:"this._featureLevel", q:"this._gameVersion", r:"this._lazyLength", s:"local"},
      222:{a:222, b:"this._name222", c:"this._title", d:"this._url", e:"this._attempts", f:"this._progs", g:"this._time", h:"this._date", i:"this._enjoy", j:"this._length", k:"this._song", l:"this._songURL", m:"this._objects", n:"insane", o:"creator", p:"this._featureLevel", q:"this._gameVersion", r:"this._lazyLength", s:"local"},
      333:{a:333, b:"this._name333", c:"this._title", d:"this._url", e:"this._attempts", f:"this._progs", g:"this._time", h:"this._date", i:"this._enjoy", j:"this._length", k:"this._song", l:"this._songURL", m:"this._objects", n:"insane", o:"creator", p:"this._featureLevel", q:"this._gameVersion", r:"this._lazyLength", s:"local"},
  },
  sync:{
      get:(cb)=>{
          setTimeout(()=>cb(fakechrome.storage.syncv), 100)
      },
      set:(obj)=>{
          setTimeout(()=>fakechrome.storage.syncv[Object.keys(obj)[0]] = Object.values(obj)[0], 100)
      },
      remove:(key)=>{
          setTimeout(()=>delete fakechrome.storage.syncv[key], 100)
      }
  },
  local:{
      get:(cb)=>{
          setTimeout(()=>cb(fakechrome.storage.localv), 100)
      },
      set:(obj)=>{
          setTimeout(()=>fakechrome.storage.localv[Object.keys(obj)[0]] = Object.values(obj)[0], 100)
      },
      remove:(key)=>{
          setTimeout(()=>delete fakechrome.storage.localv[key], 100)
      }
  }
}}
