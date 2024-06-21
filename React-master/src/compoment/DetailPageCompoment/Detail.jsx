import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const DetailCompoment= () => {
    const { Id } = useParams(); // Lấy thông tin ID sản phẩm từ URL
    const [product, setProduct] = useState(null); // State để lưu thông tin sản phẩm
    const [quantity, setQuantity] = useState(1); // State để lưu số lượng sản phẩm được chọn
    const USER_ID = sessionStorage.getItem('USER_ID'); // Lấy USER_ID từ sessionStorage để thêm vào giỏ hàng
    useEffect(() => {
        // Hàm fetchProduct sẽ được gọi mỗi khi Id thay đổi
        const fetchProduct = async () => {
            try {
                // Gọi API để lấy thông tin sản phẩm dựa trên Id được truyền từ URL
                const response = await fetch(`http://localhost:3002/products/${Id}`);
                // Kiểm tra nếu response không thành công, ném ra một lỗi
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Chuyển đổi response thành dạng JSON
                const data = await response.json();
                // Cập nhật state product với thông tin sản phẩm lấy được từ API
                setProduct(data);
            } catch (error) {
                // Xử lý lỗi nếu có
                console.error('Error fetching product:', error);
            }
        };
        // Gọi hàm fetchProduct để lấy thông tin sản phẩm khi component được render lần đầu tiên hoặc khi Id thay đổi
        fetchProduct();
    }, [Id]);
    

// Hàm thêm sản phẩm vào giỏ hàng
const addToCart = async () => {
    // Kiểm tra nếu USER_ID đã được xác định từ sessionStorage
    if (USER_ID) {
        try {
            // Gửi yêu cầu POST đến endpoint '/cart/adds' để thêm sản phẩm vào giỏ hàng
            const response = await fetch('http://localhost:3002/cart/adds', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // Dữ liệu gửi đi bao gồm thông tin sản phẩm, số lượng và USER_ID
                body: JSON.stringify({
                    Id: product[0], // Id của sản phẩm
                    user_id: USER_ID, // ID của người dùng đã đăng nhập
                    productname: product[1], // Tên sản phẩm
                    quantity: quantity, // Số lượng sản phẩm được chọn
                    price : product[8], // Giá của sản phẩm
                    img : product[9], // URL hình ảnh của sản phẩm
                    subtotal: product[8] * quantity // Tổng tiền của số lượng sản phẩm được chọn
                })
            });
            // Kiểm tra nếu yêu cầu thành công (status code 200)
            if (response.ok) {
                alert('Sản phẩm được thêm vào giỏ hàng thành công!');
            } else {
                // Hiển thị thông báo lỗi nếu yêu cầu không thành công
                alert('Không thêm được sản phẩm vào giỏ hàng');
            }
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error('Lỗi thêm sản phẩm vào giỏ hàng:', error);
        }
    } else {    
        alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
    }
};

    // Kiểm tra xem sản phẩm đã được tải hay chưa, nếu chưa thì hiển thị thông báo "Loading..."
    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ marginTop: '20px' }} >
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="images p-3">
                            <div className="text-center p-4"> 
                            {/* Hiển thị slideshow của các hình ảnh sản phẩm */}
                            <Slide>
                                <div>
                                    <img id="main-image"  style={{ display: 'block', margin: '0 auto' }}  src={product[3]} width="350" alt={product[3]} /> 
                                </div>
                                <div>
                                    <img id="main-image"  style={{ display: 'block', margin: '0 auto' }}  src={product[3]} width="350" alt={product[3]} /> 
                                </div>
                                <div>
                                    <img id="main-image"  style={{ display: 'block', margin: '0 auto' }}  src={product[3]} width="350" alt={product[3]} /> 
                                </div>
                                <div>
                                    <img id="main-image"  style={{ display: 'block', margin: '0 auto' }}  src={product[3]} width="350" alt={product[3]} /> 
                                </div>
                            </Slide>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="product p-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center"> 
                                    <i className="fa fa-long-arrow-left"></i> <span className="ml-1">Chi Tiết Sản Phẩm</span> 
                                </div> 
                                <i className="fa fa-shopping-cart text-muted"></i>
                            </div>
                            <div className="mt-4 mb-3"> 
                                <span className="text-uppercase text-muted brand">{product[13]}</span>
                                <h5 className="text-uppercase">{product[1]}</h5>
                                <div className="price d-flex flex-row align-items-center"> 
                                    <span className="act-price">{product[5]}đ</span>
                                </div>
                            </div>
                            <div className="specs mt-5">
                                <h6 className="text-uppercase">Mô Tả</h6> 
                                <ul>
                                    <li><strong></strong> {product[2]}</li>
                                    <li><strong>NXB:</strong> {product[4]}</li>
                                </ul>
                            </div>
                            <div className="cart mt-4 align-items-center"> 
                                <div style={{ paddingBottom: '10px' }}>
                                    <label htmlFor="quantity"><strong>Số Lượng:</strong></label>
                                    <input type="number" id="quantity" min="1" value={quantity} onChange={e => setQuantity(parseInt(e.target.value))} />
                                </div>
                                <button onClick={addToCart}  className="btn btn-danger text-uppercase mr-2 px-4">Add to cart</button>

                                <i className="fa fa-heart text-muted"></i> 
                                <i className="fa fa-share-alt text-muted"></i> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );   
};

export default DetailCompoment;
