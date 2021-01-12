import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { CartProvider } from 'use-shopping-cart'

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY)

export const wrapRootElement = ({ element }) => (
  <CartProvider
    stripe={stripePromise}
    successUrl="https://netlify-identity-shopping-cart.jonsully.net/thanks/"
    cancelUrl="https://netlify-identity-shopping-cart.jonsully.net"
    currency="USD"
    allowedCountries={['US', 'CA']}
    billingAddressCollection={true}>
    {element}
  </CartProvider>
)
