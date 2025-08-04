import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm.tsx';

export default function LoginPage() {
    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="container col-12 col-md-6 col-lg-4">
                <LoginForm />
            </div>
        </div>
    );
}
