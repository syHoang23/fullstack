import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const EditProductComponent = () => {
    // Lấy Id của sản phẩm từ URL sử dụng useParams
    const { Id } = useParams();
    // State để lưu thông tin sản phẩm và các trường thông tin của sản phẩm
    const [product, setProduct] = useState(null);
    const [TenSach, setTenSach] = useState('');
    const [MoTa, setMoTa] = useState('');
    const [AnhBia, setAnhBia] = useState('');
    const [NXB, setNXB] = useState('');
    const [GiaBan, setGiaBan] = useState('');
    const [error, setError] = useState(null);
    // Sử dụng useEffect để fetch thông tin sản phẩm từ server khi component được render
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3002/products/${Id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProduct(data);
                setTenSach(data[1]);
                setMoTa(data[2]);
                setAnhBia(data[3]);
                setNXB(data[4]);
                setGiaBan(data[5]);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [Id]);
    // Hàm xử lý khi người dùng nhấn nút "Update Product"
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Kiểm tra các trường bắt buộc
        if (!TenSach || !MoTa || !GiaBan || !AnhBia) {
          alert('Please enter all required fields');
          return;
        }
        try {
          const response = await fetch(`http://localhost:3002/admin/product/${Id}`, {
            method: 'PUT',
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
            // Xử lý sau khi chỉnh sửa sản phẩm thành công
            console.log('Product updated successfully');
            alert('Product updated successfully');
          } else {
            alert('Failed to update product');
          }
        } catch (error) {
          setError('Error updating product');
          console.error('Error updating product:', error);
        }
    };
     // Nếu sản phẩm chưa được fetch, hiển thị thông báo "Loading..."
    if (!product) {
        return <div>Loading...</div>;
    }
    // Giao diện form để người dùng chỉnh sửa thông tin sản phẩm
    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Edit Product</h2>
           
            <div className="mb-4">
                <label htmlFor="TenSach" className="block text-gray-700 font-semibold mb-2">Tên sản phẩm:</label>
                <input type="text" id="TenSach" name="TenSach" value={TenSach} onChange={(e) => setTenSach(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" required />
            </div>
            <div className="mb-4">
                <label htmlFor="MoTa" className="block text-gray-700 font-semibold mb-2">Mô tả:</label>
                <input type="text" id="MoTa" name="MoTa" value={MoTa} onChange={(e) => setMoTa(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" required />
            </div>
            <div className="mb-4">
                <label htmlFor="AnhBia" className="block text-gray-700 font-semibold mb-2">Ảnh Bìa:</label>
                <input type="text" id="AnhBia" name="AnhBia" value={AnhBia} onChange={(e) => setAnhBia(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full"  required/>
            </div>
            <div className="mb-4">
                <label htmlFor="NXB" className="block text-gray-700 font-semibold mb-2">Nhà Xuất Bản:</label>
                <input type="text" id="NXB" name="NXB" value={NXB} onChange={(e) => setNXB(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full"  />
            </div>
            <div className="mb-4">
                <label htmlFor="GiaBan" className="block text-gray-700 font-semibold mb-2">Giá:</label>
                <input type="text" id="GiaBan" name="GiaBan" value={GiaBan} onChange={(e) => setGiaBan(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" required />
            </div>
            
            <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200">Update Product</button>
        </form>
    );
}

export default EditProductComponent;
