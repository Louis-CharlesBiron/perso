import './CSS/LevelSearchMenu.css'

/**
 * Don't forget the doc!
 * @param {*}
 */
function LevelSearchMenu() {
    return <div className="LevelSearchMenu">

        {/* FILTER SETTINGS */}
        <div class="lsm_inputs">
            <div class="lsm_filterSettings">
                <span>Filter levels by:</span>
                <div>
                    <select className="lsm_filterWhich">
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
                    </select>
                    <select className="lsm_filterMode">
                        <option value="match">*=</option>
                        <option value="strict">=</option>
                        <option value="bigger">&gt;</option>
                        <option value="smaller">&lt;</option>
                        <option value="range">[x-y]</option>
                    </select> 
                    <input type="text" className="lsm_filterInput" autoCapitalize="false" autoComplete="off"/>
                </div>
            </div>
        </div>

        {/* RESULTS LIST */}
        <div className="lsm_resultsParent">
               <div className="lsm_resultCountParent">Results (<span>0/total</span>)</div>
               <div className="lsm_resultList">
                {/* TEMPLATE RESULT */}<span className="lsm_result">(#6) A Bizarre Phantasm, name:A Bizarre Phantasm</span>
               </div>
            </div>

    </div>
}
export default LevelSearchMenu
