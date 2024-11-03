import { useState } from 'react'
import './CSS/Menu.css'
import IconButton from './IconButton'

/**
 * Menu popup takin up the whole screen, (new page)
 * @param {html} children: main content of the menu  
 */
function Menu({headerText, children}) {
    let [isOpen, setIsOpen] = useState(true)

    return <>{
        isOpen && <div className="Menu">
            <div className="m_content">
                <IconButton size="42" className="m_close" onClick={()=>setIsOpen(false)}>$close</IconButton>
                <h2 className="m_header">{headerText}</h2>
                {children}
            </div>
        </div>
    }</>
}

export default Menu
