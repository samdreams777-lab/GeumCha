import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { MenuItem } from '../types/menu';

/**
 * Order cart. Each line is a unique combination of
 * item id + chosen modifiers, so "Beef Noodles ×2 with Egg"
 * never merges with a plain "Beef Noodles ×1".
 * State lives here (above routes) so it survives navigation.
 */

export interface CartLine {
  key: string;               // itemId + '|' + sorted modifiers signature
  item: MenuItem;
  quantity: number;
  modifiers: Record<string, string[]>; // modifierName -> option names
  unitPrice: number;         // base + modifiers for ONE unit
}

interface CartContextValue {
  lines: CartLine[];
  itemCount: number;
  total: number;
  add: (item: MenuItem, modifiers: Record<string, string[]>, unitPrice: number, qty: number) => void;
  setQuantity: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  addExtra: (key: string, modifierName: string, optionName: string, optionPrice: number) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function lineKey(itemId: string, mods: Record<string, string[]>): string {
  const parts = Object.entries(mods)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([m, opts]) => m + ':' + [...opts].sort().join('+'));
  return itemId + '|' + parts.join('|');
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const add = useCallback((item: MenuItem, modifiers: Record<string, string[]>, unitPrice: number, qty: number) => {
    const key = lineKey(item.id, modifiers);
    setLines(prev => {
      const existing = prev.find(l => l.key === key);
      if (existing) {
        return prev.map(l => l.key === key ? { ...l, quantity: l.quantity + qty } : l);
      }
      return [...prev, { key, item, quantity: qty, modifiers, unitPrice }];
    });
  }, []);

  const setQuantity = useCallback((key: string, qty: number) => {
    setLines(prev => qty <= 0
      ? prev.filter(l => l.key !== key)
      : prev.map(l => l.key === key ? { ...l, quantity: qty } : l));
  }, []);

  const remove = useCallback((key: string) => {
    setLines(prev => prev.filter(l => l.key !== key));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const addExtra = useCallback((key: string, modifierName: string, optionName: string, optionPrice: number) => {
    setLines(prev => prev.map(l => {
      if (l.key !== key) return l;
      const opts = l.modifiers[modifierName] || [];
      if (opts.includes(optionName)) return l; // already added
      return {
        ...l,
        modifiers: { ...l.modifiers, [modifierName]: [...opts, optionName] },
        unitPrice: l.unitPrice + optionPrice,
      };
    }));
  }, []);

  const { itemCount, total } = useMemo(() => ({
    itemCount: lines.reduce((a, l) => a + l.quantity, 0),
    total: lines.reduce((a, l) => a + l.quantity * l.unitPrice, 0),
  }), [lines]);

  const value = useMemo(
    () => ({ lines, itemCount, total, add, setQuantity, remove, clear, addExtra }),
    [lines, itemCount, total, add, setQuantity, remove, clear, addExtra]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}