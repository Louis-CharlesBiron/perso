import { useContext, useState } from 'react'
import './CSS/Menu.css'
import IconButton from './IconButton'
import { ActiveMenuContext, MENU_TYPES } from './contexts/ActiveMenuContext'

/**
 * Menu popup takin up the whole screen, (new page)
 * @param {String} headerText: text content of menu header  
 * @param {html} children: main content of the menu  
 */
function Menu({headerText, children}) {
    const [activeMenu, setActiveMenu] = useContext(ActiveMenuContext)

    return <>{
        activeMenu==headerText.toUpperCase() && <div className="Menu">
            <div className="m_content">
                <IconButton size="42" className="m_close" onClick={()=>setActiveMenu(MENU_TYPES.CLOSED)}>$close</IconButton>
                <h2 className="m_header">{headerText}</h2>
                {children}
            </div>
        </div>
    }</>
}

export default Menu
