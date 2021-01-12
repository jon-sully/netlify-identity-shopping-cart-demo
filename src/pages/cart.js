import React from 'react'
import { useShoppingCart } from 'use-shopping-cart'

import Layout from "../components/Layout"

export default () => {
  const shoppingCart = useShoppingCart()
  const isCartEmpty = !(shoppingCart.cartCount > 0)

  console.log(JSON.stringify(shoppingCart.cartDetails))
  console.log(JSON.stringify(shoppingCart.cartCount))

  return (
    <Layout>
      <main className="max-w-4xl flex-grow mx-auto flex flex-col justify-around">
        <h1 className="px-4 pt-5 text-2xl text-left text-teal-500 font-bold sm:text-3xl">
          <button onClick={shoppingCart.clearCart}>
            Cart
          </button>
        </h1>
        <div className="flex-1">
          <table className="w-full text-sm lg:text-base" cellSpacing="0">
            <thead>
              <tr className="h-12 uppercase">
                <th className="hidden md:table-cell"></th>
                <th className="text-left">Product</th>
                <th className="lg:text-right text-left pl-5 lg:pl-0">
                  <span className="lg:hidden" title="Quantity">Qtd</span>
                  <span className="hidden lg:inline">Quantity</span>
                </th>
                <th className="hidden text-right md:table-cell">Unit price</th>
                <th className="text-right">Total price</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(shoppingCart.cartDetails).map(([k, item]) => (
                <tr key={k}>
                  <td className="hidden pb-4 md:table-cell">
                    <img src={item.image} className="w-20 rounded"
                      alt="Thumbnail" />
                  </td>
                  <td>
                    <p className="mb-2 md:ml-4">{item.name}</p>
                    <button onClick={() => shoppingCart.removeItem(item.price_id)} type="submit" className="text-gray-700 md:ml-4">
                      <small>(Remove item)</small>
                    </button>
                  </td>
                  <td className="justify-center md:justify-end md:flex mt-6">
                    <div className="w-20 h-10">
                      <div className="relative flex flex-row w-full h-8">
                        <input type="number" value={item.quantity} onChange={e => {
                          e.preventDefault()
                          shoppingCart.setItemQuantity(item.price_id, parseInt(e.target.value))
                        }}
                          className="w-full font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black" />
                      </div>
                    </div>
                  </td>
                  <td className="hidden text-right md:table-cell">
                    <span className="text-sm lg:text-base font-medium">
                      ${item.price / 100}
                    </span>
                  </td>
                  <td className="text-right">
                    <span className="text-sm lg:text-base font-medium">
                      {item.formattedValue}
                    </span>
                  </td>
                </tr>

              ))}

            </tbody>
          </table>
          <hr className="pb-6 mt-6" />
          <div className="my-4 mt-6 -mx-2 lg:flex items-baseline">
            <div className="lg:px-2 lg:w-1/2">
              <div className="p-4 mt-6 bg-gray-100 rounded-full">
                <h1 className="ml-2 font-bold uppercase">Instruction for seller</h1>
              </div>
              <div className="p-4">
                <p className="mb-4 italic">If you have some information for the seller you can leave them in the box below</p>
                <textarea className="w-full h-24 p-2 bg-gray-100 rounded"></textarea>
              </div>
            </div>
            <div className="lg:px-2 lg:w-1/2">
              <div className="p-4 bg-gray-100 rounded-full">
                <h1 className="ml-2 font-bold uppercase">Order Details</h1>
              </div>
              <div className="p-4">
                <p className="mb-6 italic">Shipping and additionnal costs are calculated based on values you have entered</p>
                <div className="flex justify-between border-b">
                  <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                    Subtotal
                  </div>
                  <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                    ${shoppingCart.totalPrice / 100}
                  </div>
                </div>

                <button
                  disabled={isCartEmpty}
                  onClick={() => shoppingCart.redirectToCheckout()}
                  className={`flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center ${isCartEmpty ? 'opacity-50' : 'hover:bg-gray-700'}  focus:shadow-outline focus:outline-none`}>
                  <svg aria-hidden="true" data-prefix="far" data-icon="credit-card" className="w-8"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path fill="currentColor"
                      d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z" />
                  </svg>
                  <span className="ml-2 mt-5px">Procceed to checkout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout >
  )
}
