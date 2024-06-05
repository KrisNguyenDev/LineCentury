import './App.css'
import useRouteElements from './useRouteElements'

function App() {
  const routeElement = useRouteElements()
  return <>{routeElement}</>
}

export default App
