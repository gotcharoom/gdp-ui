import { RouterProvider } from 'react-router-dom';
import CustomRouter, { RoutesProvider } from '@/common/contexts/RoutesProvider.tsx';
import { GlobalFormProvider } from '@/common/contexts/GlobalFormProvider.tsx';
import useAuth from '@/common/hooks/useAuth.ts';

// Styles
import './styles/main.scss';
import { AlertProvider } from '@/common/contexts/AlertProvider.tsx';
import { SseProvider } from '@/common/contexts/SseProvider.tsx';

const App = () => {
    useAuth();

    return (
        <AlertProvider>
            <GlobalFormProvider>
                <SseProvider>
                    <RoutesProvider>
                        <RouterProvider router={CustomRouter} />
                    </RoutesProvider>
                </SseProvider>
            </GlobalFormProvider>
        </AlertProvider>
    );
};

export default App;
