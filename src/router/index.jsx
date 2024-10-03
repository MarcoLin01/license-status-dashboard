import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '@/App.jsx'
import Home from '@/pages/Home.jsx'
import Error from '@/pages/Error.jsx'
import Layout from '@/layout/index.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: (
      <Layout>
        <Error />
      </Layout>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/license-status-dashboard" replace />,
      },
      {
        path: 'license-status-dashboard',
        children: [
          {
            index: true,
            element: <App />,
          },
          {
            path: 'chart',
            element: <Home />,
          },
        ],
      },
    ],
  },
])

export default router
