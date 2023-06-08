import React from 'react'
import {ReactComponent as DetailIcon} from "./DetailIcon.svg"
const UserDetails = () => {
  return (
    <div className="flex items-center border-2 rounded-md pl-4" style={{borderColor:"#4A4A4A"}}>
        <div>3366.5343 A</div>
        <div className="flex items-center ml-4 rounded-md p-1 bg-black">
            <span className="flex items-center justify-center"><DetailIcon/></span>
            <span className="p-2">addr1...qx6lyz1h</span>
        </div>
    </div>
  )
}

export default UserDetails