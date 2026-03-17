import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './HistoryAccordion.css';

const HistoryAccordion = () => {
  const [activeItem, setActiveItem] = useState(0);
  const { ref: revealRef, isVisible } = useScrollReveal();

  const accordionData = [
    {
      year: "Năm 1986 – Khởi nguồn \"Đổi Mới\"",
      content: "Đại hội đại biểu toàn quốc lần thứ VI\nNội dung: Đảng khởi xướng đường lối Đổi mới toàn diện, chuyển từ kinh tế bao cấp sang nền kinh tế hàng hóa nhiều thành phần. Quyết sách lịch sử này đã cởi trói cho lực lượng sản xuất, mở đường cho sự ra đời và trỗi dậy mạnh mẽ của các doanh nghiệp tư nhân Việt Nam sau này."
    },
    {
      year: "Năm 2009 – Đánh thức \"Niềm tin\"",
      content: "Bộ Chính trị chính thức phát động cuộc vận động \"Người Việt Nam ưu tiên dùng hàng Việt Nam\". Đây là cột mốc quan trọng khơi dậy niềm tự hào dân tộc trong tiêu dùng."
    },
    {
      year: "Năm 2021 – Khát vọng \"Vươn tầm\"",
      content: "Đại hội đại biểu toàn quốc lần thứ XIII định hướng mục tiêu đưa Việt Nam trở thành nước phát triển, thu nhập cao vào năm 2045. Các doanh nghiệp Việt đứng trước sứ mệnh tiên phong chuyển đổi số và phát triển bền vững."
    },
    {
      year: "Năm 2026 – Hiện tại và tầm nhìn",
      content: "Chặng đường tiếp theo của thế hệ Gen Z, tiếp bước cha anh, vững vàng trên đà phát triển nền kinh tế số."
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
            Sức sống của hàng Việt không tự nhiên mà có, nó được ươm mầm từ những quyết sách mang tính bước ngoặt.
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
