import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./Styling/global.css"
import { AuthContextProvider } from './hooks/UserContext.tsx'

createRoot(document.getElementById('root')!).render(

    <AuthContextProvider>


        <App />

    </AuthContextProvider>

)
