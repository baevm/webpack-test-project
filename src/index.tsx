import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React, { lazy, Suspense } from 'react'
import App from '@/App'

const AboutPage = lazy(() => import('@/pages/about/AboutPage'))
const CartPage = lazy(() => import('@/pages/cart/CartPage'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/about',
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: '/cart',
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <CartPage />
          </Suspense>
        ),
      },
    ],
  },
])

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
