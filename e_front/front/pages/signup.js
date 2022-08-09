import React from 'react'

export default function Signup() {
  const value = React.useContext({auth})

  return (
    <div>{value}</div>
  )
}
