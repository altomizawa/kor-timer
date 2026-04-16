import React from 'react'
import Button from "./Button";

type TimerMode = "TABATA" | "AMRAP" | "EMOM" | "FOR TIME";

const Menu = ({ setCurrentMode }: { setCurrentMode: React.Dispatch<React.SetStateAction<TimerMode | null>> }) => {
  const buttons = [
    { id: 1, label: "TABATA", action: () => setCurrentMode("TABATA") },
    { id: 2, label: "AMRAP", action: () => setCurrentMode("AMRAP") },
    { id: 3, label: "EMOM", action: () => setCurrentMode("EMOM") },
    { id: 4, label: "FOR TIME", action: () => setCurrentMode("FOR TIME") },
  ]
  
  return (
    <>
      <ul className='grid gap-8'>
        {buttons.map((button) => (
          <Button key={button.id} onClick={button.action}>
            {button.label}
          </Button>
        ))}
      </ul>
    </>
  )
}

export default Menu
