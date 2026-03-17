import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMouseTilt } from '../hooks/useMouseTilt';
import './GenZSection.css';

const GenZSection = () => {
  const { ref: revealRef, isVisible } = useScrollReveal();
  const tiltL = useMouseTilt(8);
  const tiltR = useMouseTilt(8);

  return (
    <section ref={revealRef} className={`genz-section container py-20 reveal ${isVisible ? 'is-visible' : ''}`}>
      <div className="genz-header flex justify-between items-center mb-8">
        <h2 className="genz-title font-serif">
          <span className="text-red">GEN Z</span> ĐANG TIÊU DÙNG<br/> THẾ NÀO?
        </h2>
        <p className="genz-subtitle">
          Giữa "cơn bão" hàng ngoại giá rẻ trên các sàn thương mại điện tử, đâu là cơ hội vươn lên cho thương hiệu Việt? Câu trả lời không nằm ở sự kêu gọi cảm tính, mà nằm ở năng lực đổi mới thật sự: đổi mới sản phẩm, đổi mới tư duy kinh doanh, đổi mới cách tiếp cận người tiêu dùng.
        </p>
      </div>

      <div className="genz-cards flex gap-6">
        <div ref={tiltL.ref} onMouseMove={tiltL.onMouseMove} onMouseLeave={tiltL.onMouseLeave}
          className="genz-card card-yellow flex-col hover-scale tilt-card reveal-child stagger-1">
          <h3 className="card-title">KHÁT VỌNG<br/> LOCAL BRAND</h3>
          <div className="card-content">
            <p>
              Dù lớn lên trong thời đại toàn cầu hóa, Gen Z không chỉ bị thu hút bởi những thương hiệu quốc tế. Họ sẵn sàng lựa chọn hàng Việt khi sản phẩm có chất lượng tốt, thiết kế rõ bản sắc, câu chuyện thương hiệu chân thật và trải nghiệm mua sắm đủ thuyết phục.
            </p>
            <br/>
            <p>
              Với Gen Z, tiêu dùng không chỉ là mua một món đồ để sử dụng. Đó còn là cách thể hiện gu thẩm mỹ, cá tính sống và hệ giá trị mà họ muốn theo đuổi. Khi một <span className="hl-red">Local Brand</span> làm tốt sản phẩm, hiểu khách hàng và truyền tải được tinh thần riêng, nó hoàn toàn có thể trở thành lựa chọn đáng tự hào.
            </p>
          </div>
        </div>

        <div ref={tiltR.ref} onMouseMove={tiltR.onMouseMove} onMouseLeave={tiltR.onMouseLeave}
          className="genz-card card-yellow right-card flex-col hover-scale tilt-card reveal-child stagger-2">
          <p className="top-text">
            Sự bùng nổ của các nền tảng thương mại điện tử xuyên biên giới đang mang đến hàng triệu sản phẩm quốc tế với giá rẻ, mẫu mã đa dạng và tốc độ tiếp cận rất nhanh. Điều này đặt doanh nghiệp Việt trước một sức ép lớn: nếu không đổi mới, họ sẽ rất dễ bị lấn át ngay trên chính sân nhà.<br/><br/>
            Nhưng cũng chính áp lực ấy lại tạo ra bước ngoặt. Nó buộc các Local Brand phải <span className="hl-red">chuyển mình mạnh hơn</span>: đầu tư cho chất lượng, xây dựng nhận diện rõ ràng, tối ưu kênh bán hàng, làm chủ nội dung số và kết nối trực tiếp với người tiêu dùng trẻ. Đây không chỉ là câu chuyện thị trường, mà còn là minh chứng sống động cho yêu cầu nâng cao năng lực cạnh tranh của doanh nghiệp Việt trong thời kỳ hội nhập.
          </p>
          <h3 className="bottom-title font-serif">" CƠN LỐC "<br/> SÀN THƯƠNG MẠI</h3>
        </div>
      </div>
    </section>
  );
};

export default GenZSection;
