import { useState, useEffect, useMemo } from 'react';
import { Fragment } from 'react';
import { Image } from '../ui/Image';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import type { MenuItem, Modifier, ModifierOption } from '../../types/menu';
import { formatPrice, ModLabel } from '../../utils/menuUtils';
import { createPortal } from 'react-dom';
import { getImageForItem } from '../../utils/itemImages';
import { useCart } from '../../context/CartContext';

interface MenuItemDetailModalProps {
  item: MenuItem;
  category: { id: string; name_vi: string; name_en: string };
  onClose: () => void;
}

export function MenuItemDetailModal({ item, category, onClose }: MenuItemDetailModalProps) {
  const { t, formatPrice: formatPriceFn, locale } = useLanguage();
  const [selectedModifiers, setSelectedModifiers] = useState<Record<string, string[]>>({});
  const [quantity, setQuantity] = useState(1);

  // Reset selection whenever a different product is opened, so modifiers
  // from the previous item are never carried over (cross-contamination fix).
  useEffect(() => {
    setSelectedModifiers({});
    setQuantity(1);
  }, [item]);
  const { add: addToCart } = useCart();

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Handle modifier selection
  const handleModifierSelect = (modifierName: string, optionName: string, modifier: Modifier) => {
    setSelectedModifiers(prev => {
      const current = prev[modifierName] || [];
      if (modifier.type === 'single') {
        return { ...prev, [modifierName]: [optionName] };
      } else {
        // Multi-select
        if (current.includes(optionName)) {
          const next = { ...prev };
          next[modifierName] = current.filter(o => o !== optionName);
          return next;
        }
        return { ...prev, [modifierName]: [...current, optionName] };
      }
    });
  };

  const isModifierSelected = (modifierName: string, optionName: string) => {
    return selectedModifiers[modifierName]?.includes(optionName) || false;
  };

  const isModifierValid = (modifier: Modifier) => {
    if (!modifier.required) return true;
    const selected = selectedModifiers[modifier.name] || [];
    return modifier.type === 'single' ? selected.length === 1 : selected.length > 0;
  };

  const allRequiredValid = useMemo(() => {
    return item.modifiers.filter(m => m.required).every(isModifierValid);
  }, [item.modifiers, selectedModifiers]);

  // Calculate total price
  const totalPrice = useMemo(() => {
    let total = 0;
    // Base price
    if (item.price) {
      total += parseInt(item.price, 10);
    } else {
      // Size-based price
      const sizeMod = item.modifiers.find(m =>
        m.name.toLowerCase().includes('size') ||
        m.name.toLowerCase().includes('kích cỡ') ||
        m.name.toLowerCase().includes('quantity') ||
        m.name.toLowerCase().includes('số lượng')
      );
      if (sizeMod) {
        const selected = selectedModifiers[sizeMod.name]?.[0];
        if (selected) {
          const option = sizeMod.options.find(o => o.name === selected);
          if (option) total += option.price;
        }
      }
    }

    // Add modifier prices
    for (const modifier of item.modifiers) {
      const selected = selectedModifiers[modifier.name] || [];
      for (const optionName of selected) {
        const option = modifier.options.find(o => o.name === optionName);
        if (option) total += option.price;
      }
    }

    return total * quantity;
  }, [item, selectedModifiers, quantity]);

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 md:p-0"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-seoul-black/80 backdrop-blur-sm animate-fade-in"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div
        className="relative flex flex-col w-full max-w-md md:max-w-2xl max-h-[90vh] md:max-h-[85vh] bg-[#1B1B1B]/95 backdrop-blur-md rounded-2xl md:rounded-3xl overflow-hidden animate-slide-up border border-white/15 shadow-2xl shadow-black/50"
        onClick={e => e.stopPropagation()}
      >
        {/* Header (fixed, never scrolls) */}
        <div className="relative shrink-0">
          <div className="aspect-[4/3] relative overflow-hidden">
            <Image
              src={getImageForItem(item.id)}
              alt={`${item.name_vi} — ${item.description_vi}`}
              priority
            />
          </div>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-seoul-black/60 backdrop-blur-sm flex items-center justify-center text-seoul-text hover:bg-seoul-black/80 transition-colors touch-target"
            aria-label={t.common.close}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content (scrollable region — entire product content is readable) */}
        <div className="flex-1 min-h-0 p-5 md:p-6 space-y-5 overflow-y-auto overscroll-y-contain">
          {/* Category Badge */}
          <div className="flex items-center gap-2">
            <span className="badge-gold text-xs">{locale === 'en' ? category.name_en : category.name_vi}</span>
            <span className="text-seoul-text-muted text-sm">{locale === 'en' ? category.name_vi : category.name_en}</span>
          </div>

          {/* Name & Korean Name */}
          <div>
            <h2 id="modal-title" className="text-2xl md:text-3xl font-bold text-seoul-text">
              {locale === 'en' ? item.name_en : item.name_vi}
            </h2>
            <p className="text-seoul-text-muted mt-1">{locale === 'en' ? item.name_vi : item.name_en}</p>
            {item.name_ko && (
              <p className="font-korean text-seoul-text-muted/70 mt-1">{item.name_ko}</p>
            )}
          </div>

          {/* Description */}
          <p className="text-seoul-text-muted leading-relaxed">{locale === 'en' ? item.description_en : item.description_vi}</p>

          {/* Required Modifiers */}
          {getRequiredModifiers(item).length > 0 && (
            <div className="pt-4 border-t border-seoul-surface space-y-5">
              <h3 className="font-medium text-seoul-text flex items-center gap-2">
                {t.menu.modifiers} <span className="badge-red text-xs">{t.menu.required}</span>
              </h3>
              {getRequiredModifiers(item).map(modifier => (
                <ModifierGroup
                  key={modifier.name}
                  modifier={modifier}
                  selected={selectedModifiers[modifier.name] || []}
                  onSelect={handleModifierSelect}
                  t={t}
                  formatPrice={formatPriceFn}
                  required={true}
                  locale={locale}
                />
              ))}
            </div>
          )}

          {/* Optional Modifiers */}
          {getOptionalModifiers(item).length > 0 && (
            <div className="pt-4 border-t border-seoul-surface space-y-5">
              <h3 className="font-medium text-seoul-text flex items-center gap-2">
                {t.menu.options} <span className="badge-gold text-xs">{t.menu.optional}</span>
              </h3>
              {getOptionalModifiers(item).map(modifier => (
                <ModifierGroup
                  key={modifier.name}
                  modifier={modifier}
                  selected={selectedModifiers[modifier.name] || []}
                  onSelect={handleModifierSelect}
                  t={t}
                  formatPrice={formatPriceFn}
                  required={false}
                  locale={locale}
                />
              ))}
            </div>
          )}

          {/* Quantity Selector */}
          <div className="pt-4 border-t border-seoul-surface">
            <label className="label">{t.menu.quantity}</label>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-3 bg-seoul-surface rounded-lg p-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg bg-seoul-black flex items-center justify-center text-seoul-text hover:bg-seoul-text-muted/10 transition-colors touch-target"
                  aria-label="Decrease quantity"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="text-lg font-semibold text-seoul-text min-w-[3rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg bg-seoul-black flex items-center justify-center text-seoul-text hover:bg-seoul-text-muted/10 transition-colors touch-target"
                  aria-label="Increase quantity"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="pt-4 border-t border-seoul-surface bg-seoul-surface/50 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-seoul-text-muted">{t.menu.total} ({quantity} {t.menu.quantity.toLowerCase()})</span>
              <span className="text-seoul-text font-medium">{formatPriceFn(totalPrice)}</span>
            </div>
            {item.modifiers.some(m => m.required) && !allRequiredValid && (
              <p className="text-seoul-red/80 text-sm flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {t.menu.selectRequired}
              </p>
            )}
          </div>
        </div>

        {/* Footer Actions (fixed at bottom, never overlaps content) */}
        <div className="shrink-0 p-5 md:p-6 border-t border-seoul-surface bg-seoul-black/50 flex flex-col sm:flex-row gap-3">
          <Button
            variant="secondary"
            size="lg"
            className="flex-1"
            onClick={onClose}
          >
            {t.common.close}
          </Button>
          <Button
            variant="cta"
            size="lg"
            className="flex-1"
            disabled={item.modifiers.some(m => m.required) && !allRequiredValid}
            onClick={() => {
              // unit price = base (or size option) + modifiers, without quantity
              let unit = item.price ? parseInt(item.price, 10) : 0;
              if (!item.price) {
                const sizeMod = item.modifiers.find(m =>
                  ['size', 'kích cỡ', 'quantity', 'số lượng'].some(s => m.name.toLowerCase().includes(s))
                );
                const sel = sizeMod && selectedModifiers[sizeMod.name]?.[0];
                if (sel) {
                  const opt = sizeMod!.options.find(o => o.name === sel);
                  if (opt) unit += opt.price;
                }
              }
              for (const modifier of item.modifiers) {
                for (const name of selectedModifiers[modifier.name] || []) {
                  const opt = modifier.options.find(o => o.name === name);
                  if (opt && !(sizeIsBase(modifier) )) unit += opt.price;
                }
              }
              addToCart(item, selectedModifiers, unit, quantity);
              onClose();
            }}
          >
            {t.menu.addToOrder}
          </Button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

