import React from 'react'

const TimerInput = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => {
  const handleChange = (rawValue: string) => {
    if (rawValue.length > 3) return 
    const numericValue = Number(rawValue);
    if (Number.isNaN(numericValue)) {
      onChange(0);
      return;
    }
    onChange(Math.max(0, Math.floor(numericValue)));
  };

  return (
    <input className='text-4xl w-32 md:w-42 text-center border-2 overflow-hidden'type="number" maxLength={3} min={0} value={value} onChange={(e) => handleChange(e.target.value)} onClick={(e) => e.currentTarget.select()} />
  )
}

export default TimerInput
