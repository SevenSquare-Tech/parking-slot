import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/layout";
import Dashboard from './components/Dashboard';
import Slots from "./components/Slots";
import Vehicles from "./components/Vehicles";
import Alerts from "./components/Alerts";
import { ThemeProvider } from "./components/Theme";
function App() {

  return <>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/slots" element={<Slots />} />
            <Route path="/vehicles" element={<Vehicles />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </>
}

export default App;