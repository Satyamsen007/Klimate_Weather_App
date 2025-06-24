'use client';

import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import CitySearch from '../main/CitySearch';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto flex h-16 items-center justify-between max-md:justify-evenly px-4'>
        <Link href='/'>
          <Image src={isDark ? '/logo.png' : "/logo2.png"} alt='Klimate Logo' width={50} height={50} className='w-20 max-md:w-16' />
        </Link>
        <div className='flex gap-4'>

          <CitySearch />

          <div onClick={() => setTheme(isDark ? 'light' : 'dark')} className={`flex items-center cursor-pointer transition-transform duration-500 ${isDark ? 'rotate-180' : 'rotate-0'}`}>
            {
              isDark ? <Sun className='size-6 text-yellow-500 rotate-0 transition-all' /> : <Moon className='size-6 text-blue-500 rotate-0 transition-all' />
            }
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar