import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';

export function SocialProof() {
  const { t } = useLanguage();

  // These would be real reviews from Google Places API in production
  const reviews = [
    {
      author: 'Nguyễn Văn A',
      rating: 5,
      text: 'Lẩu hải sản rất ngon, hải sản tươi, nước lẩu đậm đà. Không gian đẹp, phục vụ nhiệt tình. Sẽ quay lại!',
      date: '2 tháng trước',
    },
    {
      author: 'Trần Thị B',
      rating: 5,
      text: 'Mì Kim Chi cay vừa phải, mì dai, topping đầy đąd. Trà sữa Matcha rất ngon. Giá hợp lý.',
      date: '1 tháng trước',
    },
    {
      author: 'Park Min-jun',
      rating: 5,
      text: 'Authentic Korean taste in Vietnam. The Kimchi Ramen reminded me of Seoul. Highly recommended!',
      date: '3 tuần trước',
    },
  ];

  return (
    <section className="section" aria-labelledby="reviews-title">
      <div className="container-custom">
        <header className="section-header">
          <h2 id="reviews-title" className="section-title">
            {t.hero.headline.includes('Hàn') ? 'Khách hàng nói gì về chúng tôi' : 'Customer Reviews'}
          </h2>
          <div className="divider" aria-hidden="true" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10" role="list">
          {reviews.map((review, index) => (
            <article
              key={index}
              className="card p-6 animate-fade-in stagger-1"
              role="listitem"
            >
              <div className="flex items-center gap-1 mb-4" aria-label={`${review.rating} out of 5 stars`}>
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < review.rating ? 'text-seoul-gold fill-current' : 'text-seoul-text-muted/30'}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-seoul-text-muted leading-relaxed mb-4">"{review.text}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-seoul-text">{review.author}</p>
                  <p className="text-sm text-seoul-text-muted/70">{review.date}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-3xl font-bold text-seoul-gold">4.8</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-6 h-6 ${i < 5 ? 'text-seoul-gold fill-current' : 'text-seoul-text-muted/30'}`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="text-seoul-text-muted">(120+ reviews)</span>
          </div>
          <Button
            variant="outline-gold"
            size="lg"
            onClick={() => window.open('https://maps.google.com', '_blank')}
          >
            {t.hero.headline.includes('Hàn') ? 'Đánh giá chúng tôi trên Google Maps' : 'Review us on Google Maps'}
          </Button>
        </div>
      </div>
    </section>
  );
}