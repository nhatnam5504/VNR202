import './FactsTicker.css';

const facts = [
  "35 năm Đổi mới — từ bao cấp đến kinh tế thị trường",
  "VinFast: Từ đầm lầy Hải Phòng đến sàn Nasdaq (Mỹ) 🚗⚡",
  "Biti's Hunter: Lội ngược dòng — cứu thương hiệu bằng Gen Z 👟",
  "Coolmate: D2C + minh bạch = 'cú đấm thép' của Local Brand 💪",
  "\"Người Việt Nam ưu tiên dùng hàng Việt Nam\" — Bộ Chính trị, 2009",
  "Local Brand không chỉ bán sản phẩm — họ bán tư duy đổi mới 🔥",
];

const FactsTicker = () => {
  // Duplicate the list so the loop is seamless
  const combined = [...facts, ...facts];

  return (
    <div className="ticker-container" aria-hidden="true">
      <div className="ticker-track">
        {combined.map((fact, i) => (
          <span key={i} className="ticker-item">
            <span className="ticker-star">★</span>
            {fact}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FactsTicker;
