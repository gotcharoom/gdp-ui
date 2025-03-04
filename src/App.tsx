import { RouterProvider } from 'react-router-dom';
import CustomRouter, { RoutesProvider } from '@routes/CustomRouter.tsx';

// Styles
import './styles/main.scss';
import useAuth from '@/common/hooks/useAuth.ts';

const App = () => {
    useAuth();

    return (
        <RoutesProvider>
            <RouterProvider router={CustomRouter} />
        </RoutesProvider>
    );
};

export default App;
