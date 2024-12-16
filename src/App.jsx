import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CSVUploader from "./components/CSVUploader";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <CSVUploader />
      </div>
    </>

  );
}

export default App



