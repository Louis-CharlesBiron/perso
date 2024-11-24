// JSX
// MyDemonList Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
import { useContext, useEffect, useRef } from "react"
import "./CSS/LevelInfoMenu.css"
import IconButton from "./IconButton"
import { ActiveMenuContext, MENU_TYPES } from "./contexts/ActiveMenuContext"
import { capitalize, getByteSize, getFormatedDate, getUsedInputs, isUserValue, MAIN_SONGS_ID, MAX_USERNAME_LL } from "../Utils/Utility"
import Level from "../models/Level"
import { LevelsContext } from "./contexts/LevelsContext"
import { OnLineContext } from "./contexts/OnLineContext"
import { UserContext } from "./contexts/UserContext"
// import { chrome } from '../App'

// Menu for level creation and edition
function LevelInfoMenu() {
    const inputsRef = useRef({}),
          [levelEdit,setActiveMenu] = useContext(ActiveMenuContext), isLevelEdit = levelEdit&&typeof levelEdit=="object",
          levelManager = useContext(LevelsContext),
          defaultStorageType = useContext(UserContext).defaultStorageType,
          errorMsgRef = useRef(null),
          setOnLine = useContext(OnLineContext)

    // displays error popup
    function errorPopup(message) {
        let el = errorMsgRef.current
        el.classList.add("lim_errorDivAnim")
        el.textContent = message
        setTimeout(()=>el.classList.remove("lim_errorDivAnim"), 3000)
    }

    // gdbrowser API call to retreive level info and fill up form 
    function searchById(force) {
        // I Love GD Cologne :D
        let inputs = inputsRef.current, id = getUsedInputs(inputsRef.current, true).id||+inputsRef.current.id.placeholder
        if (id) fetch("https://gdbrowser.com/api/level/"+id).then(r=>r.json()).then((stats)=>{
            if (force || !isUserValue(levelEdit, inputs.song)) inputs.song.value = stats.songName||""
            if (force || !isUserValue(levelEdit, inputs.songURL)) inputs.songURL.value = `https://www.newgrounds.com/audio/listen/${stats.customSong||MAIN_SONGS_ID[+stats.songID.match(/[0-9]+/gi)[0]-1]||""}`
            if (force || !isUserValue(levelEdit, inputs.date)) inputs.date.value = getFormatedDate()
            if (force || !isUserValue(levelEdit, inputs.objects)) inputs.objects.value = stats.objects||""

            inputs.name.value = stats.name
            inputs.id.value = stats.id
            inputs.diff.value = stats.difficulty.match(/(easy|medium|hard|insane|extreme)/gi)[0].toLowerCase()||"hard"
            inputs.creator.value = stats.author||""
            inputs.gameVersion.value = stats.gameVersion||""
            inputs.lazyLength.value = stats.length||""
            inputs.featureLevel.value = !!stats.stars+[stats.featured, stats.epic, stats.legendary, stats.mythic].reduce((a, b)=>a+b,0)

        }).catch(()=>errorPopup("There is no existing level with this id"))
        else errorPopup("Enter a valid id to search")
    }

    // Creates or saves level
    function action() {
        const values = getUsedInputs(inputsRef.current, true)
        if (levelManager.get(values.id)) errorPopup("A level with this id already exists")
        else {
            if (isLevelEdit) {// Edit/Save Level
                if (getByteSize(values) > 2 && (levelEdit.storageType=="sync" || values.storageType == "sync")) {
                    chrome.storage.sync.getBytesInUse(bytes=>{
                        if (bytes+(getByteSize(Level.fromObject({...levelEdit.toObject(), ...values}))-getByteSize(levelEdit))+MAX_USERNAME_LL > chrome.storage.sync.QUOTA_BYTES) errorPopup("Unable to update level: Synced storage is full")
                        else {
                            levelManager.update(levelEdit, values)
                            setActiveMenu(MENU_TYPES.CLOSED)
                        }
                    })
                } else {
                    levelManager.update(levelEdit, values)
                    setActiveMenu(MENU_TYPES.CLOSED)
                }
            } else if (values.id) {// Create new Level
                let level = new Level(values)
                //Check sync storage capacity
                if (level.storageType=="sync") {
                    chrome.storage.sync.getBytesInUse(bytes=>{
                        if (bytes+getByteSize(level.toStorageFormat())+MAX_USERNAME_LL > chrome.storage.sync.QUOTA_BYTES) errorPopup("Unable to create level: Synced storage is full")
                        else {
                            levelManager.add(level)
                            setActiveMenu(MENU_TYPES.CLOSED)
                        }
                    })
                } else {
                    levelManager.add(level)
                    setActiveMenu(MENU_TYPES.CLOSED)
                }
            } else errorPopup("The Id must be defined to create a level")
        }
    }

    // adjust arrow navigation for the rank input
    function rankAdjust(e) {
        let el = e.target, k = e.key.toLowerCase(), v = +el.value
        if (k == "arrowup") el.value = v-2
        else if (k == "arrowdown") el.value = v+2
    }

    function deleteLevel() {
        levelManager.remove(levelEdit)
        setActiveMenu(MENU_TYPES.CLOSED)
    }

    useEffect(()=>{
        let inputs = Object.values(inputsRef.current)

        inputs.forEach(el=>{
            // clear input when right click
            el.oncontextmenu=e=>{
                if (el.tagName !== "SELECT") {
                    e.preventDefault()
                    el.value = ""
                }
            }

            el.onkeydown=e=>{
                let k = e.key.toLowerCase()
                if (k=="enter") action()
            }

            // Fill input to current value when in edit mode
            let p = el.placeholder
            if (isLevelEdit && p) {
                el.onfocus=()=>{
                    if (isUserValue(levelEdit, el)) el.value = p
                }
                el.onblur=()=>{
                    if (el.value == p) el.value = ""
                }
            }
        })
    }, [])

    return <div className="LevelInfoMenu">

        {/* VALUE FIELDS */}
        <div className="lim_storageType" title="Storage Type">Storage:
            <select ref={el=>inputsRef.current["storageType"]=el}  autoComplete="off" defaultValue={isLevelEdit?undefined:defaultStorageType}>
                {isLevelEdit && <>
                        <option value="" title="Selected">{levelEdit?.storageType ? "("+capitalize(levelEdit.storageType)+")" : ""}</option>
                        <option disabled>- - -</option>
                </>}
                <option value="local">Local</option>
                <option value="sync">Sync</option>
            </select>
        </div>



        <div className="lim_valuesID">
            <label title="The in game ID of the level">Id: <input placeholder={levelEdit?.id||"..."} ref={el=>inputsRef.current["id"]=el} type="number" autoComplete="off"/></label>
            <label title="Click to enter a level from Id"><div>Search <IconButton onClick={e=>(setOnLine(navigator.onLine),navigator.onLine)?searchById(e.ctrlKey):errorPopup("Cannot search, no internet connection")} size="22">$search</IconButton> </div>
            </label>
        </div>

        <div className="lim_values">
            <div>
                <label>Rank: <input onKeyDown={e=>rankAdjust(e)} ref={el=>inputsRef.current["rank"]=el} type="number" min="1" placeholder={levelEdit?.rank||"1..."} autoComplete="off"/></label>
                <label title="Text to display on hover">Title: <input ref={el=>inputsRef.current["title"]=el} type="text" placeholder={levelEdit?.title||"..."} autoComplete="off"/></label>
                <label>Attempts: <input ref={el=>inputsRef.current["attempts"]=el} type="number" min="0" placeholder={levelEdit?.attempts||"1..."} autoComplete="off"/></label>
                <label title="All the new bests on the level. (Enter values as such: 2 5 8 9 17 42 53 78 98 100)">Progresses: <input ref={el=>inputsRef.current["progs"]=el} type="text" placeholder={levelEdit?.progs||"2 5 8 9..."} autoComplete="off"/></label>
                <label title="Time, in days, taken to beat the level">Time taken: <input ref={el=>inputsRef.current["time"]=el} type="text" placeholder={levelEdit?.time||"1..."} autoComplete="off"/></label>
                <label title="The date of the completion">Beaten on: <input placeholder={levelEdit?.date||"..."} title={isLevelEdit?"Currently: "+getFormatedDate(levelEdit.date):undefined} ref={el=>inputsRef.current["date"]=el} type="date" autoComplete="off"/></label>
                <label>Enjoyement: <div className="yoyo"><input ref={el=>inputsRef.current["enjoy"]=el} type="text" placeholder={levelEdit?.enjoy||"..."} autoComplete="off"/>/100</div></label>
            </div>

            <div>
                <label>Name: <input ref={el=>inputsRef.current["name"]=el} type="text" placeholder={levelEdit?.name||"..."} autoComplete="off"/></label>
                <label title="The URL of a YouTube video of the completion">Completion URL: <input ref={el=>inputsRef.current["url"]=el} type="url" placeholder={levelEdit?.url||"https://www.youtube.com/watch?v=..."} autoComplete="off"/></label>
                <label title="The in game length of the level (Enter values as such: 1:27 or 3:45 or 0:50 or 2:00 )">Length: <input ref={el=>inputsRef.current["length"]=el} type="text" placeholder={levelEdit instanceof Level ? levelEdit?.length||"00:00..." : "00:00..."} autoComplete="off"/></label>
                <label title="Name of the song used in the level">Song: <input ref={el=>inputsRef.current["song"]=el} type="text" placeholder={levelEdit?.song||"..."} autoComplete="off"/></label>
                <label title="The link that leads to the song">Song URL: <input ref={el=>inputsRef.current["songURL"]=el} type="url" placeholder={levelEdit?.songURL||"https..."} autoComplete="off"/></label> 
                <label title="Number of objects used in the level">Objects: <input ref={el=>inputsRef.current["objects"]=el} type="number"  min="1" placeholder={levelEdit?.objects||"1..."} autoComplete="off"/></label>
                <label title="The in game difficulty of the level">Difficulty: 
                    <select ref={el=>inputsRef.current["diff"]=el} className="lim_e_diff">
                    {isLevelEdit && <>
                        <option value="" title="Selected">{levelEdit?.diff ? "("+capitalize(levelEdit.diff)+" Demon)" : ""}</option>
                        <option disabled>- - -</option>
                    </>}
                    <option value="extreme">Extreme Demon</option>
                    <option value="insane">Insane Demon</option>
                    <option defaultChecked value="hard">Hard Demon</option>
                    <option value="medium">Medium Demon</option>
                    <option value="easy">Easy Demon</option>
                </select></label>
            </div>
        </div>

        {/* SERVER INFO FEILDS */}
        <div className="lim_hv">
               <input ref={el=>inputsRef.current["creator"]=el} type="text" readOnly disabled/>
               <input ref={el=>inputsRef.current["lazyLength"]=el} type="text" readOnly disabled/>
               <input ref={el=>inputsRef.current["featureLevel"]=el} type="text" readOnly disabled/>
               <input ref={el=>inputsRef.current["gameVersion"]=el} type="text" readOnly disabled/>
        </div>

        {/* API ERROR MESSAGE */}
        <div ref={errorMsgRef} className="lim_errorDiv"></div>

        {/* BUTTONS */}
        <button onClick={action} className="lim_saveBtn">{isLevelEdit ? "Save Level" : "Create Level"}</button>
        {isLevelEdit && <IconButton size="38" className="lim_deleteBtn" title="Delete Level Entry" onClick={deleteLevel}>$delete</IconButton>}
    </div>
}
export default LevelInfoMenu
