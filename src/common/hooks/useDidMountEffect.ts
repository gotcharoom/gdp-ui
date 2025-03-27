import { useRef, useEffect, EffectCallback, DependencyList } from 'react';
/** 첫 랜더링 시(마운트 시)는 작동 안하는 useEffect  */

const useDidMountEffect = (effect: EffectCallback, deps?: DependencyList) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) {
            return effect();
        } else {
            didMount.current = true;
        }
    }, deps);
};
export default useDidMountEffect;
