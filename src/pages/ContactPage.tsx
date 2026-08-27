import { useLanguage } from '../context/LanguageContext';
import { SEOHead } from '../components/ui/SEOHead';
import { ZaloIcon } from '../components/ui/ZaloIcon';
import restaurantInfo from '../data/restaurant/info.json';

export function ContactPage() {
  const { t } = useLanguage();

  const contactMethods = [
    {
      label: t.contact.callUs,
      description: 'Gọi trực tiếp để đặt bàn hoặc tư vấn menu',
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
      available: restaurantInfo.phone !== 'TODO: Phone number from owner',
    },
    {
      label: t.location.zalo,
      description: 'Nhắn tin nhanh, nhận ưu đãi và cập nhật menu mới',
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
      available: restaurantInfo.zalo !== 'TODO: Zalo link/QR from owner',
    },
    {
      label: t.contact.messenger,
      description: 'Chat qua Facebook Messenger',
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
      available: restaurantInfo.messenger !== 'TODO: Messenger link from owner',
    },
    {
      label: t.contact.email,
      description: 'Gửi email cho các sự kiện, hợp tác hoặc phản hồi',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      action: restaurantInfo.email !== 'TODO: Email from owner' ? (
        <a
          href={`mailto:${restaurantInfo.email}`}
          className="font-medium text-seoul-gold hover:text-seoul-gold/80 transition-colors"
        >
          {restaurantInfo.email}
        </a>
      ) : (
        <span className="text-seoul-text-muted/50">Đang cập nhật...</span>
      ),
      available: restaurantInfo.email !== 'TODO: Email from owner',
    },
  ];

  return (
    <>
      <SEOHead pageType="contact" />
      <section className="section pt-32" aria-labelledby="contact-title">
        <div className="container-custom">
          <header className="section-header max-w-3xl mx-auto text-center mb-16">
            <h1 id="contact-title" className="section-title">{t.contact.title}</h1>
            <div className="divider" aria-hidden="true" />
            <p className="section-subtitle">
              {t.contact.callUs} • {t.location.zalo} • {t.contact.messenger} • {t.contact.email}
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
            {contactMethods.map((method, index) => (
              <article
                key={index}
                className={`card-transparent p-6 animate-fade-in ${!method.available ? 'opacity-60' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                role="listitem"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-seoul-gold/10 border border-seoul-gold/30 flex items-center justify-center text-seoul-gold">
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-seoul-text mb-1">{method.label}</h3>
                    <p className="text-sm text-seoul-text-muted mb-4">{method.description}</p>
                    <div>{method.action}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Quick Action Buttons — unified style per spec 5 */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <a href={`tel:${restaurantInfo.phone.replace(/\s/g, '')}`} className="btn-hero-dark sm:w-48">{t.contact.callUs}</a>
              <a href={restaurantInfo.zalo} target="_blank" rel="noopener noreferrer" aria-disabled="true" className="btn-hero-dark sm:w-48">{t.location.zalo}</a>
              <a href="/menu" className="btn-hero-dark sm:w-48">{t.menu.title}</a>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-6 pt-8 border-t border-seoul-surface">
              <p className="text-seoul-text-muted">{t.contact.followUs}</p>
              {restaurantInfo.social.facebook !== 'TODO: Facebook page URL' && (
                <a href={restaurantInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="text-seoul-text-muted hover:text-seoul-gold transition-colors" aria-label="Facebook">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
              )}
              {restaurantInfo.social.instagram !== 'TODO: Instagram URL' && (
                <a href={restaurantInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="text-seoul-text-muted hover:text-seoul-gold transition-colors" aria-label="Instagram">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              )}
              {restaurantInfo.social.tiktok !== 'TODO: TikTok URL' && (
                <a href={restaurantInfo.social.tiktok} target="_blank" rel="noopener noreferrer" className="text-seoul-text-muted hover:text-seoul-gold transition-colors" aria-label="TikTok">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.548.64a6.264 6.264 0 0 1 1.924 1.898c5.7-.636 8.93 5.086 7.36 9.418-1.565 4.33-6.638 6.559-9.54 4.154C8.93 18.028 4.924 13.82 3.473 8.09c-.21-.788-.13-1.47.07-1.878 1.814-3.704 6.263-5.07 9.005-4.472zm-1.11 18.36c-3.177.36-6.416-1.92-7.75-4.87 1.123 2.392 4.61 3.956 7.585 3.23-.605.71-1.834 1.63-2.835 1.64zm4.93-17.68c-.75 2.564-2.693 4.575-4.89 4.33 2.293.25 3.86-.82 4.76-2.95 1.06-2.41-.88-4.18-3.72-3.63-.752.15-1.51.18-2.25.25zm1.255 15.52c1.483-1.585 1.585-4.154-.66-5.544 1.038.45 2.254.675 2.94.675 1.01 0 1.88-.63 2.3-1.72-1.74.13-3.794.3-4.58 1.69zm-.14-3.54c0 .73-.54 1.63-1.23 1.63-.7 0-1.27-.9-1.27-1.63 0-.73.57-1.63 1.27-1.63.69 0 1.23.9 1.23 1.63z"/></svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}