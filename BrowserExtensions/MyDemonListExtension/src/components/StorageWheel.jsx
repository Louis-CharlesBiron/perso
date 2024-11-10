import './CSS/StorageWheel.css'

/**
 * Displays a wheel-like storage viewer
 */
function StorageWheel({size=150}) {
    return <div className="StorageWheel">
        <svg className="sw_wheel" width={size} height={size}>
            <circle className="sw_back" strokeWidth={size*0.1} cx={size/2} cy={size/2} r={size/2}></circle>
            <circle className="sw_progress" strokeWidth={size*0.1} cx={size/2} cy={size/2} r={size/2} style={{strokeDasharray: "16.5802, 911, 999"}}></circle>
        </svg>
        <div className="sw_infoParent">
            <select className="sw_storageSelect">
                <option value="local">Local</option>
                <option value="sync">Sync</option>
            </select>
            <div title="Space used in storage">4.101KB</div>
            <div title="Storage used in %">%</div>
        </div>
    </div>
}

export default StorageWheel
