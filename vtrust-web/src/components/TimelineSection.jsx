import React, { useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMouseTilt } from '../hooks/useMouseTilt';
import './TimelineSection.css';

const tabsData = {
  chung: {
    title: "MỤC TIÊU CHUNG",
    intro: "Ba thương hiệu được chọn dù thuộc các ngành khác nhau, nhưng đều minh chứng cho một câu hỏi lớn: Doanh nghiệp Việt phải làm gì để vươn lên trong nền kinh tế thị trường?",
    cards: [
      { year: "1. Tự chủ cạnh tranh", title: "", content: "Không thể đi sau mãi mãi, doanh nghiệp Việt buộc phải tạo lợi thế riêng bằng chất lượng, công nghệ và khả năng thích ứng." },
      { year: "2. Đổi mới để tồn tại", title: "", content: "Đổi mới là điều kiện sống còn. Liên tục cải tiến từ sản phẩm, mô hình kinh doanh đến cách truyền thông." },
      { year: "3. Hội nhập không hòa tan", title: "", content: "Học hỏi chuẩn mực quốc tế, nhưng vẫn giữ được bản sắc Việt và khả năng thấu hiểu thị trường nội địa." }
    ],
    mainBody: "Tinh thần này phản ánh trọn vẹn đường lối đổi mới: xây dựng nền kinh tế độc lập, tự chủ gắn với chủ động hội nhập kinh tế quốc tế; phát huy vị thế của doanh nghiệp trong bối cảnh toàn cầu."
  },
  vinfast: {
    title: "Từ khát vọng công nghiệp Việt đến bước ngoặt xe điện",
    cards: [
      { year: "Năm 2017", title: "Khát vọng ô tô Việt", content: "Bước vào ngành công nghiệp đòi hỏi vốn và công nghệ cao, hiện thực hóa khát vọng: xây dựng một thương hiệu ô tô Việt cạnh tranh quy mô lớn." },
      { year: "Năm 2021", title: "Bước ngoặt xe điện", content: "Chuyển hướng 100% sang xe điện cho thấy tư duy quyết liệt: từ bỏ lối mòn, đánh chiếm xu thế 'kinh tế xanh' toàn cầu." },
      { year: "Năm 2023", title: "Được công nhận rộng rãi", content: "Niêm yết trên sàn Nasdaq (Mỹ), trở thành biểu tượng rõ nét cho tham vọng vươn tầm thế giới của doanh nghiệp Việt." }
    ],
    mainBody: "VinFast là minh chứng cho doanh nghiệp Việt thời đại mới: dám đầu tư lớn, bước vào ngành khó và đặt mục tiêu vĩ mô. Thành công không chỉ nằm ở tốc độ, mà ở năng lực chọn hướng đi chiến lược.\n\nThay vì chỉ dựa vào lợi thế chi phí thấp, VinFast cho thấy bước chuyển từ tư duy “làm được gì” sang “cạnh tranh bằng cách nào” qua việc đổi mới công nghệ và mở rộng tầm nhìn toàn cầu.",
    successTitle: "Vì sao VinFast tạo được dấu ấn?",
    successBox: [
      "Đầu tư thẳng vào ngành công nghiệp nền tảng thay vì ngắn hạn.",
      "Tái định vị thương hiệu bằng xe điện, đón đầu xu thế chuyển đổi xanh.",
      "Làm chủ truyền thông và triển khai hệ sinh thái quy mô lớn."
    ],
    resolution: "Câu chuyện VinFast phản ánh rõ chủ trương phát triển lực lượng sản xuất, xây dựng nền kinh tế độc lập, tự chủ gắn liền với hội nhập. Đây là biểu hiện của tư duy: chủ động bước ra biển lớn bằng năng lực cốt lõi.",
    insight: "VinFast hấp dẫn vì nó cho Gen Z một niềm tin thực tế: Người Việt hoàn toàn có thể tạo ra sản phẩm công nghệ đủ tầm vươn ra thế giới."
  },
  bitis: {
    title: "Thương hiệu cũ tự làm mới để trò chuyện với thế hệ mới",
    cards: [
      { year: "Giai đoạn nền", title: "Quen thuộc nhưng cũ kỹ", content: "Việc định hình quá lâu với hình ảnh truyền thống khiến thương hiệu từng bị giảm sức hút trước các đối thủ ngoại nhập." },
      { year: "Tái định vị", title: "Hunter ra đời", content: "Sự ra đời của dòng Hunter là bước làm mới toàn diện: từ thiết kế trẻ trung, năng động đến đổi mới ngôn ngữ thương hiệu." },
      { year: "Bùng nổ", title: "Chạm đúng cảm xúc", content: "Chiến lược Digital Marketing khéo léo, kết hợp KOLs và âm nhạc đã giúp Biti's lấy lại vị thế cực mạnh trong giới trẻ." }
    ],
    mainBody: "Nếu VinFast là tham vọng công nghiệp, thì Biti’s Hunter là bài học về khả năng tự làm mới để phục sinh. Trong thị trường hiện đại, một doanh nghiệp muốn tồn tại phải biết cách kể lại câu chuyện của mình.\n\nHunter chứng minh doanh nghiệp Việt hoàn toàn có nội lực để thích ứng: từ nâng cấp kiểu dáng đến khai thác sức mạnh của marketing. Đổi mới không nhất thiết phải là công nghệ phức tạp; đôi khi nó bắt đầu bằng việc thấu hiểu đúng nhu cầu tệp khách hàng trẻ.",
    successTitle: "Vì sao Biti’s Hunter lội ngược dòng?",
    successBox: [
      "Tái định vị hình ảnh thương hiệu đúng thời điểm quyết định.",
      "Thiết kế cập nhật, bắt kịp gu thẩm mỹ của Gen Z.",
      "Biến một thương hiệu 'cũ' thành một nhãn hiệu Local Brand 'đáng tự hào'."
    ],
    resolution: "Điều này thể hiện đường lối nâng cao năng lực cạnh tranh trong nền kinh tế thị trường. Doanh nghiệp không thể ăn mày dĩ vãng, mà phải đổi mới để sinh tồn và kiến tạo thị phần bằng tư duy năng động.",
    insight: "Biti's Hunter chứng tỏ: Hàng Việt không hề 'cũ', vấn đề là thương hiệu có chịu chuyển mình để bước vào thế giới của người trẻ hay không."
  },
  coolmate: {
    title: "Tối giản sản phẩm, tối ưu trải nghiệm, bứt tốc mô hình mới",
    cards: [
      { year: "Khởi đầu", title: "Khác biệt từ sự đơn giản", content: "Không cạnh tranh bằng sự hào nhoáng, Coolmate hướng đến nhu cầu tủ đồ cơ bản của nam giới bằng nền tảng mua sắm tiện lợi." },
      { year: "Đổi mới", title: "Mô hình D2C", content: "Tối ưu chuỗi cung ứng, cắt giảm khâu trung gian để kiểm soát toàn bộ vòng đời trải nghiệm khách hàng trong thời đại số." },
      { year: "Mở rộng", title: "Kinh doanh bền vững", content: "Gắn liền với lối sống xanh, bao bì tái chế và trách nhiệm xã hội, tạo điểm chạm sâu sắc với người tiêu dùng có ý thức." }
    ],
    mainBody: "Coolmate là hình ảnh Local Brand đặc trưng của thời đại kinh tế số: Không cần xuất phát điểm khổng lồ, mà dùng tư duy công nghệ để đánh chiếm thị trường. Giá trị không chỉ nằm ở sản xuất, mà ở cách vận hành mô hình và chăm sóc khách hàng.\n\nSự thành công đến từ việc giải quyết bài toán: mua sắm minh bạch, nhanh chóng, tiện lợi. Thương hiệu này không phô trương mà tập trung tối đa vào hiệu năng, đại diện cho những doanh nghiệp Việt thế hệ mới siêu linh hoạt.",
    successTitle: "Vì sao Coolmate được yêu thích?",
    successBox: [
      "Giải quyết đúng 'nỗi đau' mua sắm của tập khách hàng nam giới.",
      "Mô hình mua hàng trực tiếp (D2C) minh bạch, tiết kiệm.",
      "Định hình văn hóa tiêu dùng thiết thực, hiện đại và bền vững."
    ],
    resolution: "Coolmate cho thấy không gian sáng tạo vô hạn trong nền kinh tế thị trường định hướng XHCN. Sự thành công của mô hình số khẳng định doanh nghiệp trong nước đang dần chuyển biến, tạo ra giá trị dựa trên dịch vụ và tư duy quản trị tinh gọn.",
    insight: "Coolmate ăn điểm ở sự rõ ràng, thực dụng: không vòng vo, sản phẩm tốt, dịch vụ dễ chịu – đó chính là điều Gen Z cần."
  }
};

