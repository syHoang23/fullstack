import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginComopent = () => {
    const [username, setUsername] = useState(''); // State để lưu tên người dùng
    const [password, setPassword] = useState(''); // State để lưu mật khẩu
    const [error, setError] = useState(null); // State để lưu thông báo lỗi
    const navigate = useNavigate(); // Hook để điều hướng trang

    const handleSubmit = async e => {
        e.preventDefault();
        if (!username || !password) {
            alert('Vui lòng nhập cả tên người dùng và mật khẩu');
            return;
        }
        try {
            const response = await fetch('http://localhost:3002/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                if (data.success) {
                    setError(null);
                    sessionStorage.setItem('USER_ID', data.user[0]);
                    if (data.user[8] === 'admin') {
                        navigate('/admin');
                    } else if (data.user[8] === 'USER') {
                        navigate('/');
                    } else {
                        alert('Lỗi xác thực: Vai trò không hợp lệ');
                    }
                } else {
                    alert('Lỗi: ...' +data.message);
                }
            } else {
                throw new Error('Phản hồi mạng không thành công');
            }
        } catch (error) {
            setError('Lỗi khi đăng nhập');
            console.error('Lỗi khi đăng nhập:', error);
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    PVSH Shop
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Đăng nhập vào tài khoản của bạn
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên người dùng</label>
                                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tên người dùng"
                                    value={username}
                                    id='username'
                                    onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" value={password}
                                    onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Ghi nhớ đăng nhập</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Quên mật khẩu?</a>
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Đăng nhập</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Chưa có tài khoản? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Đăng ký</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginComopent;
