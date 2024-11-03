import './CSS/LevelInfoMenu.css'
import IconButton from './IconButton'

/**
 * Don't forget the doc!
 * @param {*}
 */
function LevelInfoMenu() {
    return <div className="LevelInfoMenu">

        {/* VALUE FIELDS */}
        <div className="lim_valuesID">
            <label title="The in game ID of the level">Id: <input type="number" placeholder="..." autoComplete="off"/></label>
            <label title="Click to enter a level from Id"><div>Search <IconButton size="22">$search</IconButton> </div>
            </label>
        </div>

        <div className="lim_values">
            <div>
                <label>Rank: <input type="number" min="1" placeholder="1..." autoComplete="off"/></label>
                <label title="Text on hover">Title: <input type="text" placeholder="..." autoComplete="off"/></label>
                <label>Attempts: <input type="number" min="0" placeholder="1..." autoComplete="off"/></label>
                <label title="All the new bests on the level. (Enter values as such: 2 5 8 9 17 42 53 78 98 100)">Progresses: <input type="text" placeholder="2 5 8 9..." autoComplete="off"/></label>
                <label title="Time, in days, taken to beat the level">Time taken: <input type="text" placeholder="1..." autoComplete="off"/></label>
                <label title="The date of the completion">Beaten on: <input type="date" autoComplete="off"/></label>
                <label>Enjoyement: <div className="yoyo"><input type="text" placeholder="..." autoComplete="off"/>/100</div></label>
            </div>

            <div>
                <label>Name: <input type="text"placeholder="..." autoComplete="off"/></label>
                <label title="The URL of a YouTube video of the completion">Completion URL: <input type="url" placeholder="https..." autoComplete="off"/></label>
                <label title="The in game length of the level (Enter values as such: 1:27 or 3:45 or 0:50 or 2:00 )">Length: <input type="text" placeholder="00:00..." autoComplete="off"/></label>
                <label title="Name of the song used in the level">Song: <input type="text"  placeholder="Song..." autoComplete="off"/></label>
                <label title="The link that leads to the song">Song URL: <input type="url"  placeholder="https..." autoComplete="off"/></label> 
                <label title="Number of objects used in the level">Objects: <input type="number"  min="1" placeholder="1..." autoComplete="off"/></label>
                <label title="The in game difficulty of the level">Difficulty: <select className="lim_e_diff" placeholder="... Demon">
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
               <input type="text" readOnly disabled/> {/* featureLevel */}
               <input type="text" readOnly disabled/> {/* gameVersion */}
               <input type="text" readOnly disabled/> {/* lazyLength */}
               <input type="text" readOnly disabled/> {/* creator */}
        </div>

        {/* API ERROR MESSAGE */}
        <div className="lim_errorDiv"></div>

        {/* BUTTONS */}
        <button className="lim_saveBtn">Create Level</button>
        <IconButton size="38" className="lim_deleteBtn" title="Delete Level Entry">$delete</IconButton>
    </div>
}
export default LevelInfoMenu
