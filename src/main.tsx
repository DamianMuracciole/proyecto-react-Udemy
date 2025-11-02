import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GifsApp } from './GifsApp'
import './index.css'
// import { MyCuonterApp } from './counter/components/MyCuonterApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GifsApp />
    {/* <MyCuonterApp /> */}
  </StrictMode>,
)
