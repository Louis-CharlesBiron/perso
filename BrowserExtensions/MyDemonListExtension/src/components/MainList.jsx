import { useContext } from 'react'
import './CSS/MainList.css'
import LevelDisplay from './LevelDisplay'
import { LevelsContext } from './contexts/LevelsContext'


/**
 * Don't forget the doc!
 * @param {*}
 */
function MainList() {

    const levelManager = useContext(LevelsContext)


    return <>
        <div className="MainList">
            {
                levelManager.levels.length ? levelManager.levels.map((level, i)=>{
                    return <LevelDisplay level={level} key={i}></LevelDisplay>

                }) : <div className="nolvlyet">No Levels Yet...</div>
            }
        </div>
    </>
}
export default MainList