// Helper functions (client-side)
function sizeIsBase(modifier: Modifier): boolean {
  // Size modifiers on items without base price define the unit price,
  // so they were already added above — skip them here.
  return ['size', 'kích cỡ', 'quantity', 'số lượng'].some(s => modifier.name.toLowerCase().includes(s));
}
function getRequiredModifiers(item: MenuItem): Modifier[] {
  return item.modifiers.filter(m => m.required);
}

function getOptionalModifiers(item: MenuItem): Modifier[] {
  // All non-required modifiers (extra ingredients, ice level for sodas, etc.)
  // are shown in the dish modal so the choice is visible and predictable at
  // open-time, then carried into the cart via selectedModifiers.
  return item.modifiers.filter(m => !m.required);
}

interface ModifierGroupProps {
  modifier: Modifier;
  selected: string[];
  onSelect: (modifierName: string, optionName: string, modifier: Modifier) => void;
  t: any;
  formatPrice: (price: number) => string;
  required: boolean;
  locale: 'vi' | 'en';
}

function ModifierGroup({ modifier, selected, onSelect, t, formatPrice, required, locale }: ModifierGroupProps) {
  const isValid = required ? (modifier.type === 'single' ? selected.length === 1 : selected.length > 0) : true;

  return (
    <div className="space-y-3">
      <label className="label flex items-center justify-between">
        {ModLabel(modifier, locale)}
        {!isValid && required && (
          <span className="badge-red text-xs">{t.menu.required}</span>
        )}
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" role={modifier.type === 'single' ? 'radiogroup' : 'group'} aria-label={ModLabel(modifier, locale)}>
        {modifier.options.map(option => {
          const isSelected = selected.includes(option.name);
          const displayPrice = option.price > 0 ? ` +${formatPrice(option.price)}` : '';
          return (
            <button
              key={option.name}
              onClick={() => onSelect(modifier.name, option.name, modifier)}
              className={`relative p-3 rounded-xl border-2 transition-all duration-200 text-left touch-target ${
                isSelected
                  ? 'border-seoul-gold bg-seoul-gold/10 text-seoul-text'
                  : 'border-seoul-surface bg-seoul-black/50 text-seoul-text-muted hover:border-seoul-text-muted/30 hover:bg-seoul-surface'
              } ${!isValid && required ? 'ring-2 ring-seoul-red/30' : ''}`}
              role={modifier.type === 'single' ? 'radio' : 'checkbox'}
              aria-checked={isSelected}
              aria-label={`${ModLabel(option, locale)}${displayPrice}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{ModLabel(option, locale)}</span>
                {displayPrice && <span className="text-seoul-gold font-semibold text-sm">{displayPrice}</span>}
              </div>
              {modifier.type === 'single' && (
                <div className={`absolute bottom-2 right-2 w-5 h-5 rounded-full border-2 transition-colors ${
                  isSelected ? 'border-seoul-gold bg-seoul-gold' : 'border-seoul-text-muted/30'
                }`} aria-hidden="true">
                  {isSelected && (
                    <svg className="w-3 h-3 text-seoul-black mx-auto my-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              )}
              {modifier.type === 'multi' && (
                <div className={`absolute bottom-2 right-2 w-5 h-5 rounded border-2 transition-colors ${
                  isSelected ? 'border-seoul-gold bg-seoul-gold' : 'border-seoul-text-muted/30 bg-seoul-black/50'
                }`} aria-hidden="true">
                  {isSelected && (
                    <svg className="w-3 h-3 text-seoul-black mx-auto my-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}