// src/components/Sidebar/Sidebar.tsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
    Home,
    Users,
    CreditCard,
    FileText,
    MessageSquare
} from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
    collapsed: boolean;
}

export default function Sidebar({ collapsed }: SidebarProps) {
    const navigate = useNavigate();
    const location = useLocation();

    // 결제관리 서브메뉴 열림 상태
    const [paymentOpen, setPaymentOpen] = useState(false);

    // 현재 위치가 /payment/... 면 자동으로 열어두기
    React.useEffect(() => {
        if (location.pathname.startsWith('/payment')) {
            setPaymentOpen(true);
        }
    }, [location.pathname]);

    const onPaymentClick = () => {
        // 토글
        setPaymentOpen(open => !open);
        // 결제내역으로 이동
        navigate('/payment/history');
    };

    return (
        <ul className="list-unstyled px-2">
            {/* 통계관리 */}
            <li className="mb-2">
                <Link to="/stats" className="d-flex align-items-center btn btn-toggle w-100">
                    <Home size={20} />
                    {!collapsed && <span className="ms-2">통계관리</span>}
                </Link>
            </li>

            {/* 회원관리 */}
            <li className="mb-2">
                <Link to="/members" className="d-flex align-items-center btn btn-toggle w-100">
                    <Users size={20} />
                    {!collapsed && <span className="ms-2">회원관리</span>}
                </Link>
            </li>

            {/* 결제관리 */}
            <li className="mb-2">
                {collapsed ? (
                    // 사이드바 접힌 상태: 아이콘만 링크
                    <Link to="/payment/history" className="d-flex align-items-center btn btn-toggle w-100">
                        <CreditCard size={20} />
                    </Link>
                ) : (
                    <>
                        {/* 토글 + 네비게이션 버튼 */}
                        <button
                            className="d-flex align-items-center btn btn-toggle w-100"
                            onClick={onPaymentClick}
                        >
                            <CreditCard size={20} />
                            <span className="ms-2">결제관리</span>
                        </button>

                        {/* 서브메뉴 */}
                        {paymentOpen && (
                            <ul className="btn-toggle-nav list-unstyled ps-4 small">
                                <li className="mb-1">
                                    <Link to="/payment/history" className="link-dark rounded">
                                        결제내역
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/payment/refund" className="link-dark rounded">
                                        환불
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </>
                )}
            </li>

            {/* 공지사항 */}
            <li className="mb-2">
                <Link to="/notice" className="d-flex align-items-center btn btn-toggle w-100">
                    <FileText size={20} />
                    {!collapsed && <span className="ms-2">공지사항</span>}
                </Link>
            </li>

            {/* 문의내역 */}
            <li className="mb-2">
                <Link to="/inquiries" className="d-flex align-items-center btn btn-toggle w-100">
                    <MessageSquare size={20} />
                    {!collapsed && <span className="ms-2">문의내역</span>}
                </Link>
            </li>
        </ul>
    );
}
