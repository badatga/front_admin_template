// src/pages/PaymentHistoryPage/PaymentHistoryPage.tsx
import React, { useState } from 'react';
import './PaymentHistoryPage.css';

interface PaymentRecord {
    id: string;
    memberName: string;
    amount: number;
    currency: string;
    method: string;
    date: string; // YYYY-MM-DD
}

// 더미 데이터 95건 생성
const dummyData: PaymentRecord[] = Array.from({ length: 95 }, (_, idx) => ({
    id: `txn_${1000 + idx}`,
    memberName: `회원${idx + 1}`,
    amount: Math.floor(Math.random() * 900) + 100,
    currency: ['USD', 'JPY', 'KRW'][idx % 3],
    method: ['Card', 'PayPal', 'Bank'][idx % 3],
    date: new Date(Date.now() - idx * 86400000)
        .toISOString()
        .split('T')[0],
}));

export default function PaymentHistoryPage() {
    const itemsPerPage = 10;

    // 페이지네이션
    const [currentPage, setCurrentPage] = useState(1);

    // 필터 상태
    const [paymentMethodFilter, setPaymentMethodFilter] = useState<string>('');
    const [startDate, setStartDate]                     = useState('');
    const [endDate, setEndDate]                         = useState('');
    const [category, setCategory]                       = useState<'id'|'memberName'|'method'>('memberName');
    const [keyword, setKeyword]                         = useState('');

    // 필터 적용
    const filtered = dummyData.filter(rec => {
        // 결제방법 필터
        if (paymentMethodFilter && rec.method !== paymentMethodFilter) return false;
        // 날짜 필터
        if (startDate && rec.date < startDate) return false;
        if (endDate   && rec.date > endDate)   return false;
        // 카테고리 키워드 필터
        const field = rec[category].toLowerCase();
        if (keyword && !field.includes(keyword.toLowerCase())) return false;
        return true;
    });

    // 페이지네이션 계산
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = filtered.slice(startIndex, startIndex + itemsPerPage);

    // 페이지 이동 핸들러
    const goFirst = () => setCurrentPage(1);
    const goPrev  = () => setCurrentPage(p => Math.max(p - 1, 1));
    const goNext  = () => setCurrentPage(p => Math.min(p + 1, totalPages));
    const goLast  = () => setCurrentPage(totalPages);
    const goPage  = (p: number) => setCurrentPage(p);

    // 검색 실행 시 첫 페이지로
    const applyFilter = () => setCurrentPage(1);

    return (
        <div className="payment-history-page container py-4">
            <h2 className="mb-4">결제내역</h2>

            {/* 결제방법 + 날짜 검색 */}
            <div className="row mb-3 align-items-center">
                {/* 결제방법 필터 (좌측) */}
                <div className="col-auto">
                    <select
                        className="form-select form-select-sm"
                        value={paymentMethodFilter}
                        onChange={e => setPaymentMethodFilter(e.target.value)}
                    >
                        <option value="">ALL</option>
                        <option value="Card">Card</option>
                        <option value="PayPal">PayPal</option>
                        <option value="Bank">Bank</option>
                    </select>
                </div>
                {/* 날짜 필터 (우측) */}
                <div className="col d-flex justify-content-end align-items-center gap-3">
                    <label>
                        시작일
                        <input
                            type="date"
                            className="form-control form-control-sm ms-1"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                        />
                    </label>
                    <label>
                        종료일
                        <input
                            type="date"
                            className="form-control form-control-sm ms-1"
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                        />
                    </label>
                </div>
            </div>

            {/* 테이블 */}
            <div className="table-responsive mb-3">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>히스토리ID</th>
                        <th>회원명</th>
                        <th>금액</th>
                        <th>통화</th>
                        <th>결제방법</th>
                        <th>결제일</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentData.map(rec => (
                        <tr key={rec.id}>
                            <td>{rec.id}</td>
                            <td>{rec.memberName}</td>
                            <td>{rec.amount.toLocaleString()}</td>
                            <td>{rec.currency}</td>
                            <td>{rec.method}</td>
                            <td>{rec.date}</td>
                        </tr>
                    ))}
                    {currentData.length === 0 && (
                        <tr>
                            <td colSpan={6} className="text-center">
                                조회된 내역이 없습니다.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* 페이지네이션 */}
            <nav aria-label="페이지 네비게이션" className="mb-3">
                <ul className="pagination justify-content-center flex-wrap">
                    <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
                        <button className="page-link" onClick={goFirst}>&laquo;</button>
                    </li>
                    <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
                        <button className="page-link" onClick={goPrev}>&lt;</button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <li
                            key={i + 1}
                            className={`page-item${currentPage === i + 1 ? ' active' : ''}`}
                        >
                            <button className="page-link" onClick={() => goPage(i + 1)}>
                                {i + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item${currentPage === totalPages ? ' disabled' : ''}`}>
                        <button className="page-link" onClick={goNext}>&gt;</button>
                    </li>
                    <li className={`page-item${currentPage === totalPages ? ' disabled' : ''}`}>
                        <button className="page-link" onClick={goLast}>&raquo;</button>
                    </li>
                </ul>
            </nav>

            {/* 카테고리 & 키워드 검색 (페이지네이션 아래 중앙 배치) */}
            <div className="row justify-content-center align-items-end filter-row">
                <div className="col-auto d-flex mb-2 mb-md-0">
                    <select
                        className="form-select me-2"
                        value={category}
                        onChange={e => setCategory(e.target.value as any)}
                    >
                        <option value="id">히스토리ID</option>
                        <option value="memberName">회원명</option>
                        <option value="method">결제방법</option>
                    </select>
                    <input
                        type="text"
                        className="form-control me-2"
                        placeholder="검색어 입력"
                        value={keyword}
                        onChange={e => setKeyword(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={applyFilter}>
                        검색
                    </button>
                </div>
            </div>
        </div>
    );
}
