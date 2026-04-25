import React from 'react'
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className='bg-gradient-to-r from-gray-100 to-gray-200 dark:from-dark-bg dark:to-dark-card border-t dark:border-dark-border transition-colors duration-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-6'>
          {/* About Section */}
          <div className='space-y-3'>
            <h3 className='text-lg font-bold text-gray-800 dark:text-white'>Prime Mart</h3>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Your one-stop shop for quality products at amazing prices.
            </p>
          </div>

          {/* Quick Links */}
          <div className='space-y-3'>
            <h3 className='text-lg font-semibold text-gray-800 dark:text-white'>Quick Links</h3>
            <ul className='space-y-2 text-sm'>
              <li><Link to="/" className='text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors'>Home</Link></li>
              <li><Link to="/product-category" className='text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors'>Products</Link></li>
              <li><Link to="/cart" className='text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors'>Cart</Link></li>
              <li><Link to="/order" className='text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors'>Orders</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className='space-y-3'>
            <h3 className='text-lg font-semibold text-gray-800 dark:text-white'>Customer Service</h3>
            <ul className='space-y-2 text-sm'>
              <li><a href="#" className='text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors'>Contact Us</a></li>
              <li><a href="#" className='text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors'>Shipping Info</a></li>
              <li><a href="#" className='text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors'>Returns</a></li>
              <li><a href="#" className='text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors'>FAQ</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className='space-y-3'>
            <h3 className='text-lg font-semibold text-gray-800 dark:text-white'>Follow Us</h3>
            <div className='flex gap-4'>
              <a href="#" className='text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all hover:scale-110'>
                <FaGithub size={24} />
              </a>
              <a href="#" className='text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all hover:scale-110'>
                <FaLinkedin size={24} />
              </a>
              <a href="#" className='text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all hover:scale-110'>
                <FaTwitter size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-t dark:border-dark-border pt-6 mt-6'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <p className='text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2'>
              Made with <FaHeart className='text-red-500 animate-pulse' /> by Web Developers
            </p>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              © {new Date().getFullYear()} Prime Mart. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
