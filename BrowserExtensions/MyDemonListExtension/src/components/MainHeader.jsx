import './CSS/MainHeader.css'
import IconButton from './IconButton'


/**
 * Main app header
 */
function MainHeader() {
    return <div className="MainHeader">
        <IconButton size="42" className="mh_openStats">$stats</IconButton>
        <div className="mh_goProfile" title="Open profile">
               <label htmlFor="username">LCB79</label><span>'s DemonList</span>
        </div>
        <div className="mh_buttonGroup">
            <IconButton size="24">$search</IconButton>
            <IconButton size="32">$expand</IconButton>
            <IconButton size="48">$plus</IconButton>
        </div>

    </div>
}
export default MainHeader