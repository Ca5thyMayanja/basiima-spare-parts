import React, { useContext } from 'react'
import { ThemeContext } from '../hooks/ThemeManagerProvider'
import { ThememanagerProvider } from '../hooks/ThemeManagerProvider'

const ToggleButton = () => {
  const { isLight, mode, handleOnClick } = useContext(ThemeContext)

  return (
    // <ThememanagerProvider>
    <button
      // className={(mode === 'light') ? `text-white bg-black` : `text-black bg-white` + `p-4 rounded-lg`}
      className={`${mode === 'light' ? `text-white bg-black` : `text-black bg-white`} p-4 rounded-lg`}
      onClick={handleOnClick}
    >
      Toggle Theme Section bg color : {mode}
    </button>
    // </ThememanagerProvider>
  )
}

export default ToggleButton
