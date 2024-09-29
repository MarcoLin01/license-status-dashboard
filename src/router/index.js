import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Error from '../pages/Error'
import Layout from '../layout'
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
