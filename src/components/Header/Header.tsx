import React from 'react';
export default function Header() {
    return (
        <nav className="navbar navbar-light bg-white border-bottom">
            <div className="container-fluid">
                {/* 모바일 햄버거 토글 */}
                <button className="btn btn-outline-secondary d-lg-none me-2"
                        data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar"
                        aria-controls="offcanvasSidebar">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <span className="navbar-brand mb-0 h1">관리자페이지</span>
                <div className="ms-auto d-none d-lg-flex align-items-center">
                    <span className="me-3">관리자</span>
                    <button className="btn btn-outline-danger btn-sm">로그아웃</button>
                </div>
            </div>
        </nav>
    );
}
