import React, { useEffect, useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './PollSection.css';

const POLL_OPTIONS = [
  { id: 'vinfast', apiValue: 'VinFast', label: 'VinFast — Bứt phá công nghệ toàn cầu', shortLabel: 'VinFast' },
  { id: 'bitis', apiValue: 'Biti\'s Hunter', label: 'Biti’s Hunter — Chuyển mình từ di sản', shortLabel: 'Biti’s Hunter' },
  { id: 'coolmate', apiValue: 'Coolmate', label: 'Coolmate — Thích ứng kinh tế số', shortLabel: 'Coolmate' },
  { id: 'other', apiValue: 'Other', label: 'Một Local Brand khác mê hơn và cá tính hơn', shortLabel: 'Local Brand khác' }
];

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

const buildApiUrl = (path) => `${API_BASE_URL}${path}`;

const normalizeOptionKey = (value) => {
  if (!value) {
    return null;
  }

  const cleaned = String(value).trim().toLowerCase();
  if (cleaned === 'vinfast') {
    return 'vinfast';
  }
  if (cleaned.includes('biti')) {
    return 'bitis';
  }
  if (cleaned === 'coolmate') {
    return 'coolmate';
  }
  if (cleaned === 'other' || cleaned.includes('local')) {
    return 'other';
  }
  return null;
};

const pickVoteList = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }
  if (Array.isArray(payload?.votes)) {
    return payload.votes;
  }
  if (Array.isArray(payload?.data)) {
    return payload.data;
  }
  return [];
};

const getVoteCountFromListResponse = (payload) => {
  const voteList = pickVoteList(payload);
  if (voteList.length > 0) {
    return voteList.length;
  }

  if (typeof payload?.totalVotes === 'number') {
    return payload.totalVotes;
  }
  if (typeof payload?.count === 'number') {
    return payload.count;
  }

  return 0;
};

const getCountMapFromResultResponse = (payload) => {
  const countMap = {
    vinfast: 0,
    bitis: 0,
    coolmate: 0,
    other: 0
  };

  const resultArray = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.results)
      ? payload.results
      : Array.isArray(payload?.data)
        ? payload.data
        : null;

  if (resultArray) {
    resultArray.forEach((entry) => {
      const optionKey = normalizeOptionKey(entry?.option ?? entry?.name ?? entry?.label);
      const rawCount = entry?.votes ?? entry?.count ?? entry?.value ?? 0;
      const parsedCount = Number(rawCount);
      if (optionKey && Number.isFinite(parsedCount)) {
        countMap[optionKey] += Math.max(0, parsedCount);
      }
    });
    return countMap;
  }

  const directResultObject = payload?.results && typeof payload.results === 'object' ? payload.results : payload;
  if (directResultObject && typeof directResultObject === 'object') {
    Object.entries(directResultObject).forEach(([optionKey, rawCount]) => {
      const normalizedKey = normalizeOptionKey(optionKey);
      const parsedCount = Number(rawCount);
      if (normalizedKey && Number.isFinite(parsedCount)) {
        countMap[normalizedKey] += Math.max(0, parsedCount);
      }
    });
  }

  return countMap;
};

const buildUiResults = (countMap, fallbackTotalVotes) => {
  const totalVotesFromResult = Object.values(countMap).reduce((sum, value) => sum + value, 0);
  const totalVotes = Math.max(totalVotesFromResult, fallbackTotalVotes || 0);

  return {
    totalVotes,
    items: POLL_OPTIONS.map((option) => {
      const voteCount = countMap[option.id] || 0;
      const percent = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;

      return {
        ...option,
        votes: voteCount,
        percent
      };
    })
  };
};

const parseErrorMessage = async (response) => {
  const fallbackMessage = `Yêu cầu thất bại (${response.status}).`;

  try {
    const data = await response.json();
    if (typeof data?.message === 'string' && data.message.trim()) {
      return data.message;
    }
    return fallbackMessage;
  } catch {
    return fallbackMessage;
  }
};

const CHART_COLORS = {
  vinfast: '#c52634',
  bitis: '#db8f1a',
  coolmate: '#f0b22d',
  other: '#7a879a'
};

