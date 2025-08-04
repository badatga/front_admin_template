// src/components/Sidebar.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

    return (
        <ul className="list-unstyled px-2">
            {/* 통계관리 */}
            <li className="mb-2">
                <Link
                    to="/stats"
                    className="d-flex align-items-center btn btn-toggle w-100"
                >
                    <Home size={20} />
                    {!collapsed && <span className="ms-2">통계관리</span>}
                </Link>
            </li>

            {/* 회원관리 */}
            <li className="mb-2">
                <Link
                    to="/members"
                    className="d-flex align-items-center btn btn-toggle w-100"
                >
                    <Users size={20} />
                    {!collapsed && <span className="ms-2">회원관리</span>}
                </Link>
            </li>

            {/* 결제관리 */}
            <li className="mb-2">
                {collapsed ? (
                    <Link
                        to="/payment/history"
                        className="d-flex align-items-center btn btn-toggle w-100"
                    >
                        <CreditCard size={20} />
                    </Link>
                ) : (
                    <>
                        <button
                            className="d-flex align-items-center btn btn-toggle w-100"
                            data-bs-toggle="collapse"
                            data-bs-target="#payment-collapse"
                            aria-expanded="false"
                        >
                            <CreditCard size={20} />
                            <span className="ms-2">결제관리</span>
                        </button>
                        <div className="collapse" id="payment-collapse">
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
                        </div>
                    </>
                )}
            </li>

            {/* 공지사항 */}
            <li className="mb-2">
                <Link
                    to="/notice"
                    className="d-flex align-items-center btn btn-toggle w-100"
                >
                    <FileText size={20} />
                    {!collapsed && <span className="ms-2">공지사항</span>}
                </Link>
            </li>

            {/* 문의내역 */}
            <li className="mb-2">
                <Link
                    to="/inquiries"
                    className="d-flex align-items-center btn btn-toggle w-100"
                >
                    <MessageSquare size={20} />
                    {!collapsed && <span className="ms-2">문의내역</span>}
                </Link>
            </li>
        </ul>
    );
}
