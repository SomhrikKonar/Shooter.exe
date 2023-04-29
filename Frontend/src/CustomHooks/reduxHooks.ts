import {TypedUseSelectorHook, useDispatch,useSelector } from "react-redux";
import { dispatchType, stateType } from "../Store/store";

export const useAppDispatch:()=>dispatchType=useDispatch
export const useAppSelector:TypedUseSelectorHook<stateType>=useSelector