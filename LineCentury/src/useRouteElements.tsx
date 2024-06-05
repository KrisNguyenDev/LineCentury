import { useRoutes } from 'react-router-dom'
import OHCLChart from './pages/OHLCChart'

export default function useRouteElements() {
  const routeElement = useRoutes([
    {
      path: '',
      element: <OHCLChart />,
    },
  ])
  return routeElement
}
