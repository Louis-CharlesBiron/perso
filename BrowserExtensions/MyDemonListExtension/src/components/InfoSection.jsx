import { forwardRef } from 'react'
import './CSS/InfoSection.css'

/**
 * Don't forget the doc!
 * @param {INFO_SECTION} type type of container used to display 
 * @param {String} headerText header text of the section
 * @param {String || String[] || Object[]} value the text or texts to display
 */
const InfoSection = forwardRef(({type=INFO_SECTION.SIMPLE, headerText, title="", value, defaultValue, onChange, placeholder}, ref)=>{
    return <>

        {
            type==INFO_SECTION.SIMPLE ?
                <div className="InfoSection is_simple" title={title}>
                    {headerText}
                    {/* ex value: "string1" */}
                    <span>{value}</span>
                </div>
            : type==INFO_SECTION.LIST ?
                <div className="InfoSection is_list">
                    <label title={title}>{headerText}</label>
                    <div>
                        {/* ex value: ["string1", "string2", "string3"...] */}
                        {value && value.map((v,i)=><span key={i}>{v}</span>)}
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
                                    <label title={"Filter by: "+entry.demonType+" demon"}>
                                        <img src={"src/assets/img/"+entry.demonType+".png"} className="small_icon"/>
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
                                <img src={"src/assets/img/"+entry.demonType+".png"} className="small_icon"/>
                            </span>)
                        }
                    </div>
                </div>
            : type==INFO_SECTION.SIMPLE_INPUT ?
                <div className="InfoSection is_block is_simpleInput">
                    <label title={title}>{headerText}</label>
                    <input placeholder={placeholder} onChange={onChange} defaultValue={defaultValue} ref={ref} type="text" id="username" autoComplete='off' autoCorrect='false'/>
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