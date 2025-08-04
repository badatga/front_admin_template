import React, { useState } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import './Layout.css';

export default function Layout() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="layout-root">
            <Header />

            <div className="container-fluid">
                <div className="row">
                    {/* PC 사이드바: always col-12 on mobile, col-2 on lg */}
                    <nav
                        className={`sidebar col-12 col-lg-2 d-none d-lg-flex flex-column vh-100 overflow-auto ${collapsed ? 'nav-sidebar-collapsed' : ''}`}
                        style={{ width: collapsed ? '4rem' : undefined }}
                    >
                        <div className="d-flex justify-content-end p-2">
                            <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => setCollapsed(prev => !prev)}
                            >
                                {collapsed ? '▶' : '◀'}
                            </button>
                        </div>
                        <Sidebar collapsed={collapsed} />
                    </nav>

                    {/* 모바일 오프캔버스 (unchanged) */}

                    {/* 메인 컨텐츠: col-12 on mobile, col-10 on lg */}
                    <main className="col-12 col-lg-10 py-4">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}