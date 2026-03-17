import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer py-10">
      <div className="container">
        <div className="footer-top card-yellow text-center flex-col items-center justify-center">
          <h2 className="footer-title font-serif text-red mb-4">V-TRUST</h2>
          <p className="footer-desc">
            Dự án PBL (Project-Based Learning) môn Lịch sử Đảng Cộng sản Việt Nam (VNR202).<br/>
            Nhằm truyền tải đường lối đổi mới kinh tế của Đảng qua lăng kính của Gen Z và các thương hiệu nội địa.
          </p>
        </div>

        <div className="footer-bottom flex justify-between mt-10">
          <div className="footer-team">
            <h3 className="mb-4">Danh sách NHÓM 2</h3>
            <p className="team-member">HOÀNG NGHĨA - SE182826</p>
            <p className="team-member">TÂM</p>
            <p className="team-member">...</p>
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
      </div>
    </footer>
  );
};

export default Footer;