const VoteChartTooltip = ({ active, payload }) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const data = payload[0]?.payload;
  if (!data) {
    return null;
  }

  return (
    <div className="poll-chart-tooltip">
      <p className="poll-chart-tooltip-title">{data.shortLabel}</p>
      <p className="poll-chart-tooltip-value">{data.votes} vote</p>
      <p className="poll-chart-tooltip-percent">{data.percent}% tổng bình chọn</p>
    </div>
  );
};

const PollSection = () => {
  const [userName, setUserName] = useState('');
  const [selectedVote, setSelectedVote] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isSubmittingVote, setIsSubmittingVote] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState({ type: '', message: '' });
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [resultsError, setResultsError] = useState('');
  const [results, setResults] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const { ref: revealRef, isVisible } = useScrollReveal();

  const selectedOption = useMemo(
    () => POLL_OPTIONS.find((option) => option.id === selectedVote) || null,
    [selectedVote]
  );

  const chartData = useMemo(
    () => results.map((item) => ({
      ...item,
      chartColor: CHART_COLORS[item.id] || '#9aa5b1'
    })),
    [results]
  );

  const fetchVoteResults = async () => {
    setIsLoadingResults(true);
    setResultsError('');

    try {
      const [votesResponse, voteResultsResponse] = await Promise.all([
        fetch(buildApiUrl('/api/votes')),
        fetch(buildApiUrl('/api/votes/results'))
      ]);

      if (!votesResponse.ok) {
        throw new Error(await parseErrorMessage(votesResponse));
      }
      if (!voteResultsResponse.ok) {
        throw new Error(await parseErrorMessage(voteResultsResponse));
      }

      const [votesPayload, voteResultsPayload] = await Promise.all([
        votesResponse.json(),
        voteResultsResponse.json()
      ]);

      const totalVotesFromList = getVoteCountFromListResponse(votesPayload);
      const countMap = getCountMapFromResultResponse(voteResultsPayload);
      const normalizedResults = buildUiResults(countMap, totalVotesFromList);

      setResults(normalizedResults.items);
      setTotalVotes(normalizedResults.totalVotes);
    } catch (error) {
      setResults([]);
      setTotalVotes(0);
      setResultsError(error.message || 'Không tải được kết quả bình chọn.');
    } finally {
      setIsLoadingResults(false);
    }
  };

  const handleSubmitVote = async () => {
    const trimmedName = userName.trim();

    if (!trimmedName) {
      setSubmitFeedback({ type: 'error', message: 'Vui lòng nhập tên trước khi bình chọn.' });
      return;
    }

    if (!selectedOption) {
      setSubmitFeedback({ type: 'error', message: 'Vui lòng chọn một thương hiệu để bình chọn.' });
      return;
    }

    setIsSubmittingVote(true);
    setSubmitFeedback({ type: '', message: '' });

    try {
      const response = await fetch(buildApiUrl('/api/votes'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userName: trimmedName,
          option: selectedOption.apiValue
        })
      });

      if (!response.ok) {
        throw new Error(await parseErrorMessage(response));
      }

      const payload = await response.json().catch(() => ({ message: '' }));
      const successMessage = typeof payload?.message === 'string' && payload.message.trim()
        ? payload.message
        : 'Vote successful';

      setHasVoted(true);
      setUserName('');
      setSubmitFeedback({ type: 'success', message: successMessage });
      await fetchVoteResults();
    } catch (error) {
      setSubmitFeedback({ type: 'error', message: error.message || 'Gửi bình chọn thất bại.' });
    } finally {
      setIsSubmittingVote(false);
    }
  };

  const handleResetAfterVote = () => {
    setHasVoted(false);
    setSelectedVote(null);
    setUserName('');
    setSubmitFeedback({ type: '', message: '' });
    setResults([]);
    setTotalVotes(0);
    setResultsError('');
  };

  useEffect(() => {
    if (submitFeedback.type !== 'error') {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setSubmitFeedback((current) => (current.type === 'error' ? { type: '', message: '' } : current));
    }, 3500);

    return () => window.clearTimeout(timer);
  }, [submitFeedback]);

  return (
    <section ref={revealRef} className={`poll-section container py-20 flex flex-col items-center reveal ${isVisible ? 'is-visible' : ''}`} id="binhchon">
      <div className="poll-header flex justify-between items-center mb-10">
        <h2 className="poll-title font-serif" id="quiz-focus-checkvar-title">
          <span className="text-red">TRẠM "CHECK-VAR":</span><br /> GEN Z CHỌN GÌ?
        </h2>
        <div className="poll-subtitle flex-col gap-4">
          <p>
            Ba thương hiệu tiêu biểu đại diện cho 3 hướng rẽ đổi mới: tái định vị di sản, làm chủ công nghệ lõi và tối ưu tốc độ kinh tế số.
          </p>
          <p className="font-bold text-red">
            Dưới góc nhìn Gen Z, thương hiệu nào thể hiện rõ nhất tinh thần "Đổi mới" và khát vọng tự chủ của Việt Nam?
          </p>
        </div>
      </div>

      <div className="poll-card bg-gray flex flex-col items-center">
        <h3 className="poll-question text-center mb-8">
          Theo bạn, thương hiệu nào dưới đây khiến bạn tự hào nhất về năng lực “Đổi mới” và tinh thần tự chủ của doanh nghiệp Việt?
        </h3>

        <div className="poll-voter-row">
          <input
            className="poll-name-input"
            type="text"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            placeholder="Nhập tên của bạn..."
            maxLength={80}
            disabled={hasVoted || isSubmittingVote}
          />
        </div>

        <div className="poll-options">
          {POLL_OPTIONS.map((option) => (
            <button
              key={option.id}
              className={`btn btn-yellow poll-btn hover-float ${selectedVote === option.id ? 'selected' : ''}`}
              onClick={() => setSelectedVote(option.id)}
              disabled={hasVoted || isSubmittingVote}
            >
              {option.label}
            </button>
          ))}
        </div>

        {selectedVote ? (
          <div className="poll-vote-note text-center">
            Bạn đã chọn: <strong>{POLL_OPTIONS.find((option) => option.id === selectedVote)?.shortLabel}</strong>
          </div>
        ) : null}

        {submitFeedback.message ? (
          <p className={`poll-status-message ${submitFeedback.type === 'error' ? 'is-error' : 'is-success'}`}>
            {submitFeedback.message}
          </p>
        ) : null}

        <div className="poll-actions">
          <button className="btn poll-submit-btn" onClick={handleSubmitVote} disabled={isSubmittingVote || hasVoted}>
            {isSubmittingVote ? 'Đang gửi vote...' : 'Gửi bình chọn'}
          </button>

          {hasVoted ? (
            <button className="btn poll-reset-btn" onClick={handleResetAfterVote}>
              Suy nghĩ lại
            </button>
          ) : null}
        </div>

        {hasVoted ? (
          <div className="poll-results-panel">
            <h4 className="poll-results-title">Kết quả yêu thích hiện tại</h4>
            <p className="poll-results-meta">
              Tổng lượt vote: <strong className="poll-total-value">{totalVotes}</strong>
            </p>

            {isLoadingResults ? <p className="poll-status-message">Đang tải kết quả...</p> : null}

            {resultsError ? <p className="poll-status-message is-error">{resultsError}</p> : null}

            {!isLoadingResults && !resultsError ? (
              <div className="poll-chart-shell">
                <div className="poll-chart-area">
                  <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={chartData} margin={{ top: 16, right: 18, left: 2, bottom: 10 }} barSize={48}>
                      <CartesianGrid strokeDasharray="4 4" stroke="#e6ebf3" vertical={false} />
                      <XAxis
                        dataKey="shortLabel"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: '#334155', fontSize: 13, fontWeight: 600 }}
                      />
                      <YAxis
                        allowDecimals={false}
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: '#64748b', fontSize: 12 }}
                      />
                      <Tooltip content={<VoteChartTooltip />} cursor={{ fill: 'rgba(17, 24, 39, 0.04)' }} />
                      <Bar
                        dataKey="votes"
                        radius={[12, 12, 6, 6]}
                        animationDuration={1050}
                        animationEasing="ease-out"
                        isAnimationActive
                      >
                        {chartData.map((entry) => (
                          <Cell
                            key={entry.id}
                            fill={entry.chartColor}
                            stroke={selectedVote === entry.id ? '#111827' : 'transparent'}
                            strokeWidth={selectedVote === entry.id ? 1.8 : 0}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="poll-results-list">
                  {results.map((item) => (
                    <div key={item.id} className={`poll-result-item ${selectedVote === item.id ? 'is-user-choice' : ''}`}>
                      <div className="poll-result-head">
                        <span className="poll-result-brand">{item.shortLabel}</span>
                        <span className="poll-result-stats">{item.votes} vote ({item.percent}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default PollSection;
