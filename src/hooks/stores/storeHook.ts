import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@stores/store.ts";

// Hook 생성으로 타입을 매번 지정해줄 필요가 없게됨

// state 변경 시 사용
export const useAppDispatch = () => useDispatch<AppDispatch>();

// state 조회 시 사용
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;