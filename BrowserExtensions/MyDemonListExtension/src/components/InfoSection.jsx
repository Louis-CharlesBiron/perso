// JSX
// MyDemonList Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
import { forwardRef, useImperativeHandle, useState } from 'react'
import './CSS/InfoSection.css'
import IconButton from './IconButton'

/**
 * @param {INFO_SECTION} type type of container used to display 
 * @param {String} headerText header text of the section
 * @param {String || String[] || Object[]} value the text or texts to display
 */
const InfoSection = forwardRef(({type=INFO_SECTION.SIMPLE, headerText, title="", value, defaultValue, onChange, placeholder, onIconClick, disabled}, ref)=>{
    
    const [currentListPage, setCurrentListPage] = useState(0),
          listCapacity = 3, listIndex = currentListPage*listCapacity,
          v_ll = value?.length,
          maxPage = Math.floor(v_ll/listCapacity)+!!(v_ll%listCapacity)||0, hasPages = maxPage>1

        useImperativeHandle(ref, ()=>({
          reset:()=>setCurrentListPage(0)
        }))

    return <>
        {
            type==INFO_SECTION.SIMPLE ?
                <div className="InfoSection is_simple" title={title}>
                    {headerText}
                    {/* ex value: "string1" */}
                    {value ? 
                        <span>{value}</span>
                        : <span className="is_placeholder">No Levels yet...</span>
                    }
                </div>
            : type==INFO_SECTION.LIST ?
                <div className="InfoSection is_list">
                    {hasPages&&<span className="is_listInfo">{currentListPage+1+"/"+maxPage}</span>}
                    <div className="is_listHeader">
                        {hasPages&&<IconButton className="r90" onClick={()=>setCurrentListPage(v=>!v?maxPage-1:--v)}>$expand</IconButton>}
                        <label title={title}>{headerText}</label>
                        {hasPages&&<IconButton className="r270" onClick={()=>setCurrentListPage(v=>v==maxPage-1?0:++v)}>$expand</IconButton>}
                    </div>
                    <div>
                        {/* ex value: ["string1", "string2", "string3"...] */}
                        {v_ll ? 
                            value.slice(listIndex, listIndex+listCapacity).map((v,i)=><span className="is_listSpan" key={i}>{v}</span>)
                            : <span className="is_placeholder">No Levels yet...</span>
                        }
                    </div>
                </div>
            : type==INFO_SECTION.ICON_LIST ?
                <div className="InfoSection is_list is_iconList">
                    <label title={title}>{headerText}</label>
                    <div>
                        {/* ex value: [{demonType:"easy", demon:"string2"}, {demonType:"hard", demon:"string4"}...] */}
                        {value && value.map((entry, i)=>
                            <span key={i} title={entry.title}>
                                {entry.demonType+" demon:"}
                                <span>{entry.demon}
                                    <label title={"Filter by "+entry.demonType+" demon"} onClick={e=>onIconClick(e, entry.demonType)}>
                                        <img src={"assets/"+entry.demonType+".png"} className="small_icon"/>
                                    </label>
                                </span>
                            </span>)
                        }
                    </div>
                </div>
            : type==INFO_SECTION.ICON_LIST2 ?
                <div className="InfoSection is_list is_iconList">
                    <label title={title}>{headerText}</label>
                    <div>
                        {/* ex value: [{demonType:"easy", cdemon:"string2", pdemon:"string1"}, {demonType:"hard", cdemon:"string4", pdemon:"string3"}...] */}
                        {value && value.map((entry, i)=>
                            <span key={i} className="is_dtWrapper" title={entry.title}>
                                <span className="is_dtkey">{entry.demonType+":"}</span>
                                <span className="is_demonTotals">
                                    <span title="Classic demons" className="is_dt1">{entry.cdemon}</span><span className="is_dt2" title="Classic | Plat.">|</span><span title="Plat. demons" className="is_dt3">{entry.pdemon}</span>
                                </span>
                                <img src={"assets/"+entry.demonType+".png"} className="small_icon"/>
                            </span>)
                        }
                    </div>
                </div>
            : type==INFO_SECTION.SIMPLE_INPUT ?
                <div  title={title} className="InfoSection is_block is_simpleInput">
                    <label>{headerText}</label>
                    <input disabled={disabled} placeholder={placeholder} onChange={onChange} defaultValue={defaultValue} ref={ref} type="text" id="username" autoComplete='off' autoCorrect='false'/>
                </div>
            : type==INFO_SECTION.INFO_LIST ?
                <div className="InfoSection is_block is_infoList">
                    <label title={title}>{headerText}</label>
                    <div>
                        {/* ex value: [{key:"Rank", value:"9344"},...] */}
                        {value && value.map((entry, i)=><div key={i} title={entry.title}>
                            {entry.key+":"}
                            <span>{entry.value}</span>
                        </div>)}
                    </div>
                </div>
            : <></>
        }

    </>
})

export default InfoSection
export const INFO_SECTION = {SIMPLE:0, LIST:1, ICON_LIST:2, SIMPLE_INPUT:3, ICON_LIST2:4, INFO_LIST:5}