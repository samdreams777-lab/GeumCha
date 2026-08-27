import { useLanguage } from '../../context/LanguageContext';
import { Button, buttonBaseClass } from '../ui/Button';
import { ZaloIcon } from '../ui/ZaloIcon';
import restaurantInfo from '../../data/restaurant/info.json';

export function LocationSection() {
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

  return (
    <section className="section bg-transparent" aria-labelledby="location-title">
      <div className="container-custom">
        <header className="section-header">
          <h2 id="location-title" className="section-title">{t.location.title}</h2>
          <div className="divider" aria-hidden="true" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-seoul-text mb-2">{t.location.address}</h3>
              <address className="not-italic text-seoul-text-muted leading-relaxed">
                {fullAddress || 'Đang cập nhật địa chỉ...'}
              </address>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-seoul-text mb-2">{t.location.hours}</h3>
              <dl className="space-y-1 text-seoul-text-muted">
                <div className="flex justify-between">
                  <dt>{locale === 'en' ? 'Mon – Sat' : 'Thứ 2 - Thứ 7'}</dt>
                  <dd>10:00 - 22:00</dd>
                </div>
                <div className="flex justify-between">
                  <dt>{locale === 'en' ? 'Sunday' : 'Chủ nhật'}</dt>
                  <dd>10:00 - 22:00</dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-seoul-text mb-2">{t.contact.callUs}</h3>
              <a
                href={`tel:${restaurantInfo.phone.replace(/\s/g, '')}`}
                className="text-seoul-gold hover:text-seoul-gold/80 transition-colors"
              >
                {restaurantInfo.phone !== 'TODO: Phone number from owner' ? restaurantInfo.phone : 'Đang cập nhật...'}
              </a>
            </div>

            {restaurantInfo.zalo !== 'TODO: Zalo link/QR from owner' && (
              <div>
                <h3 className="text-lg font-semibold text-seoul-text mb-2 flex items-center gap-2">
                  <ZaloIcon className="w-5 h-5 text-seoul-gold" />
                  {t.location.zalo}
                </h3>
                <a
                  href={restaurantInfo.zalo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-seoul-gold hover:text-seoul-gold/80 transition-colors"
                >
                  {locale === 'en' ? 'Chat on Zalo' : 'Nhắn tin Zalo'}
                </a>
              </div>
            )}
          </div>

          {/* Map - live Google Maps embed */}
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-seoul-surface border border-seoul-text-muted/10">
            <iframe
              title="Seoul Korean Cuisine — Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.2669520449494!2d107.09990604331085!3d16.813107739066552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3140e58d3f7b771b%3A0xcf7f4d3ccb9d8111!2zTcOsIENheSBTRU9VTCDEkMO0bmcgSMOg!5e0!3m2!1sru!2s!4v1787814916982!5m2!1sru!2s"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>

        <div className="text-center mt-10">
          <Button variant="cta" size="lg" onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`, '_blank')}>
            {t.location.getDirections}
          </Button>
        </div>
      </div>
    </section>
  );
}