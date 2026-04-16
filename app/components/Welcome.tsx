import React, { useEffect } from 'react'
import Image from 'next/image'

const Welcome = () => {
  const [showWelcome, setShowWelcome] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showWelcome && <div className='fixed top-0 left-0 w-screen h-screen z-10 bg-background grid place-content-center gap-4'>
        <Image src="/kor-white.svg" alt="Logo" width={400} height={400} className='logo' />
      </div>}
    </>
  )
}

export default Welcome
