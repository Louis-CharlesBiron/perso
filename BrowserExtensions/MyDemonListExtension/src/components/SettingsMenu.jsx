import { useContext, useRef } from 'react'
import { chrome } from '../App'
import './CSS/SettingsMenu.css'
import IconButton from './IconButton'
import StorageWheel from './StorageWheel'
import { LevelsContext } from './contexts/LevelsContext'
import { UserContext } from './contexts/UserContext'
import { isValidJson, readFile } from '../Utils/Utility'

/**
 * The settings menu
 */
function SettingsMenu() {
    const levelManager = useContext(LevelsContext),
          userManager = useContext(UserContext),
          errorMsgRef = useRef(null),
          dataInput = useRef(null)

    function getCurrentSave() {
        return {
            $u:userManager.username,
            $l:levelManager.levels.map(l=>l.id),
            l:levelManager.levels.map(l=>l.toStorageFormat())
        }
    }

    function downloadList() {
        chrome.downloads.download({url:URL.createObjectURL(new Blob([JSON.stringify(getCurrentSave())], {type: "application/text"})), filename:"MyDemonList.mdlsave", conflictAction:"uniquify", saveAs:false})
    }

    function uploadList(e) {
        readFile(e.target.files[0], (file, content)=>{
            if (!isValidJson(content)) errorPopup("The does not contain valid MyDemonList save data")
            else {// file good :)
                let data = JSON.parse(content)
                if (data.$u) userManager.setUsername(data.$u)
                levelManager.load(data)

                console.log(data)
            }
        })
    }

    // displays error popup
    function errorPopup(message) {
        let el = errorMsgRef.current
        el.classList.add("lim_errorDivAnim")
        el.textContent = message
        setTimeout(()=>el.classList.remove("lim_errorDivAnim"), 3000)
    }

    return <div className="SettingsMenu">

        <div ref={errorMsgRef} className="lim_errorDiv"></div>

        <div className="sm_block">
            <div>
                <h2 className="sm_settingHeader">Import/Export</h2>
                <label>
                    Import:
                    <input type="text" />
                    <input type="file" onInput={uploadList} accept=".mdlsave" ref={dataInput}/>
                    <button title="WARNING: This will save the imported data and overwrite the current save data" onClick={()=>{}}>Save / Overwrite</button>
                    <button title="asdasdasdasd" onClick={()=>{
                        dataInput.current.value = ""
                        levelManager.load()
                    }}>Revert</button>
                    <button title="WARNING: This will delete all current data" onClick={()=>{}}>Clear Save</button>
                </label>
                <label>
                    Export:
                    <input type="text" />
                    <span className="sm_inline clickable" onClick={downloadList} title="Export all levels into a file">
                        <span>Download list:</span>
                        <IconButton size={38}>$download</IconButton>
                    </span>
                </label>
            </div>
        </div>

        <div className="sm_block">
        <div>
                <h2 className="sm_settingHeader">Storage</h2>

                <label>
                    Storage Viewer
                    <StorageWheel/>
                </label>

                <label>
                    Default Storage:
                    <select>
                        <option value="local">Local</option>
                        <option value="sync">Sync</option>
                    </select>
                </label>
            </div>
        </div>

    </div>
}
export default SettingsMenu
