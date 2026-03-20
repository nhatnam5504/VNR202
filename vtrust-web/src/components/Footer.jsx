import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Footer.css';

const Footer = () => {
  const { ref: revealRef, isVisible } = useScrollReveal();

  return (
    <footer ref={revealRef} className={`footer py-10 reveal ${isVisible ? 'is-visible' : ''}`}>
      <div className="container">
        <div className="footer-top card-yellow text-center flex flex-col items-center justify-center">
          <h2 className="footer-title font-serif text-red mb-4">V-TRUST</h2>
          <p className="footer-desc">
            Dự án PBL môn Lịch sử Đảng Cộng sản Việt Nam.<br/>
            V-TRUST được thực hiện nhằm vận dụng kiến thức về giai đoạn Đổi mới từ năm 1986 đến nay để phân tích hành trình phát triển của các thương hiệu Việt trong nền kinh tế thị trường định hướng xã hội chủ nghĩa. Dự án hướng đến việc kết nối lý thuyết lịch sử – chính trị với thực tiễn kinh doanh đương đại, từ đó truyền tải tinh thần đổi mới tới lăng kính của Gen Z.
          </p>
        </div>

        <div className="footer-bottom flex justify-between mt-10">
          <div className="footer-team">
            <h3 className="mb-4">Trọng tâm học thuật</h3>
            <ul className="ref-list">
              <li>Nền kinh tế thị trường định hướng xã hội chủ nghĩa</li>
              <li>Xây dựng nền kinh tế độc lập, tự chủ gắn với hội nhập quốc tế</li>
              <li>Vai trò của doanh nghiệp Việt trong thời kỳ cạnh tranh mới</li>
              <li>Ý nghĩa hiện đại của tinh thần “Người Việt Nam ưu tiên dùng hàng Việt Nam”</li>
            </ul>
            
            <h3 className="mt-8 mb-4">Nhóm thực hiện</h3>
            <div className="team-badge-wrap">
              <span className="team-badge">Nhóm 2</span>
            </div>
          </div>

          <div className="footer-refs">
            <h3 className="mb-4">TÀI LIỆU THAM KHẢO</h3>
            <ul className="ref-list">
              <li>Giáo trình Lịch sử Đảng Cộng sản Việt Nam, NXB Chính trị Quốc gia Sự thật, 2021.</li>
              <li>Các báo cáo tài chính, chiến lược truyền thông thực tế của VinFast, Biti's Hunter, Coolmate (2019-2024).</li>
              <li>Các Văn kiện Đại hội đại biểu toàn quốc lần thứ VI, XII, XIII.</li>
              <li>Trợ lý ảo AI hỗ trợ tìm kiếm và tóm tắt số liệu (Chi tiết tại Phụ lục Báo cáo AI).</li>
            </ul>
          </div>
        </div>

        <div className="footer-closing mt-12 text-center" style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '20px' }}>
          <p className="font-serif font-bold" style={{ fontSize: '1.1rem', color: 'var(--primary-red)' }}>
            Khi người Việt tin dùng hàng Việt, đó không chỉ là tiêu dùng — mà còn là sự tiếp nối tinh thần Đổi mới trong thời đại mới.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
