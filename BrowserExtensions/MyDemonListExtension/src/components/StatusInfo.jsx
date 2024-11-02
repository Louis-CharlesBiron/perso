import './CSS/StatusInfo.css'

/**
 * Small text display in absolute position
 * @param {children} display text
 */
function StatusInfo({children, className}) {
    return <span className={className}>{children}</span>
}
export default StatusInfo