const TimelineSection = () => {
  const [activeTab, setActiveTab] = useState('chung');
  const { ref: revealRef, isVisible } = useScrollReveal();

  useEffect(() => {
    const onQuizOpenTab = (event) => {
      const tabKey = event?.detail?.tabKey;
      if (!tabKey || !tabsData[tabKey]) return;
      setActiveTab(tabKey);
    };

    window.addEventListener('quiz-open-tab', onQuizOpenTab);
    return () => {
      window.removeEventListener('quiz-open-tab', onQuizOpenTab);
    };
  }, []);

  const data = tabsData[activeTab];

  // One tilt per card slot (max 3 cards)
  const tilts = [useMouseTilt(8), useMouseTilt(8), useMouseTilt(8)];

  return (
    <section ref={revealRef} className={`timeline-section reveal ${isVisible ? 'is-visible' : ''}`} id="thuonghieu">
      <div className="container py-20">
        <div id="quiz-focus-common-goals-block">
        <h2 className="timeline-title text-center font-serif mb-12">
          <span className="text-red">TỰ HÀO LOCAL BRAND:</span> NHỮNG BƯỚC CHÂN TỰ CHỦ
        </h2>

        <div className="tabs flex justify-center gap-4 mb-16">
          <button className={`tab-btn ${activeTab === 'chung' ? 'active' : ''}`} onClick={() => setActiveTab('chung')}>MỤC TIÊU CHUNG</button>
          <button className={`tab-btn ${activeTab === 'vinfast' ? 'active' : ''}`} onClick={() => setActiveTab('vinfast')}>VINFAST</button>
          <button className={`tab-btn ${activeTab === 'bitis' ? 'active' : ''}`} onClick={() => setActiveTab('bitis')}>BITI'S HUNTER</button>
          <button className={`tab-btn ${activeTab === 'coolmate' ? 'active' : ''}`} onClick={() => setActiveTab('coolmate')}>COOLMATE</button>
        </div>

        <div className="tab-content" style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
          <div className="text-center mb-10">
            <h3 className="text-red font-serif mb-4" style={{ fontSize: '1.8rem' }}>{data.title}</h3>
            {data.intro && <p style={{ fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.7' }}>{data.intro}</p>}
          </div>

          <div className="timeline-cards flex gap-6 mb-12">
            {data.cards.map((card, idx) => (
              <div
                key={idx}
                id={activeTab === 'vinfast' && card.year === 'Năm 2021' ? 'quiz-focus-vinfast-2021' : undefined}
                ref={tilts[idx]?.ref}
                onMouseMove={tilts[idx]?.onMouseMove}
                onMouseLeave={tilts[idx]?.onMouseLeave}
                className={`timeline-card card-yellow flex-col hover-scale tilt-card reveal-child stagger-${idx + 1}`}
              >
                <div className="timeline-year text-red" style={{ fontSize: '1.1rem' }}>
                  <span className="line"></span> {card.year}
                </div>
                <div className="timeline-content">
                  {card.title && <h3>{card.title}</h3>}
                  <p>{card.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="tab-analysis" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
            {data.mainBody.split('\n\n').map((para, i) => (
              <p key={i} className="mb-4">{para}</p>
            ))}

            {data.successBox && (
              <div className="success-box card-yellow mt-10 mb-10" style={{ backgroundColor: '#fff', border: '2px solid var(--primary-yellow)', padding: '30px', borderRadius: '15px' }}>
                <h4 className="text-red font-serif mb-4" style={{ fontSize: '1.4rem' }}>Giải mã thành công: {data.successTitle}</h4>
                <ul className="success-list" style={{ paddingLeft: '20px' }}>
                  {data.successBox.map((item, i) => <li key={i} className="mb-2" style={{ fontWeight: 500 }}>{item}</li>)}
                </ul>
              </div>
            )}

            {data.insight && (
              <div className="insight-box text-center mt-10" style={{ backgroundColor: 'var(--primary-yellow)', padding: '20px', borderRadius: '50px', fontWeight: 'bold' }}>
                <span className="text-red">Insight for Gen Z:</span> {data.insight}
              </div>
            )}

            {data.resolution && (
              <div className={`key-insight ${isVisible ? 'is-visible' : ''}`} style={{ marginTop: '30px' }}>
                <span className="ki-label">⚡ Liên kết Nghị quyết</span>
                {data.resolution}
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
