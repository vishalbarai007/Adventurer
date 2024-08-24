import React from 'react'

const Menulabels = () => {

    const menuItems = ["Home", "Signup", "Accounts", "Profile", "Settings"];



  return (
    <div>
        <ul>
        {menuItems.map((item, index) => (
        <MenuItem key={index} i={index} label={item} />
      ))}
    </ul>
    </div>
  )
}

export default Menulabels;