import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App.tsx';
import { store } from '@stores/store.ts';
import { enableMocking } from '@utils/mswUtil.ts';

enableMocking().then(() => {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </StrictMode>,
    );
});
