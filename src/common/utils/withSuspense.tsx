import { LazyExoticComponent, Suspense } from 'react';
import { jsx } from '@emotion/react';
import JSX = jsx.JSX;

const withSuspense = (LazyComponent: LazyExoticComponent<() => JSX.Element>) => {
    return () => (
        <Suspense fallback={<div>Loading...</div>}>
            <LazyComponent />
        </Suspense>
    );
};

export default withSuspense;
