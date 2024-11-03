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
import Sidebar from './components/Sidebar.jsx'
import InfoSection from './components/InfoSection.jsx'
import {INFO_SECTION} from './components/InfoSection.jsx'
import { ActiveMenuContext, MENU_TYPES } from './components/contexts/ActiveMenuContext.jsx'

function App() {

  const levelManager = new LevelManager(useState([])),
        activeMenu = useState(MENU_TYPES.CLOSED)

  return (
    <LevelsContext.Provider value={levelManager}>
    <ActiveMenuContext.Provider value={activeMenu}>

      <StatusInfo className="version">V2.0</StatusInfo>
      {/* <StatusInfo className="onLine"></StatusInfo> TODO */}

      <MainHeader/>
      <MainList/>

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
        <InfoSection type={INFO_SECTION.ICON_LIST} headerText="Ranked Demons" value={[{demonType:"easy", demon:"0"},{demonType:"medium", demon:"0"},{demonType:"hard", demon:"0"},{demonType:"insane", demon:"0"},{demonType:"extreme", demon:"0"}]}></InfoSection>
        <InfoSection headerText="Total Stars" value={"410★"}></InfoSection>
        <InfoSection headerText="Total Attempts" value={"att"}></InfoSection>
        <InfoSection headerText="Most Objects" value={"obj"}></InfoSection>
        <InfoSection headerText="Least Objects" value={"obj"}></InfoSection>
        <InfoSection headerText="Oldest Level" value={"a"}></InfoSection>
        <InfoSection headerText="Most Recent Level" value={"a"}></InfoSection>
        <InfoSection type={INFO_SECTION.LIST} headerText="Most Attempts" value={["1", "2", "3"]}></InfoSection>
        <InfoSection type={INFO_SECTION.LIST} headerText="Biggest Flukes" value={["1", "2", "3"]}></InfoSection>
        <InfoSection type={INFO_SECTION.LIST} headerText="Worst Deaths" value={["1", "2", "3"]}></InfoSection>
        <InfoSection type={INFO_SECTION.LIST} headerText="Longest Journeys" value={["1", "(#41) Journey Sound, from 42% (58%)", "3"]}></InfoSection>
        <InfoSection type={INFO_SECTION.LIST} headerText="Longest Levels" value={["1", "2", "3"]}></InfoSection>
        <InfoSection type={INFO_SECTION.LIST} headerText="Recent Completions" value={["1", "2", "3"]}></InfoSection>
      </Sidebar>

      <Sidebar headerText="Profile">
        <InfoSection type={INFO_SECTION.SIMPLE_INPUT} headerText="Username"></InfoSection>
        <InfoSection type={INFO_SECTION.INFO_LIST} headerText="Profile Info" value={[{key:"Rank",value:"9344"}, {key:"Stars",value:"1"}, {key:"Moons",value:"1"}, {key:"Coins",value:"1"}, {key:"User Coins",value:"1"}, {key:"Diamonds",value:"1"}, {key:"Creator Points",value:"1"}, {key:"Levels completed",value:"1"}, {key:"Daily Levels  completed",value:"1"}, {key:"Weekly Demons completed",value:"1"}]}></InfoSection>
        <InfoSection type={INFO_SECTION.ICON_LIST2} headerText="Profile Demons (806 / 675)" title={"Classic: 661 | Plat.: 14 | Distinct Total: 675"} value={[{demonType:"easy", cdemon:"0", pdemon:"1"},{demonType:"medium", cdemon:"0", pdemon:"1"},{demonType:"hard", cdemon:"0", pdemon:"1"},{demonType:"insane", cdemon:"0", pdemon:"1"},{demonType:"extreme", cdemon:"0", pdemon:"1"}]}></InfoSection>
      </Sidebar>
      
    </ActiveMenuContext.Provider>
    </LevelsContext.Provider>
  )
}

export default App
