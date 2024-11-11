// JSX
// MyDemonList Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
import { useContext, useRef, useState } from 'react'
import { chrome } from '../App'
import './CSS/SettingsMenu.css'
import IconButton from './IconButton'
import StorageWheel from './StorageWheel'
import { LevelsContext } from './contexts/LevelsContext'
import { UserContext } from './contexts/UserContext'
import { isValidJson, readFile } from '../Utils/Utility'

//The settings Menu
function SettingsMenu() {
    const levelManager = useContext(LevelsContext),
          userManager = useContext(UserContext),
          msgRef = useRef(null),
          dataDisplayInput = useRef(null),
          DEFAULT_CONFIRM_COUNT=5, [confirmCount, setConfirmCount] = useState(DEFAULT_CONFIRM_COUNT),
          storageWheel = useRef(null)

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
            if (!isValidJson(content)) msgPopup("The does not contain valid MyDemonList save data")
            else {// file good :)
                let data = JSON.parse(content)
                
                dataDisplayInput.current.value = file.name
                userManager.setHasUnsavedChanges(true)
                msgPopup("Successfully imported "+data.$u+"'s demonlist!", true)

                if (data.$u) userManager.setUsername(data.$u)
                levelManager.load(data)

                console.log(data)
            }
        })
    }

    // displays error popup
    function msgPopup(message, isGreen) {
        let el = msgRef.current

        el.textContent = message

        el.classList.add("lim_errorDivAnim")
        if (isGreen) el.classList.add("green")
        setTimeout(()=>{
            el.classList.remove("lim_errorDivAnim")
            el.classList.remove("green")
        }, 3000)
    }

    return <div className="SettingsMenu">

        <div ref={msgRef} className="lim_errorDiv"></div>

        <div className="sm_block">
            <div>
                <h2 className="sm_settingHeader">Import/Export</h2>
                <div className="sm_importSection">
                    Import:
                    <label htmlFor="sm_importInput" className="sm_fileInputParent">
                        <input id="sm_importInput" type="file" onInput={uploadList} accept=".mdlsave" className="hidden"/>
                        <input type="text" disabled placeholder="Enter file (.mdlsave)" ref={dataDisplayInput} className="noMouse"/>
                    </label>
                    <button title="WARNING: This will save imported data and overwrite all current save data" onClick={()=>{
                        if (userManager.hasUnsavedChanges) {
                            if (confirmCount > 1) setConfirmCount(c=>--c)
                            else {
                                msgPopup("Successfully saved all changes!", true)
                                userManager.setHasUnsavedChanges(false)
                                setConfirmCount(DEFAULT_CONFIRM_COUNT)
                                
                                if (userManager.username=="???" && !levelManager.levels?.length) {// Clear save
                                    chrome.storage.local.clear()
                                    chrome.storage.sync.clear()
                                    chrome.storage.sync.set({$u:"???",$l:[],$s:"local"})
                                } else {// Save imported file
                                    let toStore = [levelManager.levels.filter(l=>l.storageType=="sync"), levelManager.levels.filter(l=>l.storageType=="local")].map(v=>v.reduce((a,b)=>(a[b.id]=b.toStorageFormat(),a),{}))
                                    
                                    // clear
                                    chrome.storage.local.clear()
                                    chrome.storage.sync.clear()
                                    chrome.storage.sync.set({$s:"local"})

                                    // store levels
                                    chrome.storage.sync.set(toStore[0])                        
                                    chrome.storage.local.set(toStore[1])
                                    
                                    // store rank list
                                    chrome.storage.sync.set({$l:levelManager.levels.map(l=>l.id)})                        
                                
                                    // store username
                                    chrome.storage.sync.set({$u:userManager.username})
                                }
                                // update storage wheel
                                setTimeout(()=>storageWheel.current.update(), 500)
                            }
                        } else msgPopup("No changes to be saved",)
                    }}>Save / Overwrite{userManager.hasUnsavedChanges&&" (confirm ("+confirmCount+"x))"}</button>
                    <button title="Reverts to the last saved data" onClick={()=>{
                        if (userManager.hasUnsavedChanges) {
                            dataDisplayInput.current.value = ""
                            levelManager.load()
                            userManager.load()
                            userManager.setHasUnsavedChanges(false)
                            msgPopup("Successfully reverted all changes!", true)
                        } else msgPopup("No changes to be reverted",)
                    }}>Revert</button>
                    <button title="WARNING: This will delete all current data" onClick={()=>{
                        levelManager.setLevels([])
                        userManager.setUsername("???")
                        userManager.setPlayerColors(null)
                        userManager.setHasUnsavedChanges(true)
                        msgPopup("To delete all data permanently, click the 'Save / Overwrite' button.", true)
                    }}>Clear Save</button>
                </div>
                <div className="sm_exportSection">
                    Export:
                    <span className="sm_inline clickable" title="Export all levels into a file">
                        <span>Download list:</span>
                        <IconButton size={38} onClick={downloadList}>$download</IconButton>
                    </span>
                </div>
            </div>
        </div>

        <div className="sm_block">
        <div>
                <h2 className="sm_settingHeader">Storage</h2>

                <label>
                    Storage Viewer
                    <StorageWheel ref={storageWheel}/>
                </label>

                <label>
                    Default Storage:
                    <select className="sm_defStorage" defaultValue={userManager.defaultStorageType} onInput={e=>{
                        let type = e.target.value
                        userManager.setDefaultStorageType(type)
                        chrome.storage.sync.set({$s:type})
                    }}>
                        <option value="local">Local</option>
                        <option value="sync">Sync</option>
                    </select>
                </label>
            </div>
        </div>

    </div>
}
export default SettingsMenu
