import { useContext } from 'react'
import './CSS/Sidebar.css'
import IconButton from './IconButton'
import { ActiveMenuContext, MENU_TYPES } from './contexts/ActiveMenuContext'

/**
 * Sidebar popup majority of the screen
 */
function Sidebar({headerText, children}) {
    const [activeMenu, setActiveMenu] = useContext(ActiveMenuContext)

    return <div className={"s_bg"+(activeMenu==headerText.toUpperCase()?" s_out":"")}>
        <div className="Sidebar">
            <IconButton className="s_close" size="48" onClick={()=>setActiveMenu(MENU_TYPES.CLOSED)}>$close</IconButton>
            <div className="si_cube">
                  <svg width="52" height="52" viewBox="0 0 32 32" id="cube_p1" style={{fill:"rgb(255, 255, 255)"}}><path d="M 5 5 L 5 27 L 27 27 L 27 5 L 5 5 z M 7 7 L 25 7 L 25 25 L 7 25 L 7 7 z z z z"></path></svg>
                  <svg width="52" height="52" viewBox="0 0 32 32" id="cube_p2" style={{fill:"rgb(0, 255, 255)"}}><path d="M 11 11 z z M 11 11 L 11 14 L 14 14 L 14 11 z M 18 11 L 18 14 L 21 14 L 21 11 z M 9 19 L 9 22 L 23 22 L 23 19 z"></path></svg>
            </div>
            <div className="s_header">{headerText}</div>
            <div className="s_content">
                {children}
            </div>
        </div>
    </div>
}
export default Sidebar
