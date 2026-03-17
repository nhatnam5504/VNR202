import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const QuoteSection = () => {
  const { ref: revealRef, isVisible } = useScrollReveal();

  return (
    <section ref={revealRef} className={`quote-section container py-20 mb-8 reveal ${isVisible ? 'is-visible' : ''}`} id="boicanh">
      <div className="flex-col items-center text-center">

        <p className="section-tldr">
          Đổi mới 1986 là <span className="highlight-word">bệ phóng</span> — doanh nghiệp Việt được tự chủ và vươn ra thế giới.
        </p>

        <h2 className="font-serif mb-6" style={{ fontSize: '2.5rem', lineHeight: '1.2' }}>
          <span className="text-red">LIÊN KẾT NGHỊ QUYẾT:</span><br/> TỪ CHỦ TRƯƠNG ĐẾN THỰC TIỄN
        </h2>

        <div style={{ maxWidth: '900px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.8', fontWeight: '500' }}>
          <p className="mb-4">
            Sự trưởng thành của các Local Brand gắn liền với công cuộc Đổi mới (Đại hội VI - 1986): từ bỏ cơ chế bao cấp, hướng tới nền kinh tế thị trường định hướng xã hội chủ nghĩa. Bước ngoặt này là bệ phóng để doanh nghiệp được tự chủ kinh doanh và bứt phá sáng tạo.
          </p>
          <p className="mb-4">
            Tại sân chơi mở, chất lượng và năng lực thích ứng quyết định tất cả. Những VinFast, Biti's Hunter hay Coolmate lớn lên từ chính môi trường ấy, minh chứng cho một sức sống chung: đổi mới, tự chủ và sẵn sàng hội nhập.
          </p>
        </div>

        <div className={`key-insight ${isVisible ? 'is-visible' : ''}`} style={{ textAlign: 'left', marginTop: '20px' }}>
          <span className="ki-label">⚡ Điểm Mấu Chốt</span>
          "Thành công của Local Brand không phải ngẫu nhiên, mà là "mùa quả ngọt" khi đường lối kiến tạo đúng đắn gặp gỡ bản lĩnh kiên cường của doanh nghiệp Việt."
        </div>

      </div>
    </section>
  );
};

export default QuoteSection;
