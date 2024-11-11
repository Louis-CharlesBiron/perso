// JSX
// MyDemonList Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
import { useContext, useEffect, useRef } from 'react'
import './CSS/MainHeader.css'
import IconButton from './IconButton'
import { ActiveMenuContext, MENU_TYPES } from './contexts/ActiveMenuContext'
import { UserContext } from './contexts/UserContext'
import { DISABLED_MESSAGE } from '../Utils/Utility'

// Main app header
function MainHeader({mainListRef}) {
    const [,setActiveMenu] = useContext(ActiveMenuContext),
          userManager = useContext(UserContext),
          fastTravelRef = useRef(null)

    function fastTravel() {
        let ft = fastTravelRef.current, ml = mainListRef.current, dir = ft.classList.contains("flip")
        ft.classList[dir ? "remove" : "add"]("flip")
        ft.title = dir ? "Go to bottom" : "Go to top"
        ml.scrollTo(0, !dir ? ml.scrollHeight : 0)
    }

    //update fastTravel arrow when passing middle
    useEffect(()=>{
        let ml = mainListRef.current
        ml.onscroll=()=>{
            let ft = fastTravelRef.current, dir = ml.scrollTop < ml.scrollHeight/4
            ft.classList[dir ? "remove" : "add"]("flip")
            ft.title = dir ? "Go to bottom" : "Go to top"
        }
    }, [mainListRef])

    return <div className="MainHeader">
        <IconButton size="42" className="mh_openStats" onClick={()=>setActiveMenu(MENU_TYPES.OVERVIEW)}>$stats</IconButton>
        <IconButton size="30" className="mh_openSettings" onClick={()=>setActiveMenu(MENU_TYPES.SETTINGS)}>$settings</IconButton>
        <div className="mh_goProfile" title="Open profile" onClick={()=>setActiveMenu(MENU_TYPES.PROFILE)}>
               <label htmlFor="username">{userManager.username}</label><span>'s DemonList</span>
        </div>
        <div className="mh_buttonGroup">
            <IconButton size="24" onClick={()=>setActiveMenu(MENU_TYPES.SEARCH)}>$search</IconButton>
            <IconButton size="32" title="Go to bottom" ref={fastTravelRef} onClick={fastTravel}>$expand</IconButton>
            <IconButton size="48" onClick={()=>setActiveMenu(MENU_TYPES.LEVEL)} disabled={userManager.hasUnsavedChanges} title={userManager.hasUnsavedChanges?DISABLED_MESSAGE:"Add new level"}>$plus</IconButton>
        </div>

    </div>
}
export default MainHeader