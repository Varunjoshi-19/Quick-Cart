import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./Styling/global.css"
import "./index.css";
import { AuthContextProvider } from './hooks/UserContext.tsx'
import { ProductContextProvider } from './hooks/ProductContext.tsx';
import { ItemContextProvider } from './hooks/ItemContext.tsx';

createRoot(document.getElementById('root')!).render(

    <AuthContextProvider>
        <ProductContextProvider>
           <ItemContextProvider>


            <App />

           </ItemContextProvider>
        </ProductContextProvider>
    </AuthContextProvider>

)
