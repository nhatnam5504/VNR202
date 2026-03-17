import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './HistoryAccordion.css';

const HistoryAccordion = () => {
  const [activeItem, setActiveItem] = useState(0);
  const { ref: revealRef, isVisible } = useScrollReveal();

  const accordionData = [
    {
      year: "Năm 1986 — Khởi nguồn \"Đổi mới\"",
      content: "Đại hội VI của Đảng Cộng sản Việt Nam đánh dấu bước ngoặt lịch sử khi khởi xướng công cuộc Đổi mới toàn diện. Từ đây, nền kinh tế từng bước chuyển từ cơ chế bao cấp sang vận hành theo cơ chế thị trường định hướng xã hội chủ nghĩa. Sự thay đổi này mở ra điều kiện để doanh nghiệp được chủ động hơn, năng động hơn, đồng thời buộc phải cạnh tranh và thích ứng với thị trường."
    },
    {
      year: "Năm 2009 — Đánh thức \"Niềm tin\"",
      content: "Cuộc vận động “Người Việt Nam ưu tiên dùng hàng Việt Nam” không chỉ khuyến khích tiêu dùng nội địa, mà còn góp phần thay đổi nhận thức xã hội về chất lượng và vị trí của hàng Việt. Trong bối cảnh thương hiệu ngoại chiếm ưu thế mạnh mẽ, đây là một cú hích quan trọng để doanh nghiệp Việt mạnh dạn đầu tư hơn vào sản phẩm, thương hiệu và niềm tin người dùng."
    },
    {
      year: "Năm 2021 — Khát vọng \"Vươn tầm\"",
      content: "Khi kinh tế số, thương mại điện tử và cạnh tranh toàn cầu phát triển mạnh, doanh nghiệp Việt không còn chỉ đứng trước câu hỏi “làm ra sản phẩm gì”, mà phải trả lời “làm sao để đủ sức cạnh tranh và có bản sắc riêng”. Đây là giai đoạn nhiều Local Brand chuyển mình mạnh mẽ, đầu tư cho hình ảnh, công nghệ, vận hành và chiến lược khách hàng."
    },
    {
      year: "Hiện tại — Tự chủ và hội nhập",
      content: "Ngày nay, sự phát triển của Local Brand là minh chứng cho một xu hướng rõ rệt: doanh nghiệp Việt đang từng bước vừa làm chủ thị trường nội địa, vừa học cách vươn ra bên ngoài. Từ một nền kinh tế thiếu thốn, Việt Nam đã tạo dựng được lớp doanh nghiệp có năng lực cạnh tranh ngày càng rõ hơn. Đó chính là kết quả cụ thể của quá trình Đổi mới trong thực tiễn."
    }
  ];

  const handleToggle = (index) => {
    setActiveItem(activeItem === index ? -1 : index);
  };

  return (
    <section ref={revealRef} className={`history-section reveal ${isVisible ? 'is-visible' : ''}`} id="gocnhin">
      <div className="container py-20 flex history-container">
        <div className="history-left flex-col gap-6">
          <h2 className="history-title font-serif">
            <span className="text-red">BỆ PHÓNG LỊCH SỬ:</span><br />
            TỪ NGHỊ QUYẾT ĐẾN<br />
            THỰC TIỄN
          </h2>
          <p className="history-desc">
            Sự lớn lên của các thương hiệu Việt không diễn ra trong khoảng trống. Đằng sau mỗi bước tiến của doanh nghiệp là một bối cảnh chính sách, một môi trường kinh tế và một quá trình chuyển biến tư duy kéo dài nhiều thập niên.
          </p>
        </div>

        <div className="history-right">
          <div className="accordion">
            {accordionData.map((item, index) => (
              <div 
                key={index} 
                className={`accordion-item ${activeItem === index ? 'active' : ''} hover-float`}
              >
                <div 
                  className="accordion-header flex justify-between items-center"
                  onClick={() => handleToggle(index)}
                >
                  <h3>{item.year}</h3>
                  <span className="icon">{activeItem === index ? '−' : '+'}</span>
                </div>
                {activeItem === index && (
                  <div className="accordion-content">
                    <p style={{ whiteSpace: 'pre-line' }}>{item.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistoryAccordion;
