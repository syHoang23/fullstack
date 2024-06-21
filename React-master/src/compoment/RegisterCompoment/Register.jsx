import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterComponent = () => {
  const [username, setUsername] = useState(''); // State lưu trữ tên người dùng
  const [password, setPassword] = useState(''); // State lưu trữ mật khẩu
  const [confirmPassword, setConfirmPassword] = useState(''); // State lưu trữ xác nhận mật khẩu
  const [error, setError] = useState(null); // State lưu trữ thông báo lỗi
  const navigate = useNavigate(); // Hook để điều hướng trang

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password || !confirmPassword) {
      alert('Vui lòng nhập tất cả các trường bắt buộc!'); // Hiển thị thông báo lỗi nếu thiếu trường thông tin
      return;
    }
    if (password !== confirmPassword) {
      alert('Mật khẩu không trùng khớp!'); // Hiển thị thông báo lỗi nếu mật khẩu không khớp
      return;
    }
    try {
      const response = await fetch('http://localhost:3002/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        navigate('/login'); // Điều hướng đến trang đăng nhập sau khi đăng ký thành công
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      setError('Error registering account'); // Hiển thị thông báo lỗi nếu có lỗi khi đăng ký
      console.error('Error registering account:', error);
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
              Tạo Tài Khoản
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên người dùng</label>
                <input type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your username" value={username}
                  onChange={(e) => setUsername(e.target.value)} required="" />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                <input type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={password}
                  onChange={(e) => setPassword(e.target.value)} required="" />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Xác nhận mật khẩu</label>
                <input type="password" id="confirmPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)} required="" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                  </div>
                </div>
              </div>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Đăng Ký</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Đã có tài khoản? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Đăng Nhập</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterComponent;
