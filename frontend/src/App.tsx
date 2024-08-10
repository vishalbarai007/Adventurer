import './App.css'
import { Button } from './components/ui/button'
import { motion } from "framer-motion"

function App() {
  return (
<>
<motion.button animate={{ x: 100 , y:100}} whileHover={{ scale: 1.2 }}
  whileTap={{ scale: 1.1 }}
  drag
  dragConstraints={{ left: -100, right: 100, top:100, bottom:-100 }}>click & drag me</motion.button>
<Button> Used MUI</Button>
</>
  )
}

export default App
