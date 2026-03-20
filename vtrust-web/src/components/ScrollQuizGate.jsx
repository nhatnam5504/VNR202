import React, { useEffect, useMemo, useRef, useState } from 'react';
import './ScrollQuizGate.css';

const quizSteps = [
  {
    triggerId: 'thuonghieu',
    readId: 'hero-top',
    focusTargetId: 'quiz-focus-doimoi-1986',
    readLabel: 'Mở đầu V-TRUST',
    question: 'Theo nội dung mở đầu, công cuộc Đổi mới được khởi xướng từ mốc nào?',
    options: [
      { label: 'Năm 1975', correct: false },
      { label: 'Năm 1986', correct: true },
      { label: 'Năm 1995', correct: false },
      { label: 'Năm 2009', correct: false }
    ],
    hint: 'Gợi ý: đọc lại phần mở đầu và thẻ số liệu “35 năm Đổi mới”.'
  },
  {
    triggerId: 'boicanh',
    readId: 'thuonghieu',
    activateTab: 'vinfast',
    focusTargetId: 'quiz-focus-vinfast-2021',
    readLabel: 'Tự hào Local Brand',
    question: 'Trong case VinFast, bước ngoặt chiến lược năm 2021 là gì?',
    options: [
      { label: 'Mở chuỗi cửa hàng thời trang', correct: false },
      { label: 'Chuyển hướng 100% sang xe điện', correct: true },
      { label: 'Ngừng mở rộng thị trường', correct: false },
      { label: 'Chỉ tập trung gia công', correct: false }
    ],
    hint: 'Gợi ý: xem lại tab VinFast ở phần thương hiệu.'
  },
  {
    triggerId: 'gocnhin',
    readId: 'gocnhin',
    openAccordionIndex: 1,
    focusTargetId: 'quiz-focus-hangviet-2009',
    readLabel: 'Bệ phóng lịch sử',
    question: 'Cuộc vận động “Người Việt Nam ưu tiên dùng hàng Việt Nam” được nhắc ở mốc nào?',
    options: [
      { label: '1986', correct: false },
      { label: '2009', correct: true },
      { label: '2017', correct: false },
      { label: '2023', correct: false }
    ],
    hint: 'Gợi ý: mở mục “Năm 2009 — Đánh thức Niềm tin”.'
  },
  {
    triggerId: 'binhchon',
    readId: 'binhchon',
    readLabel: 'Trạm Check-Var',
    question: 'Thông điệp trung tâm của trang là gì?',
    options: [
      { label: 'Ưu tiên hàng ngoại để hội nhập nhanh', correct: false },
      { label: 'Tự hào hàng Việt, đổi mới và tự chủ', correct: true },
      { label: 'Chỉ quan tâm giá rẻ', correct: false },
      { label: 'Giảm vai trò doanh nghiệp Việt', correct: false }
    ],
    hint: 'Gợi ý: đọc lại các đoạn kết luận màu đỏ trong các section.'
  }
];

