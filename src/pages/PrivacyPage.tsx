import { useLanguage } from '../context/LanguageContext';
import { SEOHead } from '../components/ui/SEOHead';
import restaurantInfo from '../data/restaurant/info.json';

export function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <>
      <SEOHead pageType="privacy" />
      <section className="section pt-32 pb-16" aria-labelledby="privacy-title">
        <div className="container-custom">
          <header className="section-header max-w-3xl mx-auto text-center mb-16">
            <h1 id="privacy-title" className="section-title">{t.footer.privacy}</h1>
            <div className="divider" aria-hidden="true" />
            <p className="section-subtitle">
              Cập nhật lần cuối: Tháng 8, 2026
            </p>
          </header>

          <div className="max-w-3xl mx-auto prose prose-invert space-y-8 text-seoul-text-muted leading-relaxed">
            <article>
              <h2 className="text-xl font-bold text-seoul-text mb-3">1. Thu thập thông tin</h2>
              <p>Chúng tôi thu thập thông tin cá nhân khi bạn:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Liên hệ qua điện thoại, Zalo, Messenger hoặc email</li>
                <li>Đặt bàn tại nhà hàng</li>
                <li>Truy cập website (thông tin thiết bị, IP, trình duyệt)</li>
                <li>Để lại đánh giá trên Google Maps</li>
              </ul>
              <p>Các loại thông tin có thể bao gồm: Họ tên, Số điện thoại, Email, Địa chỉ, Nội dung tin nhắn.</p>
            </article>

            <article>
              <h2 className="text-xl font-bold text-seoul-text mb-3">2. Sử dụng thông tin</h2>
              <p>Thông tin của bạn được sử dụng để:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Xác nhận và quản lý đặt bàn</li>
                <li>Liên lạc lại khi cần thiết</li>
                <li>Cải thiện dịch vụ và trải nghiệm khách hàng</li>
                <li>Gửi thông tin khuyến mãi (chỉ khi bạn đồng ý)</li>
                <li>Tuân thủ quy định pháp luật</li>
              </ul>
            </article>

            <article>
              <h2 className="text-xl font-bold text-seoul-text mb-3">3. Chia sẻ thông tin</h2>
              <p>Chúng tôi KHÔNG bán thông tin cá nhân của bạn. Thông tin chỉ được chia sẻ khi:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Có sự đồng ý rõ ràng từ bạn</li>
                <li>Yêu cầu của cơ quan nhà nước có thẩm quyền</li>
                <li>Các nhà cung cấp dịch vụ hỗ trợ vận hành (Google Maps, Zalo, Facebook) theo chính sách bảo mật của họ</li>
              </ul>
            </article>

            <article>
              <h2 className="text-xl font-bold text-seoul-text mb-3">4. Bảo vệ dữ liệu</h2>
              <p>Chúng tôi áp dụng các biện pháp bảo vệ kỹ thuật và tổ chức phù hợp để ngăn chặn truy cập trái phép, mất mát, sửa đổi hoặc tiết lộ thông tin cá nhân của bạn.</p>
            </article>

            <article>
              <h2 className="text-xl font-bold text-seoul-text mb-3">5. Quyền của bạn</h2>
              <p>Bạn có quyền:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Yêu cầu truy cập, chỉnh sửa hoặc xóa thông tin cá nhân</li>
                <li>Rút lại sự đồng ý xử lý dữ liệu</li>
                <li>Khiếu nại đến cơ quan quản lý bảo vệ dữ liệu cá nhân</li>
              </ul>
              <p>Để thực hiện các quyền trên, vui lòng liên hệ qua: {restaurantInfo.email !== 'TODO: Email from owner' ? restaurantInfo.email : 'email đang cập nhật'}.</p>
            </article>

            <article>
              <h2 className="text-xl font-bold text-seoul-text mb-3">6. Cookie và công nghệ tương tự</h2>
              <p>Website sử dụng cookie cần thiết để hoạt động bình thường (ngôn ngữ, session). Chúng tôi không sử dụng cookie quảng cáo hoặc theo dõi hành vi người dùng.</p>
            </article>

            <article>
              <h2 className="text-xl font-bold text-seoul-text mb-3">7. Liên kết bên thứ ba</h2>
              <p>Website có thể chứa liên kết đến Google Maps, Facebook, Instagram, TikTok, Zalo. Chính sách bảo mật này không áp dụng cho các trang web bên thứ ba. Vui lòng đọc chính sách của họ khi truy cập.</p>
            </article>

            <article>
              <h2 className="text-xl font-bold text-seoul-text mb-3">8. Thay đổi chính sách</h2>
              <p>Chúng tôi có thể cập nhật chính sách này theo thời gian. Mọi thay đổi quan trọng sẽ được thông báo trên trang này với ngày cập nhật mới.</p>
            </article>

            <article>
              <h2 className="text-xl font-bold text-seoul-text mb-3">9. Liên hệ</h2>
              <p>Mọi thắc mắc về chính sách bảo mật, vui lòng liên hệ:</p>
              <address className="not-italic mt-2 space-y-1">
                <p><strong>Geum Cha</strong></p>
                <p>Điện thoại: {restaurantInfo.phone !== 'TODO: Phone number from owner' ? restaurantInfo.phone : 'Đang cập nhật...'}</p>
                <p>Email: {restaurantInfo.email !== 'TODO: Email from owner' ? restaurantInfo.email : 'Đang cập nhật...'}</p>
              </address>
            </article>
          </div>

          <div className="text-center mt-12 pt-8 border-t border-seoul-surface">
            <a href="/" className="text-seoul-gold hover:text-seoul-gold/80 transition-colors font-medium inline-flex items-center gap-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Về trang chủ
            </a>
          </div>
        </div>
      </section>
    </>
  );
}