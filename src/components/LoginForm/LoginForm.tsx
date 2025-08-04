import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const DUMMY = { id: 'test', pw: 'test' };

export default function LoginForm() {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (id === DUMMY.id && pw === DUMMY.pw) {
            navigate('/stats');           // ← 로그인 성공 시 통계페이지로
        } else {
            alert('아이디 또는 비밀번호가 잘못되었습니다.');
        }
    };
    const handleFindPw = () => alert('준비중입니다');

    return (
        <main className="form-signin w-100 m-auto">
            <h1 className="h3 mb-4 fw-normal text-center">관리자 로그인</h1>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingLoginId"
                       placeholder="아이디" value={id}
                       onChange={e => setId(e.target.value)} />
                <label htmlFor="floatingLoginId">아이디</label>
            </div>
            <div className="form-floating mb-3">
                <input type="password" className="form-control" id="floatingLoginPw"
                       placeholder="비밀번호" value={pw}
                       onChange={e => setPw(e.target.value)} />
                <label htmlFor="floatingLoginPw">비밀번호</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary mb-2" onClick={handleLogin}>
                로그인
            </button>
            <button className="w-100 btn btn-lg btn-outline-secondary" onClick={handleFindPw}>
                비밀번호 찾기
            </button>
            <p className="mt-5 mb-3 text-muted text-center">&copy; 2025</p>
        </main>
    );
}