import { useContext, useRef } from "react"
import "./CSS/LevelInfoMenu.css"
import IconButton from "./IconButton"
import { ActiveMenuContext, MENU_TYPES } from "./contexts/ActiveMenuContext"
import { getFormatedDate, getUsedInputs, MAIN_SONGS_ID } from "../Utils/Utility"
import Level from "../models/Level"
import { LevelsContext } from "./contexts/LevelsContext"

/**
 * Don"t forget the doc!
 * @param {*}
 */
function LevelInfoMenu() {
    const inputsRef = useRef({}),
          [levelEdit,setActiveMenu] = useContext(ActiveMenuContext), isLevelEdit = levelEdit&&typeof levelEdit=="object",
          levelManager = useContext(LevelsContext),
          errorMsgRef = useRef(null)

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
        let inputs = inputsRef.current, id = getUsedInputs(inputsRef.current, true).id
        if (id) fetch("https://gdbrowser.com/api/level/"+id).then(r=>r.json()).then((stats)=>{
            if (force) inputs.name.value=inputs.song.value=inputs.songURL.value=inputs.objects.value=inputs.id.value=""

            inputs.song.value ||= stats.songName||""
            inputs.songURL.value ||= `https://www.newgrounds.com/audio/listen/${stats.customSong||MAIN_SONGS_ID[+stats.songID.match(/[0-9]+/gi)[0]-1]||""}`
            inputs.date.value ||= getFormatedDate()
            inputs.objects.value ||= stats.objects||""

            inputs.name.value = stats.name
            inputs.id.value = stats.id
            inputs.diff.value = stats.difficulty.match(/(easy|medium|hard|insane|extreme)/gi)[0].toLowerCase()||"hard"
            inputs.creator.value = stats.author||""
            inputs.gameVersion.value = stats.gameVersion||""
            inputs.lazyLength.value = stats.length||""
            inputs.featureLevel.value = !!stats.stars+[stats.featured, stats.epic, stats.legendary, stats.mythic].reduce((a, b)=>a+b,0)??""

        }).catch(e=>errorPopup("There is no existing level for this id"))
        else errorPopup("Enter a valid id to search")
    }

    // Creates or saves level
    function action() {
        const values = getUsedInputs(inputsRef.current, true)
        console.log(values)

        if (isLevelEdit) {// Save level
            console.log("TODO EDIT LEVEL")
        } else {// Create new level
            let level = new Level(values)
            levelManager.add(level)
        }

        setActiveMenu(MENU_TYPES.CLOSED)
    }

    // adjust arrow navigation for the rank input
    function rankAdjust(e) {
        let el = e.target, k = e.key.toLowerCase(), v = +el.value
        if (k == "arrowup") el.value = v-2
        else if (k == "arrowdown") el.value = v+2
    }

    function deleteLevel() {
        levelManager.remove(levelEdit?.uid)
        setActiveMenu(MENU_TYPES.CLOSED)
    }

    return <div className="LevelInfoMenu">

        {/* VALUE FIELDS */}
        <div className="lim_valuesID">
            <label title="The in game ID of the level">Id: <input placeholder={levelEdit?.id||"..."} ref={el=>inputsRef.current["id"]=el} type="number" autoComplete="off"/></label>
            <label title="Click to enter a level from Id"><div>Search <IconButton onClick={e=>navigator.onLine?searchById(e.ctrlKey):errorPopup("Cannot search, no internet connection")} size="22">$search</IconButton> </div>
            </label>
        </div>

        <div className="lim_values">
            <div>
                <label>Rank: <input onKeyDown={e=>rankAdjust(e)} ref={el=>inputsRef.current["rank"]=el} type="number" min="1" placeholder={levelEdit?.rank||"1..."} autoComplete="off"/></label>
                <label title="Text to display on hover">Title: <input ref={el=>inputsRef.current["title"]=el} type="text" placeholder={levelEdit?.title||"..."} autoComplete="off"/></label>
                <label>Attempts: <input ref={el=>inputsRef.current["attempts"]=el} type="number" min="0" placeholder={levelEdit?.attempts||"1..."} autoComplete="off"/></label>
                <label title="All the new bests on the level. (Enter values as such: 2 5 8 9 17 42 53 78 98 100)">Progresses: <input ref={el=>inputsRef.current["progs"]=el} type="text" placeholder={levelEdit?.progs||"2 5 8 9..."} autoComplete="off"/></label>
                <label title="Time, in days, taken to beat the level">Time taken: <input ref={el=>inputsRef.current["time"]=el} type="text" placeholder={levelEdit?.time||"1..."} autoComplete="off"/></label>
                <label title="The date of the completion">Beaten on: <input ref={el=>inputsRef.current["date"]=el} type="date" autoComplete="off"/></label>
                <label>Enjoyement: <div className="yoyo"><input ref={el=>inputsRef.current["enjoy"]=el} type="text" placeholder={levelEdit?.enjoy||"..."} autoComplete="off"/>/100</div></label>
            </div>

            <div>
                <label>Name: <input ref={el=>inputsRef.current["name"]=el} type="text" placeholder={levelEdit?.name||"..."} autoComplete="off"/></label>
                <label title="The URL of a YouTube video of the completion">Completion URL: <input ref={el=>inputsRef.current["url"]=el} type="url" placeholder={levelEdit?.url||"https://www.youtube.com/watch?v=..."} autoComplete="off"/></label>
                <label title="The in game length of the level (Enter values as such: 1:27 or 3:45 or 0:50 or 2:00 )">Length: <input ref={el=>inputsRef.current["length"]=el} type="text" placeholder={levelEdit?.length||"00:00..."} autoComplete="off"/></label>
                <label title="Name of the song used in the level">Song: <input ref={el=>inputsRef.current["song"]=el} type="text" placeholder={levelEdit?.song||"..."} autoComplete="off"/></label>
                <label title="The link that leads to the song">Song URL: <input ref={el=>inputsRef.current["songURL"]=el} type="url" placeholder={levelEdit?.songURL||"https..."} autoComplete="off"/></label> 
                <label title="Number of objects used in the level">Objects: <input ref={el=>inputsRef.current["objects"]=el} type="number"  min="1" placeholder={levelEdit?.objects||"1..."} autoComplete="off"/></label>
                <label title="The in game difficulty of the level">Difficulty: <select ref={el=>inputsRef.current["diff"]=el} className="lim_e_diff">
                    <option value={levelEdit?.diff||""}>{levelEdit?.diff||""}</option>
                    <option value="extreme">Extreme Demon</option>
                    <option value="insane">Insane Demon</option>
                    <option value="hard">Hard Demon</option>
                    <option value="medium">Medium Demon</option>
                    <option value="easy">Easy Demon</option>
                </select></label>
            </div>
        </div>

        {/* SERVER INFO FEILDS */}
        <div className="lim_hv">
               <input ref={el=>inputsRef.current["featureLevel"]=el} type="text" readOnly disabled/>
               <input ref={el=>inputsRef.current["gameVersion"]=el} type="text" readOnly disabled/>
               <input ref={el=>inputsRef.current["lazyLength"]=el} type="text" readOnly disabled/>
               <input ref={el=>inputsRef.current["creator"]=el} type="text" readOnly disabled/>
        </div>

        {/* API ERROR MESSAGE */}
        <div ref={errorMsgRef} className="lim_errorDiv"></div>

        {/* BUTTONS */}
        <button onClick={action} className="lim_saveBtn">{isLevelEdit ? "Save Level" : "Create Level"}</button>
        {isLevelEdit && <IconButton size="38" className="lim_deleteBtn" title="Delete Level Entry" onClick={deleteLevel}>$delete</IconButton>}
    </div>
}
export default LevelInfoMenu