const ScrollQuizGate = () => {
  const [answered, setAnswered] = useState(() => Array(quizSteps.length).fill(false));
  const [activeStepIndex, setActiveStepIndex] = useState(null);
  const [notification, setNotification] = useState('');
  const [isTransitioningWrong, setIsTransitioningWrong] = useState(false);
  const reopenLockRef = useRef({ index: null, until: 0 });
  const notificationTimerRef = useRef(null);

  const activeStep = useMemo(() => {
    if (activeStepIndex === null) return null;
    return quizSteps[activeStepIndex];
  }, [activeStepIndex]);

  useEffect(() => {
    if (activeStepIndex !== null) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }

    return undefined;
  }, [activeStepIndex]);

  useEffect(() => {
    return () => {
      if (notificationTimerRef.current) {
        window.clearTimeout(notificationTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const allDone = answered.every(Boolean);
    if (allDone) return undefined;

    const checkGate = () => {
      if (activeStepIndex !== null) return;

      const triggerLine = window.scrollY + window.innerHeight * 0.45;

      for (let i = 0; i < quizSteps.length; i += 1) {
        if (answered[i]) continue;

        const lock = reopenLockRef.current;
        if (lock.index === i && Date.now() < lock.until) {
          break;
        }

        if (lock.index === i && Date.now() >= lock.until) {
          reopenLockRef.current = { index: null, until: 0 };
        }

        const step = quizSteps[i];
        const triggerEl = document.getElementById(step.triggerId);
        if (!triggerEl) continue;

        if (triggerLine >= triggerEl.offsetTop) {
          setActiveStepIndex(i);
          break;
        }

        break;
      }
    };

    checkGate();
    window.addEventListener('scroll', checkGate);
    window.addEventListener('resize', checkGate);

    return () => {
      window.removeEventListener('scroll', checkGate);
      window.removeEventListener('resize', checkGate);
    };
  }, [answered, activeStepIndex]);

  const showNotification = (message) => {
    if (!message) return;

    setNotification(message);

    if (notificationTimerRef.current) {
      window.clearTimeout(notificationTimerRef.current);
    }

    notificationTimerRef.current = window.setTimeout(() => {
      setNotification('');
    }, 2600);
  };

  const animateFocusTarget = (targetId) => {
    if (!targetId) return;

    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    targetEl.classList.remove('quiz-gate-focus');
    void targetEl.offsetWidth;
    targetEl.classList.add('quiz-gate-focus');

    window.setTimeout(() => {
      targetEl.classList.remove('quiz-gate-focus');
    }, 2200);
  };

  const handleWrongAnswer = (step, stepIndex) => {
    if (!step || stepIndex === null) return;

    reopenLockRef.current = { index: stepIndex, until: Date.now() + 3200 };
    setActiveStepIndex(null);

    if (step.activateTab) {
      window.dispatchEvent(new CustomEvent('quiz-open-tab', { detail: { tabKey: step.activateTab } }));
    }

    if (typeof step.openAccordionIndex === 'number') {
      window.dispatchEvent(
        new CustomEvent('quiz-open-accordion', { detail: { index: step.openAccordionIndex } })
      );
    }

    const readEl = document.getElementById(step.readId);
    if (readEl) {
      const top = Math.max(0, readEl.offsetTop - 96);
      window.scrollTo({ top, behavior: 'smooth' });
    }

    window.setTimeout(() => {
      animateFocusTarget(step.focusTargetId);
    }, 650);
  };

  const handleOptionClick = (isCorrect) => {
    if (isTransitioningWrong) return;

    if (isCorrect) {
      setAnswered((prev) => {
        const next = [...prev];
        if (activeStepIndex !== null) {
          next[activeStepIndex] = true;
        }
        return next;
      });
      setActiveStepIndex(null);
      return;
    }

    const currentStep = activeStep;
    const currentIndex = activeStepIndex;

    showNotification(`Bạn trả lời sai. ${currentStep?.hint || ''}`.trim());
    setIsTransitioningWrong(true);

    window.setTimeout(() => {
      handleWrongAnswer(currentStep, currentIndex);
      setIsTransitioningWrong(false);
    }, 720);
  };

  if (!activeStep && !notification) return null;

  return (
    <>
      {notification ? (
        <div className="quiz-gate-toast" role="status" aria-live="polite">
          {notification}
        </div>
      ) : null}

      {activeStep ? (
        <div className="quiz-gate-overlay" role="dialog" aria-modal="true" aria-labelledby="quiz-gate-title">
          <div className="quiz-gate-card">
            <div className="quiz-gate-chip">Checkpoint bắt buộc {activeStepIndex + 1}/4</div>
            <h3 id="quiz-gate-title" className="quiz-gate-title">Trả lời đúng để tiếp tục cuộn</h3>
            <p className="quiz-gate-question">{activeStep.question}</p>

            <div className="quiz-gate-options">
              {activeStep.options.map((option, idx) => (
                <button
                  key={`${activeStepIndex}-${idx}`}
                  type="button"
                  className="quiz-gate-option"
                  disabled={isTransitioningWrong}
                  onClick={() => handleOptionClick(option.correct)}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <p className="quiz-gate-hint">
              Nếu chưa chắc, đọc lại: <strong>{activeStep.readLabel}</strong>
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ScrollQuizGate;
