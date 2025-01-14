

const Footer = () => {
  return (
    <div className=' items-center p-2 gap-8'>
        <div className='flex flex-col items-center'>
        <img src="./bazaarupdate_logo.png" alt="Bazaar Update Logo" className='w-24 h-24' />
        <span className='text-xl'><span className='text-xl font-extrabold bg-gradient-to-bl from-red-500 to-blue-800 bg-clip-text text-transparent leading-normal'>instagram:</span> <a href="https://www.instagram.com/bazaar.updates?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="><span className='text-blue-500 font-bold'>@BAZAAR.UPDATES</span></a></span>
        </div>
        <div className='flex flex-col items-center'>
        <span className='text-sm'>© 2025 Bazaar Update. All rights reserved.</span>
        </div>
    </div>
  )
}

export default Footer

