import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage            from './pages/LoginPage/LoginPage';
import Layout               from './components/Layout/Layout';
import StatsPage            from './pages/StatsPage/StatsPage';
import MembersPage          from './pages/MembersPage/MembersPage';
import PaymentHistoryPage   from './pages/PaymentHistoryPage/PaymentHistoryPage';
import PaymentRefundPage    from './pages/PaymentRefundPage/PaymentRefundPage';
import NoticePage           from './pages/NoticePage/NoticePage';
import InquiriesPage        from './pages/InquiriesPage/InquiriesPage';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* 로그인 화면만 전체 화면 */}
                <Route path="/"      element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginPage />} />

                {/* Layout (헤더+사이드바) 아래 보호 페이지들 */}
                <Route element={<Layout />}>
                    <Route path="stats"            element={<StatsPage />} />
                    <Route path="members"          element={<MembersPage />} />
                    <Route path="payment/history"  element={<PaymentHistoryPage />} />
                    <Route path="payment/refund"   element={<PaymentRefundPage />} />
                    <Route path="notice"           element={<NoticePage />} />
                    <Route path="inquiries"        element={<InquiriesPage />} />
                </Route>

                {/* 그 외는 모두 로그인으로 */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
