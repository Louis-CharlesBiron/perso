import { useContext } from 'react'
import './CSS/MainHeader.css'
import IconButton from './IconButton'
import { ActiveMenuContext, MENU_TYPES } from './contexts/ActiveMenuContext'

/**
 * Main app header
 */
function MainHeader() {
    let [activeMenu, setActiveMenu] = useContext(ActiveMenuContext)


    return <div className="MainHeader">
        <IconButton size="42" className="mh_openStats" onClick={()=>setActiveMenu(MENU_TYPES.OVERVIEW)}>$stats</IconButton>
        <IconButton size="30" className="mh_openSettings" onClick={()=>setActiveMenu(MENU_TYPES.SETTINGS)}>$settings</IconButton>
        <div className="mh_goProfile" title="Open profile" onClick={()=>setActiveMenu(MENU_TYPES.PROFILE)}>
               <label htmlFor="username">LCB79</label><span>'s DemonList</span>
        </div>
        <div className="mh_buttonGroup">
            <IconButton size="24" onClick={()=>setActiveMenu(MENU_TYPES.SEARCH)}>$search</IconButton>
            <IconButton size="32">$expand</IconButton>
            <IconButton size="48" onClick={()=>setActiveMenu(MENU_TYPES.LEVEL)}>$plus</IconButton>
        </div>

    </div>
}
export default MainHeader