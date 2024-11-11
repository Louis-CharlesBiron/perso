// JSX
// MyDemonList Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import './CSS/StorageWheel.css'
import { chrome } from '../App'

/**
 * Displays a wheel-like storage viewer
 */
const StorageWheel = forwardRef(({size=150}, ref)=>{
    const QB = chrome.storage.sync.QUOTA_BYTES, DEFAULT_TYPE = "sync",
        [storage, setStorage] = useState({type:DEFAULT_TYPE, bytesUsed:null})

    function displayStorage(type=DEFAULT_TYPE) {
        chrome.storage[type].getBytesInUse(bytesUsed=>setStorage({type, bytesUsed}))
    }

    useImperativeHandle(ref, ()=>({
        update:(type)=>displayStorage(type)
    }))

    useEffect(()=>{
        displayStorage()
    }, [])

    return <div className="StorageWheel">
        <svg className="sw_wheel" width={size} height={size}>
            <circle className="sw_back" strokeWidth={size*0.1} cx={size/2} cy={size/2} r={size/2}></circle>
            <circle className="sw_progress" strokeWidth={size*0.1} cx={size/2} cy={size/2} r={size/2} style={{strokeDasharray: (storage.bytesUsed*414/QB)+", 911, 999"}}></circle>
        </svg>
        <div className="sw_infoParent">
            <select className="sw_storageSelect" onInput={e=>displayStorage(e.target.value)}>
                <option value="sync">Sync</option>
                <option value="local">Local</option>
            </select>
            <div title="Space used in storage">{(storage.bytesUsed/1000).toFixed(2)+(storage.type=="sync"?"/"+(QB/1000)+"KB":"KB")}</div>
            <div title="Storage used in %">{storage.type=="sync"?"("+Math.round(storage.bytesUsed*100/QB)+"%)":""}</div>
            
        </div>
    </div>
})

export default StorageWheel
