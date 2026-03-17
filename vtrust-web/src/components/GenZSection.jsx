import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './GenZSection.css';

const GenZSection = () => {
  const { ref: revealRef, isVisible } = useScrollReveal();

  return (
    <section ref={revealRef} className={`genz-section container py-20 reveal ${isVisible ? 'is-visible' : ''}`}>
      <div className="genz-header flex justify-between items-center mb-8">
        <h2 className="genz-title font-serif">
          <span className="text-red">GEN Z</span> ĐANG TIÊU DÙNG<br/> THẾ NÀO?
        </h2>
        <p className="genz-subtitle">
          Giữa "cơn bão" hàng ngoại giá rẻ trên các sàn thương mại điện tử, đâu là cơ hội vươn lên cho thương hiệu Việt?
        </p>
      </div>

      <div className="genz-cards flex gap-6">
        <div className="genz-card card-yellow flex-col hover-scale">
          <h3 className="card-title">KHÁT VỌNG<br/> LOCAL BRAND</h3>
          <div className="card-content">
            <p>
              Dù đứng trước 'cơn bão' hàng ngoại, Gen Z không hề quay lưng với hàng Việt.
              Ngược lại, họ sẵn sàng móc hầu bao và <span className="hl-red">tự hào lan tỏa</span> những sản phẩm nội địa mang đậm bản sắc,
              có câu chuyện thương hiệu truyền cảm hứng và cam kết 100% 'chất lượng thật'.
            </p>
          </div>
        </div>

        <div className="genz-card card-yellow right-card flex-col hover-scale">
          <p className="top-text">
            Sự đổ bộ của các nền tảng thương mại điện tử xuyên biên giới mang đến hàng triệu sản phẩm quốc tế giá rẻ. Thói quen 'chốt đơn' của giới trẻ thay đổi chóng mặt.<br/><br/>
            Đây là một phép thử khắc nghiệt, buộc các doanh nghiệp Việt phải <span className="hl-red">chuyển mình</span> nếu không muốn nhường lại thị phần ngay trên sân nhà.
          </p>
          <h3 className="bottom-title font-serif">" CƠN LỐC "<br/> SÀN THƯƠNG MẠI</h3>
        </div>
      </div>
    </section>
  );
};

export default GenZSection;
