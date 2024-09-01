import { createBrowserRouter } from 'react-router-dom'
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
        element: <App />,
      },
      {
        path: '/home',
        element: <Home />
      }
    ],
  }
])

export default router
