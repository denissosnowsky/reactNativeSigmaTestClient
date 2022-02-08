import { useEffect } from 'react';

export const useResetDropdown = (
  isEditingMode: boolean,
  setPriorityDropdown: (arg: boolean) => void,
  setChosenPriority: (arg: null) => void,
) => {
  useEffect(() => {
    if (!isEditingMode) {
      setPriorityDropdown(false);
      setChosenPriority(null);
    }
  }, [isEditingMode]);
};
