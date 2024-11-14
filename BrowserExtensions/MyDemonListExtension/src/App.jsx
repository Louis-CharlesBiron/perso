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
    chrome.management.getSelf(e=>setVersion(e.version))
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
    "$u":"LCB79",
    //"$l":["Sonic Wave","Apollo 11","Phobos","Marathon","Bloodbath","A Bizarre Phantasm","Gangimari","moment","aftermath","Duelo Maestro","Sigma Interface","Dark Odyssey","Acu","Cataclysm","Allegiance","Azurite","The End","ICDX","Ulon","The Mines Circles","Acropolis","Crossroads","Invisible Deadlocked","El Dorado","Poltergeist","Carp Minor","Fishbass","CHROMA","Supersonic","SlaughterHouse","Buff This","Sharp Minor","Windy Landscape","Stereo Demoness","dooMEd","Omicron","Stalemate","The Moonlight","Surgeragon","The JanuS Miracle","Journey Into Sound","Unnamed 411"]
    
    //"A Bizarre Phantasm":{"attempts":"19875","creator":"TeamN2","date":"2023-11-18","diff":"extreme","enjoy":"42","featureLevel":"1","gameVersion":"2.1","id":"16023141","lazyLength":"Long","length":"1:58","name":"A Bizarre Phantasm","objects":"39686","progs":"6 9 10 28 41 54 61 64 66 69 71 80 100","rank":4,"song":"Betrayal Of Fate","songURL":"https://www.newgrounds.com/audio/listen/137492","time":"43","title":"finally man..","url":"https://www.youtube.com/watch?v=TFXv_hUul3I"},"Acropolis":{"attempts":"9402","creator":"Zobros","date":"2023-05-25","diff":"insane","enjoy":"38","featureLevel":"1","gameVersion":"2.0","id":"5155022","lazyLength":"Long","length":"1:14","name":"Acropolis","objects":"11083","progs":"3 4 5 7 8 10 17 27 29 53 55 60 78 100","rank":14,"song":"-Final Battle-","songURL":"https://www.newgrounds.com/audio/listen/598349","time":"2","title":"","url":"https://www.youtube.com/watch?v=-kyNoiaXEjw"},"Acu":{"attempts":"12446","creator":"neigefeu","date":"2023-06-14","diff":"extreme","enjoy":"85","featureLevel":"2","gameVersion":"2.1","id":"61079355","lazyLength":"Long","length":"1:17","name":"Acu","objects":"32155","progs":"1 2 3 4 7 11 12 13 15 16 18 23 28 29 30 62 76 92 98 100","rank":12,"song":"Epiloge - Creo","songURL":"https://www.newgrounds.com/audio/listen/723714","time":"1","title":"I beat Acu!","url":"https://www.youtube.com/watch?v=o8AqRXlGUfc"},"Allegiance":{"attempts":"3238","creator":"nikroplays","date":"2024-05-10","diff":"extreme","enjoy":"89","featureLevel":"2","gameVersion":"2.0","id":"20761188","lazyLength":"Long","length":"1:32","name":"Allegiance","objects":"62018","progs":"10 11 62 100","rank":14,"song":"I Got No Time","songURL":"https://www.newgrounds.com/audio/listen/672264","time":"6","title":"lol","url":"https://www.youtube.com/watch?v=MrESFeuSFrM"},"Apollo 11":{"attempts":"17204","creator":"nasgubb","date":"2024-04-22","diff":"extreme","enjoy":"81","featureLevel":"4","gameVersion":"2.1","id":"83164497","lazyLength":"XL","length":"3:39","name":"Apollo 11","objects":"190108","progs":"1 5 6 7 8 13 22 27 32 33 39 44 52 67 70 75 100","rank":2,"song":"A Tiny Spaceships Final Mission","songURL":"https://www.newgrounds.com/audio/listen/560407","time":"52","title":"it's done :`)","url":"https://www.youtube.com/watch?v=3YAGHFBl6sU"},"Azurite":{"attempts":"4411","creator":"Sillow","date":"2023-09-17","diff":"extreme","enjoy":"95","featureLevel":"1","gameVersion":"2.1","id":"62214792","lazyLength":"Long","length":"1:09","name":"Azurite","objects":"86524","progs":"1 3 4 5 7 8 17 20 22 26 39 46 47 58 100","rank":11,"song":"Center Of Existence","songURL":"https://www.youtube.com/watch?v=HYgdTcBdpoY","time":"4","title":"Fluke from 58%","url":"https://www.youtube.com/watch?v=5VJvOzdhl4E"},"Bloodbath":{"attempts":"10451","creator":"Riot","date":"2023-12-10","diff":"extreme","enjoy":"95","featureLevel":"1","gameVersion":"2.1","id":"10565740","lazyLength":"Long","length":"1:52","name":"Bloodbath","objects":"24746","progs":"1 2 3 6 7 8 11 14 16 17 19 25 27 31 51 58 65 76 85 100","rank":3,"song":"At The Speed Of light","songURL":"https://www.newgrounds.com/audio/listen/467339","time":"20","title":"omg wtf","url":"https://www.youtube.com/watch?v=fpK9UxIKooo"},"Buff This":{"attempts":"2788","creator":"BoyoftheCones","date":"2023-09-23","diff":"insane","enjoy":"58","featureLevel":"1","gameVersion":"2.1","id":"38306937","lazyLength":"Long","length":"1:02","name":"Buff This","objects":"62803","progs":"1 2 3 4 6 8 27 31 35 53 71 80 82 85 95 100","rank":27,"song":"Nerf This","songURL":"https://www.newgrounds.com/audio/listen/726252","time":"1","title":":/","url":"https://www.youtube.com/watch?v=p8soMpxh82Q"},"CHROMA":{"attempts":"5480","creator":"Renn241","date":"2023-03-13","diff":"insane","enjoy":"26","featureLevel":"1","gameVersion":"2.1","id":"68372319","lazyLength":"Long","length":"1:0","name":"CHROMA","objects":"94540","progs":"3 8 10 11 13 14 18 21 23 28 35 38 54 63 71 79 97 100","rank":22,"song":"{Rose}","songURL":"https://www.newgrounds.com/audio/listen/65711","time":"","title":"a level","url":"https://www.youtube.com/watch?v=rp_eQuPKYk8"},"Carp Minor":{"attempts":"3279","creator":"fishbass","date":"2023-01-16","diff":"insane","enjoy":"37","featureLevel":"1","gameVersion":"2.1","id":"87353798","lazyLength":"Long","length":"1:17","name":"Carp Minor","objects":"76449","progs":"2 4 7 22 23 46 60 65 73 83 92 100","rank":20,"song":"ill sharp minor","songURL":"https://www.newgrounds.com/audio/listen/559803","time":"5","title":"","url":"https://www.youtube.com/watch?v=TGAczoXgC_4"},"Cataclysm":{"attempts":"34439","creator":"Ggb0y","date":"2023-05-29","diff":"extreme","enjoy":"74","featureLevel":"1","gameVersion":"2.0","id":"3979721","lazyLength":"Long","length":"1:27","name":"Cataclysm","objects":"15216","progs":"1 2 5 10 11 13 18 20 23 24 36 41 48 74 100","rank":9,"song":"At The Speed Of Light","songURL":"https://www.newgrounds.com/audio/listen/467339","time":"2","title":"","url":"https://www.youtube.com/watch?v=rNw9EYaOkTw"},"Crossroads":{"attempts":"1574","creator":"mbed","date":"2024-05-04","diff":"insane","enjoy":"81","featureLevel":"1","gameVersion":"2.1","id":"77031301","lazyLength":"XL","length":"5:1","name":"Crossroads","objects":"57494","progs":"3 4 6 12 41 55 75 100","rank":19,"song":"apricot special","songURL":"https://www.newgrounds.com/audio/listen/1091340","time":"7","title":":D","url":"https://www.youtube.com/watch?v=6b5J1eb5Xps"},"Dark Odyssey":{"attempts":"25473","creator":"JonathanGD","date":"2023-05-27","diff":"extreme","enjoy":"50","featureLevel":"2","gameVersion":"2.2","id":"69010770","lazyLength":"XL","length":"06:15","name":"Dark Odyssey","objects":"311900","progs":"2 6 7 10 16 18 23 27 32 34 35 41 50 59 64 73 76 82 99 100","rank":8,"song":"Dark Matter Suite","songURL":"https://www.newgrounds.com/audio/listen/693041","time":"3","title":"Omg, I just- HUU","url":"https://www.youtube.com/watch?v=6fO1XW76jIw"},"Duelo Maestro":{"attempts":"43000","creator":"Nacho21","date":"2022-01-20","diff":"insane","enjoy":"95","featureLevel":"1","gameVersion":"2.1","id":"23298409","lazyLength":"XL","length":"03:43","name":"Duelo Maestro","objects":"45133","progs":"1 2 3 4 5 7 8 9 15 18 25 30 41 42 43 52 53 79 100","rank":7,"song":"~Lunar Abyss~","songURL":"https://www.youtube.com/watch?v=F_TV4vZRSE8","time":"120","title":"What a journey <3","url":"https://www.youtube.com/watch?v=aC-VFIgagJ4"},"El Dorado":{"attempts":"9172","creator":"LmAnubis","date":"2022-09-10","diff":"insane","enjoy":"40","featureLevel":"1","gameVersion":"2.0","id":"11904920","lazyLength":"Long","length":"1:0","name":"El Dorado","objects":"8879","progs":"2 4 5 6 7 8 10 13 17 35 36 51 68 71 100","rank":18,"song":"-Thunderzone v2-","songURL":"https://www.newgrounds.com/audio/listen/638150","time":"5","title":"This level is actually quite hard! Quite glad it's done (beaten in five days :)). Overall kind of fun, but I don't exactly recommend. 5th insane demon tho :)","url":"https://www.youtube.com/watch?v=DKYLG-kw9R8"},"Fishbass":{"attempts":"5813","creator":"fishbass","date":"2023-01-19","diff":"insane","enjoy":"70","featureLevel":"1","gameVersion":"2.1","id":"86565813","lazyLength":"Long","length":"1:12","name":"Fishbass","objects":"57333","progs":"1 18 20 28 29 30 42 73 74 75 91 100","rank":22,"song":"Fracture","songURL":"https://www.newgrounds.com/audio/listen/433947","time":"","title":"Pretty fun","url":"https://www.youtube.com/watch?v=VNm4_ZkIkG4"},"Gangimari":{"attempts":"12782","creator":"64x","date":"2024-02-25","diff":"extreme","enjoy":"98","featureLevel":"1","gameVersion":"2.1","id":"85698971","lazyLength":"Long","length":"1:13","name":"Gangimari","objects":"50343","progs":"2 3 15 39 40 41 49 63 73 100","rank":5,"song":"GANGIMARI","songURL":"https://www.newgrounds.com/audio/listen/1158842","time":"19","title":"fluke from 73%!!!! :D","url":"https://www.youtube.com/watch?v=jH3DUGSfydA"},"ICDX":{"attempts":"3580","creator":"-","date":"2023-09-27","diff":"insane","enjoy":"88","featureLevel":"1","gameVersion":"Pre-1.7","id":"814678","lazyLength":"Long","length":"1:27","name":"ICDX","objects":"7816","progs":"1 2 3 4 27 28 40 100","rank":13,"song":"Clubstep","songURL":"https://www.youtube.com/watch?v=vj8ZW0jr83I","time":"3","title":"fluke from fucking 40","url":"https://www.youtube.com/watch?v=u-xUl24IqsA"},"Invisible Deadlocked":{"attempts":"8072","creator":"KrmaL","date":"","diff":"insane","enjoy":"80","featureLevel":"1","gameVersion":"2.0","id":"14145098","lazyLength":"Long","length":"1:39","name":"Invisible Deadlocked","objects":"19460","progs":"2 4 6 8 10 11 16 26 36 46 74 78 100","rank":17,"song":"Deadlocked","songURL":"https://www.youtube.com/watch?v=OPBECnDBiRQ","time":"","title":"","url":""},"Journey Into Sound":{"attempts":"472","creator":"iriswolfx","date":"2024-10-15","diff":"insane","enjoy":"81","featureLevel":"2","gameVersion":"2.1","id":"73888166","lazyLength":"Long","length":"1:0","name":"Journey Into Sound","objects":"39549","progs":"1 7 18 20 24 42 100","rank":41,"song":"{dj-N} Journey Into Sound","songURL":"https://www.newgrounds.com/audio/listen/73552","time":"1","title":"35 minutes demon","url":"https://www.youtube.com/watch?v=sbZrBShP5wk"},"Marathon":{"attempts":"39428","creator":"weoweoteo","date":"2023-05-23","diff":"extreme","enjoy":"Fucking glad it's done","featureLevel":"1","gameVersion":"2.1","id":"57595201","lazyLength":"XL","length":"4:34","name":"Marathon","objects":"32990","progs":"1 2 3 4 5 7 9 10 13 14 15 16 17 19 22 23 29 33 65 67 69 70 93 100","rank":2,"song":"Troubles","songURL":"https://www.youtube.com/watch?v=e_CqYoKGef4","time":"125","title":"Definition of daunting, but I love it","url":"https://www.youtube.com/watch?v=a4XNW8z8N68"},"Omicron":{"attempts":"1308","creator":"Vlacc","date":"2023-07-18","diff":"hard","enjoy":"96","featureLevel":"2","gameVersion":"2.0","id":"20053020","lazyLength":"Long","length":"1:01","name":"Omicron","objects":"12684","progs":"1 23 41 50 60 89 100","rank":30,"song":"Buzzstone Symphony","songURL":"https://www.newgrounds.com/audio/listen/183180","time":"1","title":"I beat this in under 45 min :D. Very fun level, but very skill based!","url":"https://www.youtube.com/watch?v=uB4P0N0_hhw"},"Phobos":{"attempts":"38354","creator":"KrmaL","date":"2023-09-08","diff":"extreme","enjoy":"78","featureLevel":"1","gameVersion":"2.0","id":"19759411","lazyLength":"XL","length":"2:16","name":"Phobos","objects":"26211","progs":"1 3 4 9 11 14 20 22 25 26 27 35 43 50 57 59 63 69 78 82 84 100","rank":1,"song":"Phobos","songURL":"https://www.youtube.com/watch?v=zMsxKPtZDZ8","time":"75","title":"AAAAAAAAAAAAAAAAAAAAA","url":"https://www.youtube.com/watch?v=cTTrYbYmlUU"},"Poltergeist":{"attempts":"29422","creator":"Andromeda GMD","date":"2022-06-28","diff":"insane","enjoy":"52","featureLevel":"1","gameVersion":"2.1","id":"7054561","lazyLength":"Long","length":"1:0","name":"Poltergeist","objects":"14871","progs":"5 6 9 10 12 15 17 20 21 25 26 27 29 32 57 79 86 100","rank":19,"song":"Poltergeist","songURL":"https://www.newgrounds.com/audio/listen/587870","time":"","title":"I beat it","url":"https://www.youtube.com/watch?v=jlggVLa1LHg"},"Sharp Minor":{"attempts":"5600","creator":"Giron","date":"2022-09-04","diff":"insane","enjoy":"66","featureLevel":"1","gameVersion":"1.9","id":"10312917","lazyLength":"Long","length":"1:8","name":"Sharp Minor","objects":"17428","progs":"1 6 12 13 22 32 37 48 50 54 55 58 59 66 68 76 87 89 90 100","rank":27,"song":"ill sharp minor","songURL":"https://www.newgrounds.com/audio/listen/559803","time":"4","title":"Overall, I think this level is quite fun!","url":"https://www.youtube.com/watch?v=ccF9H-jynMg"},"Sigma Interface":{"attempts":"5864","creator":"Platnuu","date":"2024-10-13","diff":"extreme","enjoy":"70","featureLevel":"2","gameVersion":"2.1","id":"62551239","lazyLength":"Long","length":"1:11","name":"Sigma Interface","objects":"73588","progs":"7 11 16 17 37 42 43 60 70 77 84 100","rank":11,"song":"Amaryllis - Hiver","songURL":"https://www.newgrounds.com/audio/listen/922309","time":"9","title":"cool :)","url":"https://www.youtube.com/watch?v=iGk72cyGFS8"},"SlaughterHouse":{"attempts":"2290","creator":"Havok","date":"2023-10-01","diff":"insane","enjoy":"33","featureLevel":"1","gameVersion":"2.1","id":"13850073","lazyLength":"Long","length":"1:15","name":"SlaughterHouse","objects":"16131","progs":"2 3 9 11 15 16 18 21 22 25 47 52 87 100","rank":25,"song":"Screamroom","songURL":"586809","time":"2","title":"goodn't","url":"https://www.youtube.com/watch?v=qeZvZib_mzY"},"Sonic Wave":{"attempts":"45084","creator":"lSunix","date":"2024-09-14","diff":"extreme","enjoy":"55","featureLevel":"1","gameVersion":"2.2","id":"26681070","lazyLength":"XL","length":"2:01","name":"Sonic Wave","objects":"23157","progs":"1 2 4  5 11 14 16 17 20 34 37 38 44 52 55 66 88 89 92 100","rank":1,"song":"F-777 - Sonic Blaster","songURL":"https://www.newgrounds.com/audio/listen/574484","time":"116","title":"finally over","url":"https://www.youtube.com/watch?v=qHX6_jSrnrU"},"Stalemate":{"attempts":"1740","creator":"Nox","date":"2023-09-29","diff":"insane","enjoy":"73","featureLevel":"1","gameVersion":"1.9","id":"4545425","lazyLength":"Long","length":"1:35","name":"Stalemate","objects":"10565","progs":"1 6 9 12 13 55 59 70 88 98 100","rank":37,"song":"kzx - Stalemate","songURL":"https://www.newgrounds.com/audio/listen/482872","time":"1","title":"98% 💀","url":"https://www.youtube.com/watch?v=RRtcVQFtjKs"},"Stereo Demoness":{"attempts":"1400","creator":"MaJackO","date":"2023-06-22","diff":"insane","enjoy":"100","featureLevel":"1","gameVersion":"1.8","id":"260693","lazyLength":"Long","length":"1:27","name":"Stereo Demoness","objects":"6723","progs":"3 11 78 100","rank":26,"song":"Stereo Madness","songURL":"https://www.youtube.com/watch?v=JhKyKEDxo8Q","time":"4","title":"Best map in the game","url":"https://www.youtube.com/watch?v=sXM2HtgT-A8"},"Supersonic":{"attempts":"42000","creator":"ZenthicAlpha","date":"2021-06-02","diff":"insane","enjoy":"75","featureLevel":"1","gameVersion":"2.1","id":"4706930","lazyLength":"Long","length":"1:33","name":"Supersonic","objects":"21372","progs":"1 2 6 9 11 14 17 19 24 29 31 36 37 42 43 45 50 60 61 66 68 72 88 100","rank":23,"song":"Ludicrous Speed","songURL":"https://www.newgrounds.com/audio/listen/467267","time":"60","title":"I can do it","url":"https://www.youtube.com/watch?v=S-iFGGMZOB4"},"Surgeragon":{"attempts":"730","creator":"HHyper","date":"2024-03-29","diff":"hard","enjoy":"94","featureLevel":"2","gameVersion":"2.1","id":"52757208","lazyLength":"XL","length":"5:25","name":"Surgeragon","objects":"65535","progs":"1 2 3 4 7 9 36 42 46 100","rank":33,"song":"Domyeah - Final Boss","songURL":"https://www.newgrounds.com/audio/listen/631160","time":"3","title":"500th demon :)","url":"https://www.youtube.com/watch?v=-Q3BBJlXwj8"},"The End":{"attempts":"5600","creator":"Zylenox","date":"2023-04-30","diff":"insane","enjoy":"85","featureLevel":"1","gameVersion":"2.1","id":"63915746","lazyLength":"XL","length":"2:36","name":"The End","objects":"200053","progs":"1 2 4 7 10 12 14 16 19 44 77 83 100","rank":12,"song":"Our Special Place","songURL":"https://www.youtube.com/watch?v=RJoxs41Wias","time":"6","title":"This level is really cool! I would definitely recommend. This is my 12th insane demon and overall 95th demon!","url":"https://www.youtube.com/watch?v=RJiZM2x0T6s"},"The JanuS Miracle":{"attempts":"534","creator":"Megadere","date":"2024-09-16","diff":"insane","enjoy":"49","featureLevel":"1","gameVersion":"1.9","id":"918766","lazyLength":"Long","length":"1:36","name":"The JanuS Miracle","objects":"8955","progs":"7 11 14 27 32 54 56 64 74 100","rank":39,"song":"How to Clutterfunk","songURL":"https://www.newgrounds.com/audio/listen/595773","time":"3","title":"ship challenge","url":"https://www.youtube.com/watch?v=Lp5xSbNvyz8"},"The Mines Circles":{"attempts":"1936","creator":"royen","date":"2024-04-27","diff":"insane","enjoy":"88","featureLevel":"2","gameVersion":"2.1","id":"90222644","lazyLength":"Long","length":"1:55","name":"The Mines Circles","objects":"73571","progs":"1 20 23 82 84 94 100","rank":17,"song":"[TMM43] The 7th Day","songURL":"https://www.newgrounds.com/audio/listen/188804","time":"4","title":"cool :)","url":"https://www.youtube.com/watch?v=GSOxcJV-xlg"},"The Moonlight":{"attempts":"1400","creator":"Tassium","date":"2024-02-06","diff":"insane","enjoy":"80","featureLevel":"1","gameVersion":"2.1","id":"96306860","lazyLength":"Long","length":"","name":"The Moonlight","objects":"65535","progs":"","rank":31,"song":"{Midnight}","songURL":"https://www.newgrounds.com/audio/listen/60919","time":"2","title":"gg","url":"https://www.youtube.com/watch?v=iMdiPe7ddQM"},"Ulon":{"attempts":"12500","creator":"OliSW","date":"2022-10-19","diff":"insane","enjoy":"80","featureLevel":"1","gameVersion":"2.1","id":"68688822","lazyLength":"Long","length":"1:41","name":"Ulon","objects":"78761","progs":"1 2 3 7 18 29 31 36 37 48 49 50 58 75 89 90 95 97 100","rank":15,"song":"Infestation","songURL":"https://www.newgrounds.com/audio/listen/792910","time":"25","title":"This level is really cool! Enjoyed pretty much every part. Would Absolutely recommend!","url":"https://www.youtube.com/watch?v=A6zwmtmyLEg"},"Unnamed 411":{"attempts":"","creator":"","date":"","diff":"insane","enjoy":"","featureLevel":"","gameVersion":"","id":"","lazyLength":"","length":"","name":"Unnamed 411","objects":"","progs":"","rank":0,"song":"","songURL":"","time":"","title":"","url":""},"Windy Landscape":{"attempts":"","creator":"WOOGI1411","date":"2023-01-01","diff":"insane","enjoy":"45","featureLevel":"1","gameVersion":"2.2","id":"4957691","lazyLength":"Long","length":"1:17","name":"Windy Landscape","objects":"10891","progs":"2 3 5 10 12 19 26 30 36 39 40 57 97 100","rank":27,"song":"Windfall","songURL":"https://www.newgrounds.com/audio/listen/621135","time":"4","title":"I almost beat this in a day, but I got 97% and ended up beating it 3 days later. Overall not that bad of a level, but definitely not my type.","url":"https://www.youtube.com/watch?v=SjIHbqjcO6Q"},"aftermath":{"attempts":"9509","creator":"IIExenityII","date":"2023-12-28","diff":"extreme","enjoy":"45","featureLevel":"1","gameVersion":"2.1","id":"25610878","lazyLength":"Long","length":"1:3","name":"aftermath","objects":"16107","progs":"","rank":6,"song":"At The Speed Of Light","songURL":"https://www.newgrounds.com/audio/listen/467339","time":"18","title":"idk","url":"https://www.youtube.com/watch?v=ltrZEjrN2As"},"dooMEd":{"attempts":"1719","creator":"MaxxoRMeN","date":"2023-09-10","diff":"insane","enjoy":"74","featureLevel":"2","gameVersion":"2.1","id":"91966426","lazyLength":"Medium","length":"0:30","name":"dooMEd","objects":"16000","progs":"3 6 24 47 56 58 67 75 79 100","rank":29,"song":"daydream","songURL":"https://www.newgrounds.com/audio/listen/1212855","time":"1","title":"1h completion","url":"https://www.youtube.com/watch?v=xdQRLTOqrGQ"},"moment":{"attempts":"10153","creator":"lexycat","date":"2024-02-04","diff":"extreme","enjoy":"90","featureLevel":"1","gameVersion":"2.1","id":"68848817","lazyLength":"Long","length":"1:02","name":"moment","objects":"31553","progs":"2 12 14 16 19 26 29 53 64 76 87 100","rank":6,"song":"moment","songURL":"https://www.youtube.com/watch?v=1QMG2QjsjdA","time":"15","title":"10th extreme :)","url":"https://www.youtube.com/watch?v=NamE7cErIUs"}
      //$u:"vortrox",
      $s:"local",
      $l:[17],//[128, 123012309, 333, 111, 129, 222],
      //128:{a:128, b:"name128", c:"title", d:"url", e:"1123123", f:"1 3 4 10 100", g:"1", h:Date.now(), i:"enjoyement", j:"5:35", k:"song", l:"songURL", m:"325678", n:"easy", o:"creator", p:"1", q:"2.2", r:"XL", s:"sync"},
      //129:{a:129, b:"this._name129", c:"this._title", d:"this._url", e:"2", f:"9 68 100", g:"22", h:new Date("2024-01-01").getTime(), i:"this._enjoy", j:"this._length", k:"this._song", l:"this._songURL", m:"this._objects", n:"insane", o:"creator", p:"this._featureLevel", q:"this._gameVersion", r:"this._lazyLength", s:"sync"},
      //123012309:{a:123012309, b:"this._name123012309", c:"this._title", d:"this._url", e:"3", f:"this._progs", g:"333", h:new Date("2024-06-01").getTime(), i:"this._enjoy", j:"3:", k:"this._song", l:"this._songURL", m:"this._objects", n:"insane", o:"creator", p:"this._featureLevel", q:"this._gameVersion", r:"this._lazyLength", s:"sync"},
  },
  localv:{
      //111:{a:111, b:"this._name111", c:"this._title", d:"this._url", e:"4", f:"this._progs", g:"this._time", h:new Date("2023-08-15").getTime(), i:"this._enjoy", j:"5:00", k:"this._song", l:"this._songURL", m:"this._objects", n:"insane", o:"creator", p:"this._featureLevel", q:"this._gameVersion", r:"this._lazyLength", s:"local"},
      //222:{a:222, b:"this._name222", c:"this._title", d:"this._url", e:"5", f:"this._progs", g:"this._time", h:new Date("2023-09-15").getTime(), i:"this._enjoy", j:"2", k:"this._song", l:"this._songURL", m:"this._objects", n:"easy", o:"creator", p:"this._featureLevel", q:"this._gameVersion", r:"this._lazyLength", s:"local"},
      //333:{a:333, b:"this._name333", c:"this._title", d:"this._url", e:"6", f:"this._progs", g:"this._time", h:new Date("2024-12-01").getTime(), i:"this._enjoy", j:"0:01", k:"this._song", l:"this._songURL", m:"this._objects", n:"hard", o:"creator", p:"this._featureLevel", q:"this._gameVersion", r:"this._lazyLength", s:"local"},
      17:{a:17, b:"this.name17", c:"this._title", d:"this._url", e:"6", f:"this._progs", g:"this._time", h:new Date("2024-12-01").getTime(), i:"this._enjoy",j:"0:01", k:"this._song", l:"this._songURL", m:"this._objects", n:"hard", o:"creator", p:"this._featureLevel", q:"this._gameVersion", r:"this._lazyLength", s:"local"},
  },
  sync:{
      get:(cb)=>{
          setTimeout(()=>cb(chrome.storage.syncv), 100)
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
      get:(cb)=>{
          setTimeout(()=>cb(chrome.storage.localv), 100)
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
    getSelf:(cb)=>setTimeout(()=>cb({version:"2.0"}),100)
  }
}*/


