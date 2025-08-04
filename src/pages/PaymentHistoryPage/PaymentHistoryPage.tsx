import React, { useState } from 'react';
import './PaymentHistoryPage.css';

interface PaymentRecord {
    id: string;
    memberName: string;
    amount: number;
    currency: string;
    method: string;
    date: string;
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
        .split('T')[0], // YYYY-MM-DD
}));

export default function PaymentHistoryPage() {
    const itemsPerPage = 10;
    const totalPages = Math.ceil(dummyData.length / itemsPerPage);

    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = dummyData.slice(startIndex, startIndex + itemsPerPage);

    const goFirst = () => setCurrentPage(1);
    const goPrev  = () => setCurrentPage(p => Math.max(p - 1, 1));
    const goNext  = () => setCurrentPage(p => Math.min(p + 1, totalPages));
    const goLast  = () => setCurrentPage(totalPages);
    const goPage  = (p: number) => setCurrentPage(p);

    return (
        <div className="payment-history-page container py-4">
            <h2 className="mb-4">결제내역</h2>

            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>히스토리ID</th>
                        <th>회원명</th>
                        <th>결제금액</th>
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
                    </tbody>
                </table>
            </div>

            <nav aria-label="페이지 네비게이션">
                <ul className="pagination justify-content-center">
                    <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
                        <button className="page-link" onClick={goFirst}>&laquo;</button>
                    </li>
                    <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
                        <button className="page-link" onClick={goPrev}>&lt;</button>
                    </li>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <li key={i+1} className={`page-item${currentPage === i+1 ? ' active' : ''}`}>
                            <button className="page-link" onClick={() => goPage(i+1)}>{i+1}</button>
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
        </div>
    );
}
