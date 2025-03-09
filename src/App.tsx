import { RouterProvider } from 'react-router-dom';
import CustomRouter, { RoutesProvider } from '@/common/contexts/RoutesProvider.tsx';
import { GlobalFormProvider } from '@/common/contexts/GlobalFormProvider.tsx';

// Styles
import './styles/main.scss';
import useAuth from '@/common/hooks/useAuth.ts';

const App = () => {
    useAuth();

    return (
        <GlobalFormProvider>
            <RoutesProvider>
                <RouterProvider router={CustomRouter} />
            </RoutesProvider>
        </GlobalFormProvider>
    );
};

export default App;
