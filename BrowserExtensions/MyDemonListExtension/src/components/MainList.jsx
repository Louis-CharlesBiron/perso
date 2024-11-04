import { forwardRef, useContext, useEffect } from 'react'
import './CSS/MainList.css'
import LevelDisplay from './LevelDisplay'
import { LevelsContext } from './contexts/LevelsContext'


/**
 * Don't forget the doc!
 * @param {*}
 */
const MainList = forwardRef((props, ref)=>{
    const levelManager = useContext(LevelsContext)

    return <>
        <div className="MainList" ref={ref}>
            {
                levelManager.levels.length ? levelManager.levels.map((level, i)=>
                    <LevelDisplay level={level} key={i}></LevelDisplay>
                ) : <div className="nolvlyet">No Levels Yet...</div>
            }
        </div>
    </>
})
export default MainList