import { Outlet } from "react-router-dom"

const ToolBar = () => {
    return (
        <>
            <div>ToolBar</div>
            <div><Outlet /></div>
        </>
    )
}

export default ToolBar