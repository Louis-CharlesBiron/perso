// JSX
// MyDemonList Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
import { forwardRef, useContext } from 'react'
import './CSS/MainList.css'
import LevelDisplay from './LevelDisplay'
import { LevelsContext } from './contexts/LevelsContext'

// The main list displaying all levels
const MainList = forwardRef((props, ref)=>{
    const levelManager = useContext(LevelsContext)

    return <>
        <div className="MainList" ref={ref}>
            {
                levelManager.levels?.length ? levelManager.levels.map((level, i)=>
                    <LevelDisplay level={level} key={i}></LevelDisplay>
                ) : <div className="ml_nolvlyet">
                    No Levels Yet...
                    <span title="Set the default storage type in the Settings menu, or manually change it in the Edit/Create menu!">(Sync your levels between browsers with the 'sync' storage type!)</span>
                    </div>
            }
        </div>
    </>
})
export default MainList