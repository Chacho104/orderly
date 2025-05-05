"use client";

import { useEffect } from "react";

import { onOpen } from "@/redux/features/modal/modal-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function SetupPage() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.modal.isOpen);

  // Keep create store model open as long as there's no store associated with the user
  useEffect(() => {
    if (!isOpen) {
      dispatch(onOpen());
    }
  }, [isOpen, dispatch]);

  return null;
}
