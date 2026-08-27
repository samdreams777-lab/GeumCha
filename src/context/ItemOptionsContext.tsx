import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

/**
 * Global selection state for optional add-ons per menu item.
 * Keyed by itemId so selections survive navigation between
 * pages / search views and are independent for every card.
 *
 * Shape: { [itemId]: { [modifierName]: optionName[] } }
 */

export type ModifierSelections = Record<string, string[]>;
export type AllSelections = Record<string, ModifierSelections>;

interface ItemOptionsContextValue {
  selections: AllSelections;
  getSelection: (itemId: string) => ModifierSelections;
  toggleOption: (itemId: string, modifierName: string, optionName: string, multi: boolean) => void;
  clearItem: (itemId: string) => void;
  setSelections: (itemId: string, mods: ModifierSelections) => void;
  countSelected: (itemId: string) => number;
}

const ItemOptionsContext = createContext<ItemOptionsContextValue | undefined>(undefined);

export function ItemOptionsProvider({ children }: { children: ReactNode }) {
  const [selections, setSelectionsState] = useState<AllSelections>({});

  const getSelection = useCallback(
    (itemId: string): ModifierSelections => selections[itemId] || {},
    [selections]
  );

  const setSelections = useCallback((itemId: string, mods: ModifierSelections) => {
    setSelectionsState(prev => ({ ...prev, [itemId]: mods }));
  }, []);

  const toggleOption = useCallback(
    (itemId: string, modifierName: string, optionName: string, multi: boolean) => {
      setSelectionsState(prev => {
        const item = prev[itemId] || {};
        const current = item[modifierName] || [];
        let next: string[];
        if (multi) {
          next = current.includes(optionName)
            ? current.filter(o => o !== optionName)
            : [...current, optionName];
        } else {
          next = current.includes(optionName) ? [] : [optionName];
        }
        return { ...prev, [itemId]: { ...item, [modifierName]: next } };
      });
    },
    []
  );

  const clearItem = useCallback((itemId: string) => {
    setSelectionsState(prev => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
  }, []);

  const countSelected = useCallback(
    (itemId: string): number =>
      Object.values(selections[itemId] || {}).reduce((acc, arr) => acc + arr.length, 0),
    [selections]
  );

  const value = useMemo(
    () => ({ selections, getSelection, toggleOption, clearItem, setSelections, countSelected }),
    [selections, getSelection, toggleOption, clearItem, setSelections, countSelected]
  );

  return <ItemOptionsContext.Provider value={value}>{children}</ItemOptionsContext.Provider>;
}

export function useItemOptions() {
  const ctx = useContext(ItemOptionsContext);
  if (!ctx) throw new Error('useItemOptions must be used within ItemOptionsProvider');
  return ctx;
}