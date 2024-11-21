// JSX
// MyDemonList Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
import { useEffect, useRef, useState } from 'react'
import './App.css'
import MainHeader from './components/MainHeader'
import MainList from './components/MainList'
import StatusInfo from './components/StatusInfo'
import LevelManager from './models/LevelManager'
import {LevelsContext} from './components/contexts/LevelsContext.jsx'
import {UserContext} from './components/contexts/UserContext.jsx'
import {OnLineContext} from './components/contexts/OnLineContext.jsx'
import Menu from './components/Menu.jsx'
import LevelInfoMenu from './components/LevelInfoMenu.jsx'
import LevelSearchMenu from './components/LevelSearchMenu.jsx'
import SettingsMenu from './components/SettingsMenu.jsx'
import Sidebar from './components/Sidebar.jsx'
import { ActiveMenuContext, MENU_TYPES } from './components/contexts/ActiveMenuContext.jsx'
import OverviewMenu from './components/OverviewMenu.jsx'
import ProfileMenu from './components/ProfileMenu.jsx'
import UserManager from './models/UserManager.js'
import IconButton from './components/IconButton.jsx'
import { random } from './Utils/Utility.js'
import Level from './models/Level.js'

function App() {

  const levelManager = new LevelManager(useState(null)),
        userManager = new UserManager(useState(null), useState(null), useState(false), useState("local")),
        activeMenu = useState(MENU_TYPES.CLOSED),
        mainListRef = useRef(null),
        usernameState = useState(null),
        [version, setVersion] = useState(null),
        [onLine, setOnLine] = useState(navigator.onLine)

  useEffect(()=>{
    //Display version
    chrome.management.getSelf(e=>setVersion(e.versionName))
    //Set default storage type
    chrome.storage.sync.get(r=>userManager.setDefaultStorageType(r.$s))
  })


  return (
    <LevelsContext.Provider value={levelManager}>
    <UserContext.Provider value={userManager}>
    <ActiveMenuContext.Provider value={activeMenu}>
    <OnLineContext.Provider value={setOnLine}>

      <StatusInfo className="si_version">{version&&"V"+version}</StatusInfo>
      {!onLine&&<StatusInfo className="si_onLine">OFFLINE</StatusInfo>}
      <StatusInfo className="si_hasUnsavedChanges">{userManager.hasUnsavedChanges&&<IconButton disabled={true} size={24} title="WARNING: you currently have unsaved changes, save or revert them to access all features">$warn</IconButton>}</StatusInfo>

      <MainHeader mainListRef={mainListRef} usernameState={usernameState[0]}/>
      <MainList ref={mainListRef}/>

      <Menu headerText="Create">
        <LevelInfoMenu mainListRef={mainListRef}/>
      </Menu>
 
      <Menu headerText="Search">
        <LevelSearchMenu mainListRef={mainListRef}/>
      </Menu>

      <Menu headerText="Settings">
        <SettingsMenu/>
      </Menu>

      <Sidebar headerText="Overview">
        <OverviewMenu/>
      </Sidebar>

      <Sidebar headerText="Profile">
        <ProfileMenu/>
      </Sidebar>
      
    </OnLineContext.Provider>
    </ActiveMenuContext.Provider>
    </UserContext.Provider>
    </LevelsContext.Provider>
  )
}

export default App


