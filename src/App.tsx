import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage/LoginPage.tsx';
import Layout    from './components/Layout/Layout.tsx';
import StatsPage from './pages/StatsPage/StatsPage.tsx';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* 1) 루트("/")와 "/login"은 무조건 로그인 화면 */}
                <Route path="/"      element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* 2) "/stats"로 진입할 때만 Layout 적용 */}
                <Route path="/stats" element={<Layout />}>
                    {/* Layout 내부에서 index(= "/stats")는 StatsPage */}
                    <Route index element={<StatsPage />} />
                </Route>

                {/* 3) 그 외 모든 경로도 로그인으로 리다이렉트 */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
