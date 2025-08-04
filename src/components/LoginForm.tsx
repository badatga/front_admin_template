import React, { useState } from 'react';

const DUMMY = { id: 'test', pw: 'test' };

export default function LoginForm() {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const handleLogin = () => {
        if (id === DUMMY.id && pw === DUMMY.pw) {
            alert('로그인 성공');
        } else {
            alert('아이디 또는 비밀번호가 잘못되었습니다.');
        }
    };

    const handleFindPw = () => {
        alert('준비중입니다');
    };

    return (
        <div className="w-100 w-md-50 p-4 border rounded shadow-sm">
            <h3 className="mb-4 text-center">관리자 로그인</h3>

            <div className="mb-3">
                <label htmlFor="loginId" className="form-label">아이디</label>
                <input
                    id="loginId"
                    type="text"
                    className="form-control"
                    value={id}
                    onChange={e => setId(e.target.value)}
                    placeholder="아이디를 입력하세요"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="loginPw" className="form-label">비밀번호</label>
                <input
                    id="loginPw"
                    type="password"
                    className="form-control"
                    value={pw}
                    onChange={e => setPw(e.target.value)}
                    placeholder="비밀번호를 입력하세요"
                />
            </div>

            <div className="d-flex justify-content-between">
                <button type="button" className="btn btn-secondary" onClick={handleFindPw}>
                    비밀번호 찾기
                </button>
                <button type="button" className="btn btn-primary" onClick={handleLogin}>
                    로그인
                </button>
            </div>
        </div>
    );
}
