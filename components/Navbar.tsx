'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface NavbarProps {
  onNavClick?: (section: string) => void;
}

export default function Navbar({ onNavClick }: NavbarProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', id: 'hero' },
    { name: 'Latest', id: 'latest' },
    { name: 'Shows', id: 'shows' },
    { name: 'Band', id: 'band' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'YouTube', href: '/youtube' },
    { name: 'Contact', id: 'contact' },
  ]

  const handleNavClick = (item: { name: string, id?: string, href?: string }) => {
    setIsOpen(false)
    if (item.name === 'Home' && window.location.pathname !== '/') {
      router.push('/')
      return
    }
    if (item.href) {
      router.push(item.href)
    } else if (item.id) {
      if (window.location.pathname !== '/') {
        router.push(`/#${item.id}`)
      } else {
        const element = document.getElementById(item.id)
        element?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const handleLogoClick = () => {
    router.push('/')
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80' : 'bg-transparent'} backdrop-blur-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={handleLogoClick}
            className="relative w-64 h-24" // Adjusted size for logo container
          >
            <Image
              src="/logo.png"
              alt="Prizma Entertainment"
              fill
              className="object-contain"
              priority
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className="text-white hover:text-[#F9B104] transition-colors text-sm font-medium tracking-wide"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            <div className="w-6 h-4 flex flex-col justify-between">
              <span className={`h-0.5 w-full bg-current transform transition-all ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`h-0.5 w-full bg-current transition-all ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 w-full bg-current transform transition-all ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95"
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className="block w-full py-3 text-white hover:text-[#F9B104] transition-colors text-center"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
