import { useState } from 'react';
import { useCart, type CartLine } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { ModLabel } from '../../utils/menuUtils';

/** Floating cart bar (all screens while cart has items) + cart drawer with extras. */
export function CartWidget() {
  const { lines, itemCount, total, setQuantity, remove, clear, addExtra } = useCart();
  const { t, formatPrice, locale } = useLanguage();
  const [open, setOpen] = useState(false);
  const [extrasFor, setExtrasFor] = useState<string | null>(null); // line.key with open extras panel

  if (itemCount === 0) return null;

  return (
    <>
      {/* Full-width bottom bar — part of the interface, not a floating pill (spec 7) */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed left-0 right-0 bottom-0 z-40 flex items-center justify-center gap-3 h-14 w-full
                   bg-black/70 backdrop-blur-md border-t border-white/15 text-white font-semibold
                   hover:bg-black/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-seoul-gold/70"
        aria-label={`Open cart, ${itemCount} items`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.29 2.29c-.63.63-.18 1.71.7 1.71H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span>{t.cart.title} · {itemCount}</span>
        <span aria-hidden="true">·</span>
        <span className="text-seoul-gold">{formatPrice(total)}</span>
      </button>

      {/* Drawer */}
      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Cart">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-seoul-charcoal border-l border-seoul-surface shadow-2xl flex flex-col animate-slide-up">
            <div className="flex items-center justify-between p-5 border-b border-seoul-surface">
              <h2 className="text-lg font-bold text-seoul-text">{t.cart.title} ({itemCount})</h2>
              <div className="flex gap-2">
                {lines.length > 0 && (
                  <button onClick={clear} className="text-xs text-seoul-text-muted hover:text-seoul-red transition-colors px-2">
                    {t.cart.clear}
                  </button>
                )}
                <button
                  onClick={() => setOpen(false)}
                  className="w-9 h-9 rounded-full bg-seoul-black/60 flex items-center justify-center text-seoul-text hover:bg-seoul-black transition-colors"
                  aria-label="Close cart"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {lines.map(line => (
                <CartLineCard
                  key={line.key}
                  line={line}
                  onAddExtra={(modName, optName, optPrice) => addExtra(line.key, modName, optName, optPrice)}
                  extrasOpen={extrasFor === line.key}
                  onToggleExtras={() => setExtrasFor(extrasFor === line.key ? null : line.key)}
                  onSetQty={(q) => setQuantity(line.key, q)}
                  onRemove={() => remove(line.key)}
                />
              ))}
            </div>

            <div className="p-5 border-t border-seoul-surface space-y-3">
              <div className="flex justify-between text-base">
                <span className="text-seoul-text-muted">{t.cart.subtotal}</span>
                <span className="text-seoul-text">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span className="text-seoul-text">{t.cart.total}</span>
                <span className="text-seoul-gold">{formatPrice(total)}</span>
              </div>
              <button className="btn-hero-primary w-full" onClick={() => alert(t.cart.checkout)}>
                {t.cart.checkout}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

interface CartLineCardProps {
  line: CartLine;
  onAddExtra: (modifierName: string, optionName: string, optionPrice: number) => void;
  extrasOpen: boolean;
  onToggleExtras: () => void;
  onSetQty: (qty: number) => void;
  onRemove: () => void;
}

function CartLineCard({ line, onAddExtra, extrasOpen, onToggleExtras, onSetQty, onRemove }: CartLineCardProps) {
  const { t, formatPrice, locale } = useLanguage();

  // Optional multi modifiers become "Add extras" in the cart
  const extraMods = line.item.modifiers.filter(m => !m.required && m.type === 'multi');
  // Already chosen extras for this line (name -> count across modifier groups)
  const chosenExtras: { name: string; name_vi?: string; name_en?: string; price: number }[] = [];
  for (const [modName, opts] of Object.entries(line.modifiers)) {
    const mod = line.item.modifiers.find(m => m.name === modName);
    if (!mod || mod.required) continue;
    for (const optName of opts) {
      const opt = mod.options.find(o => o.name === optName);
      if (opt) chosenExtras.push({ name: optName, name_vi: opt.name_vi, name_en: opt.name_en, price: opt.price });
    }
  }
  const extrasTotal = chosenExtras.reduce((a, e) => a + e.price, 0);

  return (
    <div className="bg-black/40 rounded-xl p-4 space-y-2 border border-white/10">
      <div className="flex justify-between gap-3">
        <h3 className="font-semibold text-seoul-text">{(locale === 'en' ? line.item.name_en : line.item.name_vi) || line.item.name_vi} × {line.quantity}</h3>
        <button
          onClick={onRemove}
          className="text-seoul-text-muted hover:text-seoul-red transition-colors shrink-0"
          aria-label={`${t.cart.remove} ${(locale === 'en' ? line.item.name_en : line.item.name_vi) || line.item.name_vi}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.87 12.14A2 2 0 0116.14 21H7.86a2 2 0 01-1.99-1.86L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
      </div>

      {/* Required choices (e.g. Size) shown read-only */}
      {Object.entries(line.modifiers).filter(([modName, opts]) => {
        if (opts.length === 0) return false;
        const mod = line.item.modifiers.find(m => m.name === modName);
        return !!mod; // show every chosen modifier (required + optional, single + multi)
      }).map(([modName, opts]) => (
        <p key={modName} className="text-sm text-seoul-text-muted">
          <span className="opacity-70">{ModLabel(line.item.modifiers.find(m => m.name === modName), locale)}:</span> {opts.map(o => ModLabel(line.item.modifiers.find(m => m.name === modName)?.options.find(op => op.name === o), locale)).join(', ')}
        </p>
      ))}

      {/* Extras already added to this line */}
      {chosenExtras.length > 0 && (
        <div className="space-y-1 pt-1">
          {chosenExtras.map((e, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="text-white/80">+ {ModLabel({ name: e.name, name_vi: e.name_vi, name_en: e.name_en }, locale)}</span>
              <span className="text-seoul-text-muted">{formatPrice(e.price)}</span>
            </div>
          ))}
        </div>
      )}

      {/* Quantity + line total */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onSetQty(line.quantity - 1)}
            className="w-8 h-8 rounded-lg bg-seoul-surface flex items-center justify-center text-seoul-text hover:bg-seoul-text-muted/20 transition-colors"
            aria-label="Decrease quantity"
          >−</button>
          <span className="font-semibold text-seoul-text min-w-[1.5rem] text-center">{line.quantity}</span>
          <button
            onClick={() => onSetQty(line.quantity + 1)}
            className="w-8 h-8 rounded-lg bg-seoul-surface flex items-center justify-center text-seoul-text hover:bg-seoul-text-muted/20 transition-colors"
            aria-label="Increase quantity"
          >+</button>
        </div>
        <span className="font-bold text-seoul-gold">{formatPrice(line.unitPrice * line.quantity)}</span>
      </div>

      {/* Add extras section */}
      {extraMods.length > 0 && (
        <div className="pt-2 border-t border-seoul-surface/60">
          <button
            onClick={onToggleExtras}
            aria-expanded={extrasOpen}
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-seoul-gold hover:text-[#e6c35c] transition-colors"
          >
            <svg className={`w-4 h-4 transition-transform duration-200 ${extrasOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {t.cart.addExtras}{extrasTotal > 0 ? ` (${formatPrice(extrasTotal)})` : ''}
          </button>

          <div
            className="overflow-hidden transition-all duration-300 ease-out"
            style={{ maxHeight: extrasOpen ? '360px' : '0px', opacity: extrasOpen ? 1 : 0 }}
          >
            <div className="pt-3 grid grid-cols-1 gap-2">
              {extraMods.map(mod =>
                mod.options.map(option => {
                  const already = (line.modifiers[mod.name] || []).includes(option.name);
                  return (
                    <button
                      key={mod.name + ':' + option.name}
                      disabled={already}
                      onClick={() => onAddExtra(mod.name, option.name, option.price)}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg border text-sm transition-colors ${
                        already
                          ? 'border-seoul-gold/40 bg-seoul-gold/10 text-seoul-gold cursor-default'
                          : 'border-seoul-surface bg-seoul-black/50 text-white hover:border-seoul-gold/50 hover:text-seoul-gold'
                      }`}
                    >
                      <span>{ModLabel(option, locale)}</span>
                      <span>{already ? t.cart.added : `+ ${formatPrice(option.price)}`}</span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}