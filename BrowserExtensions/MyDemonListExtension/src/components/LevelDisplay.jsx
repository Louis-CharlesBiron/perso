import { useContext, useRef, useState } from 'react'
import './CSS/LevelDisplay.css'
import IconButton from './IconButton'
import LevelDetails from './LevelDetails'
import Level from '../models/Level'
import { capitalize } from "../Utils/Utility"
import { ActiveMenuContext, MENU_TYPES } from './contexts/ActiveMenuContext'

/**
 * Don't forget the doc!
 * @param {*}
 */
function LevelDisplay({level}) {

    const [expanded, setExpanded] = useState(false),
          expandBtnRef = useRef(null),
          [,setActiveMenu] = useContext(ActiveMenuContext)



    function toggleExpanded() {
        setExpanded(x => !x)
        expandBtnRef.current.classList[expanded ? "remove" : "add"]("flip")
        expandBtnRef.current.title = expanded ? "See details" : "Hide details"
    }

    return <div className="LevelDisplay">

        <div className="ld_main">
            <IconButton className="ld_expand" size="48" ref={expandBtnRef} onClick={toggleExpanded}>$expand</IconButton>
            <IconButton className="ld_edit" size="32" onClick={()=>setActiveMenu(level)}>$edit</IconButton>

            <div className="ld_top">
                {
                    level?.url?.includes(location.host)||!level?.url?.includes("http") ?
                        <img className="ld_levelImg" src={"src/assets/img/"+(level.diff||"hard")+".png"}></img>
                        : <iframe src={level.url} loading="lazy" frameBorder="0" title={"Cool Video of "+level.name} className="ld_img" allow="autoplay; encrypted-media; picture-in-picture;"></iframe>
                }
            
                <div className="ld_display">
                    <span className="ld_name" title={level.title}><span className="level1">#1</span> - {level.name}</span>
                    <span className="link ld_link" title={"Open "+level.url}>Completion Vid</span>
                </div>
            </div>
        </div>


        {expanded && [Level.PERSO_INFOS_DISPLAY_PROPS, Level.LEVEL_INFOS_DISPLAY_PROPS].map((info, i)=>
            <LevelDetails key={i} list={info.map(({prop, mod})=>({key:capitalize(prop), value:mod?level[mod](level[prop]):level[prop]})).filter(x=>x.value)} className="LevelDetails"></LevelDetails>
        )}

    </div>
}
export default LevelDisplay
