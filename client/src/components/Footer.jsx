import React from 'react'

const Footer = () => {
  return (
    <div className='text-sm text-center bg-gray-50 py-4'>
      &copy; {new Date().getFullYear()}{' '}
      <a
        href="https://www.repulso.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-violet-600 font-modern font-semibold hover:underline"
      >
        REPULSO
      </a>. All rights reserved.
    </div>
  )
}

export default Footer
