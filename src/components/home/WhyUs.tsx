import { useLanguage } from '../../context/LanguageContext';

const whyUsItems = [
  {
    title: 'Chuẩn vị Hàn Quốc',
    description: 'Món ăn Hàn Quốc chuẩn vị, công thức truyền thống truyền cảm hứng từ Seoul.',
  },
  {
    title: 'Nguyên liệu tươi mỗi ngày',
    description: 'Nguyên liệu tươi sống mỗi ngày, thịt nhập khẩu, hải sản tươi sống, rau hữu cơ.',
  },
  {
    title: 'Không gian ấm cúng',
    description: 'Không gian hiện đại, ấm cúng, phù hợp mọi dịp: gia đình, bạn bè, hẹn hò.',
  },
  {
    title: 'Tùy chọn linh hoạt',
    description: 'Tùy chỉnh món ăn theo ý thích: độ cay, topping, kích cỡ, độ ngọt, đá.',
  },
  {
    title: 'Topping phong phú',
    description: 'Hệ thống topping phong phú: trứng, kimchi, phô mai, thịt, hải sản, nấm...',
  },
  {
    title: 'Đặt bàn dễ dàng',
    description: 'Đặt bàn nhanh qua điện thoại, Zalo, hoặc trực tiếp tại quán.',
  },
];

export function WhyUs() {
  const { t } = useLanguage();

  return (
    <section className="section bg-seoul-charcoal/50" aria-labelledby="why-us-title">
      <div className="container-custom">
        <header className="section-header">
          <h2 id="why-us-title" className="section-title">
            {t.hero.headline.includes('Hàn') ? 'Tại sao chọn Seoul Korean Cuisine?' : 'Why Choose Us?'}
          </h2>
          <div className="divider" aria-hidden="true" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
          {whyUsItems.map((item, index) => (
            <article key={item.title} className="animate-fade-in stagger-1" role="listitem">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-seoul-gold/10 border border-seoul-gold/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-seoul-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-seoul-text mb-1">{item.title}</h3>
                  <p className="text-seoul-text-muted text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}