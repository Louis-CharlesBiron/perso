import { useContext, useEffect, useRef, useState } from 'react'
import './CSS/LevelSearchMenu.css'
import { LevelsContext } from './contexts/LevelsContext'
import { getFormatedDate, getLengthInSeconds } from '../Utils/Utility'
import { ActiveMenuContext, MENU_TYPES } from './contexts/ActiveMenuContext'

/**
 * Menu for detailed level search
 */
function LevelSearchMenu({mainListRef}) {
    const levelManager = useContext(LevelsContext),
          [,setActiveMenu] = useContext(ActiveMenuContext),
          inputsRef = useRef({}),
          [filteredLevels, setFilteredLevels] = useState({levels:levelManager.levels, filter:"name"})

    function inputHandler() {
        levelSearch(inputsRef.current.v.value, inputsRef.current.filter.value, inputsRef.current.mode.value)
    }

    // probably works
    function levelSearch(v, filter, mode) {
        let filteredList = [], ulist = levelManager.levels.map((x,i)=>({v:filter=="date"?getFormatedDate(x[filter]):x[filter], i}))

        // filter type
        if (filter == "gameVersion") {//gameVersion: only numbers
            ulist = ulist.map(x=>({v:x.v?.match(/[0-9.]+/g)?.[0]||null, i:x.i}))
            v = (mode == "range") ? v.match(/[0-9]{1}[.]{0,1}[0-9]+/g)||[1.0, 2.2]: v
        } else if (filter == "date") {//date: date.getTime() and transform input in type=date
            ulist = ["range", "bigger", "smaller"].includes(mode) ? ulist.map(x=>({v:new Date(x.v)?.getTime()||null, i:x.i})) : ulist
            if (mode == "range") v = v.match(/[0-9]{4}[/-][0-9]{1,2}[/-][0-9]{1,2}/g)?.map(x=>new Date(x).getTime())||[Date.now(), Date.now()]
            else if (mode == "bigger"||mode == "smaller") v = new Date(v)?.getTime()||Date.now()
        } else if (filter == "length") {//length : seconds
            ulist = ["range", "bigger", "smaller"].includes(mode) ? ulist.map(x=>({v:getLengthInSeconds(x.v)||null, i:x.i})) : ulist
            if (mode == "range") v = v.match(/[0-9:]+/g)?.map((x)=>getLengthInSeconds(x))||[0,100]
            else if (mode == "bigger"||mode == "smaller") v = getLengthInSeconds(v)||0
        }
        
        // mode
        if (mode == "match") filteredList = ulist.filter(x => (x.v+"")?.toLowerCase()?.includes((v+"")?.toLowerCase()) && x.v!=null)
        else if (mode == "strict") filteredList = ulist.filter(x => x.v == v && x.v!=null)
        else if (mode == "bigger") filteredList = ulist.filter(x => x.v > +v && x.v!=null)
        else if (mode == "smaller") filteredList = ulist.filter(x => x.v < +v && x.v!=null)
        else if (mode == "range") {
            let limits = ["date", "gameVersion", "length"].includes(filter) ? v : v.match(/[0-9]+/g)??[0,0]
            filteredList = ulist.filter(x=>(x.v >= limits[0]) && (x.v <= limits[1]) && x.v!=null)
        }

        setFilteredLevels({levels:filteredList.map(x=>levelManager.levels[x.i]), filter})
    }

    function scrollIntoView(i) {
        let el = mainListRef.current.children[i]
        setActiveMenu(MENU_TYPES.CLOSED)
        el.scrollIntoView()
        el.classList.add("ml_selectedAnim")
        setTimeout(()=>el.classList.remove("ml_selectedAnim"),2000)
    }

    return <div className="LevelSearchMenu">
        {/* FILTER SETTINGS */}
        <div className="lsm_inputs">
            <div className="lsm_filterSettings">
                <span>Filter levels by:</span>
                <div>
                    <select className="lsm_filterWhich" ref={el=>inputsRef.current.filter=el} onInput={inputHandler}>
                        <option value="name">Name</option>
                        <option value="title">Title</option>
                        <option value="creator">Creator</option>
                        <option value="id">Id</option>
                        <option value="gameVersion">Game version</option>
                        <option value="featureLevel">Feature level</option>
                        <option value="attempts">Attempts</option>
                        <option value="time">Time taken</option>
                        <option value="date">Beaten Date</option>
                        <option value="enjoy">Enjoyement</option>
                        <option value="length">Length</option>
                        <option value="objects">Objects</option>
                        <option value="diff">Difficulty</option>
                        <option value="storageType">Storage Type</option>
                    </select>
                    <select className="lsm_filterMode" ref={el=>inputsRef.current.mode=el} onInput={inputHandler}>
                        <option value="match">*=</option>
                        <option value="strict">=</option>
                        <option value="bigger">&gt;</option>
                        <option value="smaller">&lt;</option>
                        <option value="range">[x-y]</option>
                    </select> 
                    <input type="text" className="lsm_filterInput" autoCapitalize="false" autoComplete="off" ref={el=>inputsRef.current.v=el} onInput={inputHandler}/>
                </div>
            </div>
        </div>

        {/* RESULTS LIST */}
        <div className="lsm_resultsParent">
               <div className="lsm_resultCountParent">Results (<span>{(filteredLevels.length||0)+"/"+levelManager.levels.length}</span>)</div>
               <div className="lsm_resultList">
                {
                    filteredLevels.levels.map((l,i)=><span onClick={()=>scrollIntoView(l.rank-1)} className="lsm_result" key={i}>{`(#${l.rank}) ${l.name}, ${filteredLevels.filter}:${
                        filteredLevels.filter=="date" ?
                            getFormatedDate(l.date) :
                        filteredLevels.filter=="length" ?
                        l.getFormatedLength(true):l[filteredLevels.filter]
                    }`}</span>)
                }
               </div>
            </div>

    </div>
}
export default LevelSearchMenu
