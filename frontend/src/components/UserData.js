import React from 'react'

export default function UserData(props) {


  return (
    <div>
        <h2>{props.passData?.username}  {props.passData[1]?.email}</h2>
    </div>

  )
}
