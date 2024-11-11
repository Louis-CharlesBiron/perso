// JSX
// MyDemonList Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
import { useContext } from 'react'
import './CSS/Menu.css'
import IconButton from './IconButton'
import { ActiveMenuContext, MENU_TYPES } from './contexts/ActiveMenuContext'

/**
 * Menu popup takin up the whole screen, (new page)
 * @param {String} headerText: text content of menu header  
 * @param {html} children: main content of the menu  
 */
function Menu({headerText, children}) {
    const [activeMenu, setActiveMenu] = useContext(ActiveMenuContext),
          isCreationMenu = activeMenu && typeof activeMenu == "object" && headerText.toUpperCase()==MENU_TYPES.LEVEL

    return <>{
        (activeMenu==headerText.toUpperCase() || isCreationMenu) && <div className="Menu">
            <div className="m_content">
                <IconButton size="42" className="m_close" onClick={()=>setActiveMenu(MENU_TYPES.CLOSED)}>$close</IconButton>
                <h2 className="m_header">{isCreationMenu ? "Edit" : headerText}</h2>
                {children}
            </div>
        </div>
    }</>
}

export default Menu
