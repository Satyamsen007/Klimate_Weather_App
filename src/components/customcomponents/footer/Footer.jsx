import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 py-4">
      <div className="container mx-auto text-center text-gray-400">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Klimate. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Made with ❤️ by Satyam Sen
        </p>
      </div>
    </footer>
  )
}

export default Footer