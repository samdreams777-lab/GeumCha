import { useLanguage } from '../context/LanguageContext';
import { SEOHead } from '../components/ui/SEOHead';
import { ZaloIcon } from '../components/ui/ZaloIcon';
import restaurantInfo from '../data/restaurant/info.json';

export function LocationPage() {
  const { t, locale } = useLanguage();

  const fullAddress = [
    restaurantInfo.address.street,
    restaurantInfo.address.ward,
    restaurantInfo.address.district,
    restaurantInfo.address.city,
    restaurantInfo.address.country,
  ]
    .filter(Boolean)
    .join(', ');

  const days = [
    { key: 'monday', label: 'Thứ 2', label_en: 'Monday', open: '10:00', close: '22:00' },
    { key: 'tuesday', label: 'Thứ 3', label_en: 'Tuesday', open: '10:00', close: '22:00' },
    { key: 'wednesday', label: 'Thứ 4', label_en: 'Wednesday', open: '10:00', close: '22:00' },
    { key: 'thursday', label: 'Thứ 5', label_en: 'Thursday', open: '10:00', close: '22:00' },
    { key: 'friday', label: 'Thứ 6', label_en: 'Friday', open: '10:00', close: '22:00' },
    { key: 'saturday', label: 'Thứ 7', label_en: 'Saturday', open: '10:00', close: '22:00' },
    { key: 'sunday', label: 'Chủ nhật', label_en: 'Sunday', open: '10:00', close: '22:00' },
  ];

  return (
    <>
      <SEOHead pageType="location" />
      <section className="section pt-32" aria-labelledby="location-title">
        <div className="container-custom">
          <header className="section-header max-w-3xl mx-auto text-center mb-16">
            <h1 id="location-title" className="section-title">{t.location.title}</h1>
            <div className="divider" aria-hidden="true" />
            <p className="section-subtitle">
              {t.location.address} • {t.location.hours} • {t.contact.callUs}
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {/* Info Card */}
            <div className="card-transparent p-8 space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-seoul-text mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-seoul-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {t.location.address}
                </h2>
                <address className="not-italic text-seoul-text-muted leading-relaxed text-lg">
                  {fullAddress || 'Đang cập nhật địa chỉ chi tiết...'}
                </address>
              </div>

              <div className="pt-6 border-t border-seoul-surface">
                <h2 className="text-xl font-semibold text-seoul-text mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-seoul-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t.location.hours}
                </h2>
                <dl className="space-y-3">
                  {days.map(day => (
                    <div key={day.key} className="flex justify-between items-center py-2 border-b border-seoul-surface/50 last:border-0">
                      <dt className="text-seoul-text">{locale === 'en' ? day.label_en : day.label}</dt>
                      <dd className="text-seoul-text-muted font-medium">{day.open} - {day.close}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="pt-6 border-t border-seoul-surface">
                <h2 className="text-xl font-semibold text-seoul-text mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-seoul-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {t.contact.callUs}
                </h2>
                <a
                  href={`tel:${restaurantInfo.phone.replace(/\s/g, '')}`}
                  className="text-seoul-gold hover:text-seoul-gold/80 transition-colors text-lg font-medium block"
                >
                  {restaurantInfo.phone !== 'TODO: Phone number from owner' ? restaurantInfo.phone : 'Đang cập nhật...'}
                </a>
              </div>

              {restaurantInfo.zalo !== 'TODO: Zalo link/QR from owner' && (
                <div className="pt-6 border-t border-seoul-surface">
                  <h2 className="text-xl font-semibold text-seoul-text mb-4 flex items-center gap-2">
                    <ZaloIcon className="w-6 h-6 text-seoul-gold" />
                    {t.location.zalo}
                  </h2>
                  <a
                    href={restaurantInfo.zalo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-seoul-gold hover:text-seoul-gold/80 transition-colors text-lg font-medium block"
                  >
                    Nhắn tin qua Zalo
                  </a>
                </div>
              )}
            </div>

            {/* Map Card */}
            <div className="card-transparent p-0 overflow-hidden">
              <div className="relative aspect-[4/3]">
                {/* Live Google Maps embed */}
                <iframe
                  title="Seoul Korean Cuisine — Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.2669520449494!2d107.09990604331085!3d16.813107739066552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3140e58d3f7b771b%3A0xcf7f4d3ccb9d8111!2zTcOsIENheSBTRU9VTCDEkMO0bmcgSMOg!5e0!3m2!1sru!2s!4v1787814916982!5m2!1sru!2s"
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
              <div className="p-6 border-t border-seoul-surface flex justify-center">
                <a
                  href={restaurantInfo.googleMapsLink || `https://maps.google.com/?q=${restaurantInfo.coordinates.latitude},${restaurantInfo.coordinates.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-hero-dark sm:w-56"
                >
                  {t.location.openInMaps}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={`https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`} target="_blank" rel="noopener noreferrer" className="btn-hero-dark sm:w-48">
                  {t.location.getDirections}
                </a>
              <a href="/menu" className="btn-hero-dark sm:w-48">{t.menu.title}</a>
              <a href={`tel:${restaurantInfo.phone.replace(/\s/g, '')}`} className="btn-hero-dark sm:w-48">{t.contact.callUs}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}