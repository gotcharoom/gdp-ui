import { RouterProvider } from 'react-router-dom';
import CustomRouter, { RoutesProvider } from '@/common/contexts/RoutesProvider.tsx';
import { GlobalFormProvider } from '@/common/contexts/GlobalFormProvider.tsx';
import useAuth from '@/common/hooks/useAuth.ts';

// Styles
import './styles/main.scss';

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
