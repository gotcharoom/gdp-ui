import { RouterProvider } from 'react-router-dom';
import CustomRouter, { RoutesProvider } from '@routes/CustomRouter.tsx';

// Styles
import './styles/main.scss';

const App = () => {
    return (
        <RoutesProvider>
            <RouterProvider router={CustomRouter} />
        </RoutesProvider>
    );
};

export default App;