/*export const chrome = {
  downloads: {
    download:(obj)=>console.log("DOWNLOADING FILE ",obj)
  },
  windows: {
    create:(obj)=>console.log("NEW WINDOW CREATED AT ",obj)
  },
  storage:{
  syncv:{
      $u:"vortrox",
      $s:"local",
      $l:[17, 128, 123012309, 333, 111, 129, 222,187, 1878],
      128:{a:128, b:"name128", c:"title", d:"url", e:"1123123", f:"1 3 4 10 100", g:"1", h:Date.now(), i:"enjoyement", j:"5:35", k:"song", l:"songURL", m:"325678", n:"easy", o:"creator", p:"1", q:"2.2", r:"XL", s:"sync"},
      129:{a:129, b:"this._name129", c:"this._title", d:"this._url", e:"2", f:"9 68 100", g:"22", h:new Date("2024-01-01").getTime(), i:"this._enjoy", j:"this._length", k:"this._song", l:"this._songURL", m:"this._objects", n:"insane", o:"creator", p:"this._featureLevel", q:"this._gameVersion", r:"this._lazyLength", s:"sync"},
    123012309:{a:123012309, b:"this._name123012309", c:"this._title", d:"this._url", e:"3", f:"this._progs", g:"333", h:new Date("2024-06-01").getTime(), i:"this._enjoy", j:"3:", k:"this._song", l:"this._songURL", m:"this._objects", n:"insane", o:"creator", p:"this._featureLevel", q:"this._gameVersion", r:"this._lazyLength", s:"sync"},
  },
  localv:{
      111:{a:111, b:"this._name111", c:"this._title", d:"this._url", e:"4", f:"this._progs", g:"this._time", h:new Date("2023-08-15").getTime(), i:"this._enjoy", j:"5:00", k:"this._song", l:"this._songURL", m:"this._objects", n:"insane", o:"creator", p:"this._featureLevel", q:"this._gameVersion", r:"this._lazyLength", s:"local"},
      222:{a:222, b:"this._name222", c:"this._title", d:"this._url", e:"5", f:"this._progs", g:"this._time", h:new Date("2023-09-15").getTime(), i:"this._enjoy", j:"2", k:"this._song", l:"this._songURL", m:"this._objects", n:"insane", o:"creator", p:"this._featureLevel", q:"this._gameVersion", r:"this._lazyLength", s:"local"},
      333:{a:333, b:"this._name333", c:"this._title", d:"this._url", e:"6", f:"this._progs", g:"this._time", h:new Date("2024-12-01").getTime(), i:"this._enjoy", j:"0:01", k:"this._song", l:"this._songURL", m:"this._objects", n:"easy", o:"creator", p:"this._featureLevel", q:"this._gameVersion", r:"this._lazyLength", s:"local"},
      17:{a:17, b:"this.name17", c:"this._title", d:"this._url", e:"6", f:"this._progs", g:"this._time", h:new Date("2024-12-01").getTime(), i:"this._enjoy",j:"0:01", k:"this._song", l:"this._songURL", m:"this._objects", n:"easy", o:"creator", p:"this._featureLevel", q:"this._gameVersion", r:"this._lazyLength", s:"local"},
      187:{a:187, b:"this.name17", c:"this._title", d:"this._url", e:"6", f:"this._progs", g:"this._time", h:new Date("2024-12-01").getTime(), i:"this._enjoy",j:"0:01", k:"this._song", l:"this._songURL", m:"this._objects", n:"insane", o:"creator", p:"this._featureLevel", q:"this._gameVersion", r:"this._lazyLength", s:"local"},
      1878:{a:1878, b:"this.name17", c:"this._title", d:"this._url", e:"6", f:"this._progs", g:"this._time", h:new Date("2024-12-01").getTime(), i:"this._enjoy",j:"0:01", k:"this._song", l:"this._songURL", m:"this._objects", n:"easy", o:"creator", p:"this._featureLevel", q:"this._gameVersion", r:"this._lazyLength", s:"local"},
  },
  sync:{
      get:(cb, cb2)=>{
          setTimeout(()=>typeof cb !== "function" ? cb2(chrome.storage.syncv) : cb(chrome.storage.syncv), 100)
      },
      set:(obj)=>{
          setTimeout(()=>Object.keys(obj).forEach(key=>chrome.storage.syncv[key]=obj[key]), 100)
      },
      remove:(key)=>{
          setTimeout(()=>delete chrome.storage.syncv[key], 100)
      },
      clear:()=>chrome.storage.syncv = {},
      QUOTA_BYTES:102400,
      getBytesInUse:(cb)=>{
        setTimeout(()=>cb(random(100, 90000)), 100)
      },
  },
  local:{
      get:(cb, cb2)=>{
          setTimeout(()=>typeof cb !== "function" ? cb2(chrome.storage.localv) : cb(chrome.storage.localv), 100)
      },
      set:(obj)=>{
          setTimeout(()=>Object.keys(obj).forEach(key=>chrome.storage.localv[key]=obj[key]), 100)
      },
      remove:(key)=>{
          setTimeout(()=>delete chrome.storage.localv[key], 100)
      },
      clear:()=>chrome.storage.localv = {},
      getBytesInUse:(cb)=>{
        setTimeout(()=>cb(random(100, 100000)), 100)
      },
      QUOTA_BYTES: 10485760
  }
},
  management: {
    getSelf:(cb)=>setTimeout(()=>cb({versionName:"2.003"}),100)
  }
}
console.log(chrome, Level)*/
