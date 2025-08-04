// src/components/Layout.tsx
import React, { useState } from 'react';
import Header from '../Header/Header.tsx';
import Sidebar from '../Sidebar/Sidebar.tsx';
import { Outlet } from 'react-router-dom';
import './Layout.css';

export default function Layout() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            <Header />

            <div className="container-fluid">
                <div className="row">
                    {/* PC 사이드바 */}
                    <nav
                        className={`d-none d-lg-flex flex-column bg-light vh-100 overflow-auto ${collapsed ? 'nav-sidebar-collapsed' : ''}`}
                        style={{ width: collapsed ? '4rem' : '16rem' }}
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

                    {/* 모바일 오프캔버스 */}
                    <div
                        className="offcanvas offcanvas-start"
                        tabIndex={-1}
                        id="offcanvasSidebar"
                    >
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title">메뉴</h5>
                            <button
                                type="button"
                                className="btn-close text-reset"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                            />
                        </div>
                        <div className="offcanvas-body">
                            <Sidebar collapsed={false} />
                        </div>
                    </div>

                    {/* 메인 컨텐츠 */}
                    <main className="col-12 col-lg-10 ms-lg-auto py-4">
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    );
}
