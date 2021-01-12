import React, { useState } from "react"
import { useIdentityContext } from 'react-netlify-identity-gotrue'
import { useShoppingCart } from 'use-shopping-cart'

import Layout from "../components/Layout"

const productData = [
  {
    name: 'Bananas',
    price_id: 'price_GBJ2Ep8246qeeT',
    price: 400,
    description: 'Large yellow bananas, 4-count, delicious',
    image: 'https://www.fillmurray.com/300/300',
    currency: 'USD'
  },
  {
    name: 'Tangerines',
    price_id: 'price_GBJ2WWfMaGNC2Z',
    price: 100,
    description: 'Tasty little orange tangerines! 18-count',
    image: 'https://www.fillmurray.com/300/300',
    currency: 'USD'
  }
]

export default () => {
  const identity = useIdentityContext()
  const shoppingCart = useShoppingCart()

  const [processing, setProcessing] = useState(false)

  const updateRoles = ({ add, remove }) => {
    setProcessing(true)
    identity.authorizedFetch('/api/update-role', {
      method: 'POST',
      body: JSON.stringify({
        action: add ? 'add' : 'remove',
        role: add || remove
      })
    })
      .then(identity.refreshUser)
      .finally(() => setProcessing(false))
  }

  return (
    <Layout>
      <main className="max-w-2xl flex-grow mx-auto flex flex-col justify-around">
        <h1 className="px-4 pt-5 text-2xl text-left text-teal-500 font-bold sm:text-3xl">
          Public Homepage
        </h1>
        <div className="sm:flex sm:flex-row-reverse sm:items-center">
          <div className="sm:px-2 flex">
            {productData.map(p =>
              <div key={p.price_id}>
                <div className="rounded-lg overflow-hidden m-2" >
                  <div className="relative overflow-hidden pb-60">
                    <img
                      className="absolute h-full w-full object-cover object-center"
                      src="https://collect.criggzdesign.com/wp-content/uploads/2020/07/5c77d8a62417e4405611bb42_3k-color-1-scaled.jpg"
                      alt=""
                    />
                  </div>
                  <div className="relative bg-blue-200">
                    <div className="py-10 px-8">
                      <h3 className="text-2xl font-bold">{p.name}</h3>
                      <div className="text-gray-600 text-sm font-medium flex mb-4 mt-2">
                        <p>Provided by &nbsp;</p>
                        <a
                          href="https://www.ls.graphics/"
                          className="hover:text-black transition duration-300 ease-in-out"
                        >Kroger Intl</a
                        >
                      </div>
                      <p className="leading-7">
                        {p.description}
                      </p>
                      <div className="mt-10 flex justify-between items-center">
                        <div>
                          {`$${p.price / 100} USD`}
                        </div>
                        <button
                          className="flex items-center"
                          onClick={() => shoppingCart.addItem(p)}
                        >
                          <p className="mr-4">Add to Cart</p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14.125"
                            height="13.358"
                            viewBox="0 0 14.125 13.358"
                          >
                            <g transform="translate(-3 -3.293)">
                              <path
                                id="Path_7"
                                data-name="Path 7"
                                d="M14.189,10.739H3V9.2H14.189L9.361,4.378l1.085-1.085,6.679,6.679-6.679,6.679L9.361,15.566Z"
                                fill="#1d1d1d"
                                fillRule="evenodd"
                              ></path>
                            </g>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
        {identity.user &&
          <div className="pt-8 flex justify-around">
            {!identity.user.app_metadata?.roles?.includes('member') &&
              <button
                className={`bg-blue-500 text-white p-2 m-2 rounded text-m font-bold ${processing && 'opacity-50'}`}
                disabled={processing}
                onClick={() => updateRoles({ add: 'member' })}
              >
                Make me a Member!
                  </button>
            }
            {identity.user.app_metadata?.roles?.includes('member') &&
              <button
                className={`bg-blue-500 text-white p-2 m-2 rounded text-m font-bold ${processing && 'opacity-50'}`}
                disabled={processing}
                onClick={() => updateRoles({ remove: 'member' })}
              >
                Revoke Member!
                  </button>
            }
            {!identity.user.app_metadata?.roles?.includes('admin') &&
              <button
                className={`bg-blue-500 text-white p-2 m-2 rounded text-m font-bold ${processing && 'opacity-50'}`}
                disabled={processing}
                onClick={() => updateRoles({ add: 'admin' })}
              >
                Make me an Admin!
                  </button>
            }
            {identity.user.app_metadata?.roles?.includes('admin') &&
              <button
                className={`bg-blue-500 text-white p-2 m-2 rounded text-m font-bold ${processing && 'opacity-50'}`}
                disabled={processing}
                onClick={() => updateRoles({ remove: 'admin' })}
              >
                Revoke Admin!
                  </button>
            }
          </div>
        }


      </main>
    </Layout>
  )
}
