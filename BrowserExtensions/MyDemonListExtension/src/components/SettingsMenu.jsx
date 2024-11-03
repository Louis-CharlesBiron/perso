import './CSS/SettingsMenu.css'
import StorageWheel from './StorageWheel'

/**
 * Don't forget the doc!
 * @param {*}
 */
function SettingsMenu() {
    return <div className="SettingsMenu">

        <div className="sm_block">
            <div>
                <h2 className="sm_settingHeader">Import/Export</h2>
                <label>
                    Import:
                    <input type="text" />
                    <input type="file" />
                </label>
                <label>
                    Export:
                    <input type="text" />
                    <input type="file" />
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
