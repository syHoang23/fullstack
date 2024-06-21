const oracledb = require('oracledb');
const dbConfig = require('../dbConfig');
async function AdminDashboard() {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const customersResult = await connection.execute('SELECT COUNT(*) AS total_customers FROM users');
        const productsResult = await connection.execute('SELECT COUNT(*) AS total_products FROM products');
        const recentActivitiesResult = await connection.execute('SELECT user_name, action from audit_log');
        const recentActivities = recentActivitiesResult.rows.map(row => ({
            userName: row[0],
            action: row[1]
        }));
        return {           
                totalCustomers: customersResult.rows[0][0],
                totalProducts: productsResult.rows[0][0],
                recentAction: recentActivities         
        }
    } catch (error) {
        throw error;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (error) {
                console.error('Lỗi khi đóng kết nối:', error);
            }
        }
    }
}
async function AddProduct(TenSach,MoTa,AnhBia,NXB,GiaBan) {
    let connection;
    try {
      connection = await oracledb.getConnection(dbConfig);
      await connection.execute('INSERT INTO products (TenSach,MoTa,AnhBia,NXB,GiaBan) VALUES (:TenSach,:MoTa,:AnhBia,:NXB,:GiaBan)', 
        {TenSach,MoTa,AnhBia,NXB,GiaBan });
      await connection.commit();
    
      // Giải phóng kết nối
      await connection.close();
    
      return { message: 'Sản phẩm đã được thêm thành công.' };
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm:', error);
      throw error;
    }
  }
  async function EditProduct(MaSach,TenSach,MoTa,AnhBia,NXB,GiaBan) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        await connection.execute(
            `UPDATE products
            SET TenSach = :TenSach,
                MoTa = :MoTa,
                AnhBia = :AnhBia, 
                NXB = :NXB,  
                GiaBan = :GiaBan
            WHERE MaSach = :MaSach`, 
            { MaSach,TenSach,MoTa,AnhBia,NXB,GiaBan}
        );
        await connection.commit();

        // Giải phóng kết nối
        await connection.close();

        return { message: 'Sản phẩm đã được cập nhật thành công.' };
    } catch (error) {
        console.error('Lỗi khi cập nhật sản phẩm:', error);
        throw error;
    }
}
async function Delete(MaSach) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);

        // Thực hiện truy vấn xóa sản phẩm dựa trên cartId
        const result = await connection.execute('DELETE FROM products WHERE MaSach = :MaSach', [MaSach]);
        await connection.commit(); // Commit transaction
        await connection.close(); // Đóng kết nối
        return { message: 'Xóa sản phẩm thành công.' };

        // Kiểm tra số lượng hàng bị ảnh hưởng
      
    } catch (error) {
        console.log('Lỗi khi xóa sản phẩm:', error);
        // Có thể thêm xử lý lỗi khác tại đây, ví dụ: ghi log, báo lỗi, vv.
        return { message: 'Đã xảy ra lỗi khi xóa sản phẩm.' };
    }
}
module.exports = {AdminDashboard, AddProduct, EditProduct, Delete};