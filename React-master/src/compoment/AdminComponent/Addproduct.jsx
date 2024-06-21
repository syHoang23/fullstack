import React, { useState } from "react";

const ADDPRODUCT = () => {
    // State để lưu thông tin sản phẩm mới
    const [TenSach, setTenSach] = useState('');
    const [MoTa, setMoTa] = useState('');
    const [AnhBia, setAnhBia] = useState('');
    const [NXB, setNXB] = useState('');
    const [GiaBan, setGiaBan] = useState('');
    const [error, setError] = useState(null);
     // Hàm xử lý khi người dùng nhấn nút "Thêm sản phẩm"
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Kiểm tra các trường bắt buộc
        if (!TenSach || !MoTa || !AnhBia || !NXB || !GiaBan) {
          alert('Please enter all required fields');
          return;
        }
        try {
          const response = await fetch('http://localhost:3002/admin/product', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                TenSach,
                MoTa,
                AnhBia,
                NXB,
                GiaBan
             }),
          });
    
          if (response.ok) {
            // Xử lý sau khi thêm sản phẩm thành công
            console.log('Product added successfully');
            alert('Product added successfully');
            window.location.reload();
          } else {
            alert('Không thể thể thêm sản phẩm vào database');
          }
        } catch (error) {
          setError('Error adding product');
          console.error('Error adding product:', error);
        }
    };
     // Giao diện form để người dùng nhập thông tin sản phẩm mới
    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Add New Product</h2>
           
            <div className="mb-4">
                <label htmlFor="TenSach" className="block text-gray-700 font-semibold mb-2">Tên sản phẩm</label>
                <input type="text" id="TenSach" name="TenSach" value={TenSach} onChange={(e) => setTenSach(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" required />
            </div>
            <div className="mb-4">
                <label htmlFor="MoTa" className="block text-gray-700 font-semibold mb-2">Mô tả:</label>
                <input type="text" id="MoTa" name="MoTa" value={MoTa} onChange={(e) => setMoTa(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
            </div>
            <div className="mb-4">
                <label htmlFor="AnhBia" className="block text-gray-700 font-semibold mb-2">Ảnh bìa:</label>
                <input type="text" id="AnhBia" name="AnhBia" value={AnhBia} onChange={(e) => setAnhBia(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
            </div>
            <div className="mb-4">
                <label htmlFor="NXB" className="block text-gray-700 font-semibold mb-2">Nhà xuất bản:</label>
                <input type="text" id="NXB" name="NXB" value={NXB} onChange={(e) => setNXB(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
            </div>
            <div className="mb-4">
                <label htmlFor="GiaBan" className="block text-gray-700 font-semibold mb-2">Giá:</label>
                <input type="text" id="GiaBan" name="GiaBan" value={GiaBan} onChange={(e) => setGiaBan(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
            </div>
            <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200">Add Product</button>
        </form>
    );
}

export default ADDPRODUCT;
