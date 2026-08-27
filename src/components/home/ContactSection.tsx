import { useLanguage } from '../../context/LanguageContext';
import { Button, buttonBaseClass } from '../ui/Button';
import { ZaloIcon } from '../ui/ZaloIcon';
import restaurantInfo from '../../data/restaurant/info.json';

export function ContactSection() {
  const { t } = useLanguage();

  const contactMethods = [
    {
      label: t.contact.callUs,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      action: (
        <a
          href={`tel:${restaurantInfo.phone.replace(/\s/g, '')}`}
          className="font-medium text-seoul-gold hover:text-seoul-gold/80 transition-colors"
        >
          {restaurantInfo.phone !== 'TODO: Phone number from owner' ? restaurantInfo.phone : 'Đang cập nhật...'}
        </a>
      ),
    },
    {
      label: t.location.zalo,
      icon: (
        <ZaloIcon className="w-6 h-6" />
      ),
      action: restaurantInfo.zalo !== 'TODO: Zalo link/QR from owner' ? (
        <a
          href={restaurantInfo.zalo}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-seoul-gold hover:text-seoul-gold/80 transition-colors"
        >
          Mở Zalo
        </a>
      ) : (
        <span className="text-seoul-text-muted/50">Đang cập nhật...</span>
      ),
    },
    {
      label: t.contact.messenger,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      ),
      action: restaurantInfo.messenger !== 'TODO: Messenger link from owner' ? (
        <a
          href={restaurantInfo.messenger}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-seoul-gold hover:text-seoul-gold/80 transition-colors"
        >
          Mở Messenger
        </a>
      ) : (
        <span className="text-seoul-text-muted/50">Đang cập nhật...</span>
      ),
    },
  ];

  return (
    <section className="section" aria-labelledby="contact-title">
      <div className="container-custom">
        <header className="section-header">
          <h2 id="contact-title" className="section-title">{t.contact.title}</h2>
          <div className="divider" aria-hidden="true" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {contactMethods.map((method, index) => (
            <article
              key={index}
              className="card-transparent p-6 text-center animate-fade-in stagger-1"
              role="listitem"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-seoul-gold/10 border border-seoul-gold/30 text-seoul-gold mb-4">
                {method.icon}
              </div>
              <h3 className="font-semibold text-seoul-text mb-3">{method.label}</h3>
              <div>{method.action}</div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href={`tel:${restaurantInfo.phone.replace(/\s/g, '')}`} className="btn-hero-dark sm:w-48">{t.contact.callUs}</a>
        </div>
      </div>
    </section>
  );
}