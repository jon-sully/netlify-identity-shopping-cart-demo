import React from "react"
import { Link, navigate } from 'gatsby'
import { useIdentityContext } from 'react-netlify-identity-gotrue'
import { useShoppingCart } from 'use-shopping-cart'

import SEO from "./SEO"
import AuthOverlay from './AuthOverlay'

const Layout = ({ children }) => {
  const identity = useIdentityContext()
  const shoppingCart = useShoppingCart()

  return (
    <>
      <SEO />
      <AuthOverlay />
      <div className="flex flex-col min-h-screen bg-gray-200">
        <header className="p-4 bg-teal-500 text-white font-semibold flex justify-between">
          <Link
            to="/"
          >
            <h1 className="my-auto">
              gatsby-plugin-netlify-identity-gotrue Demo
            </h1>
          </Link>
          <div>
            <button onClick={() => navigate('/cart/')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-cart w-6 h-6 mt-2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </button>
            {shoppingCart.cartCount > 0 && shoppingCart.cartCount}
          </div>
          <div className="flex items-center">
            <p className="mr-2">
              {identity.provisionalUser ? `CONFIRM EMAIL`
                : `Hey ${identity.user?.user_metadata?.full_name?.split(' ')[0] || 'there'}!`
              }
            </p>
            {!(identity.user || identity.provisionalUser) &&
              <Link
                className="inline-block px-6 py-2 mr-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none"
                to="/sign-up"
              >
                Sign Up
              </Link>
            }
            {identity.user ?
              <>
                <Link
                  className="inline-block px-6 py-2 mr-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none"
                  to="/my-account"
                >
                  My Account
                </Link>
                <button
                  className="inline-block px-6 py-2 mr-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none"
                  onClick={identity.logout}
                >
                  Log Out
                </button>
              </>
              : <Link
                className="inline-block px-6 py-2 mr-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none"
                to="/login"
              >
                Log In
              </Link>
            }
          </div>
        </header>
        <header className="p-4 bg-red-300 text-white font-semibold flex justify-start">
          <Link
            className="inline-block px-6 py-2 mr-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-green-500 rounded shadow ripple hover:shadow-lg hover:bg-green-600 focus:outline-none"
            to="/"
          >
            Public Homepage
          </Link>
          {identity.user?.app_metadata?.roles?.includes('member') &&
            <Link
              className="inline-block px-6 py-2 mr-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-green-500 rounded shadow ripple hover:shadow-lg hover:bg-green-600 focus:outline-none"
              to="/members"
            >
              Members Dashboard
            </Link>
          }
          {identity.user?.app_metadata?.roles?.includes('admin') &&
            <Link
              className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-green-500 rounded shadow ripple hover:shadow-lg hover:bg-green-600 focus:outline-none"
              to="/admins"
            >
              Admins Dashboard
            </Link>
          }
        </header>
        {children}
        <footer className="py-2 text-center text-gray-600 text-xs">
          &copy; <a href="https://jonsully.net">Jon Sullivan</a> 2020 | Hosted on Netlify ♥️
        </footer>
      </div>
    </>
  )
}

export default Layout
