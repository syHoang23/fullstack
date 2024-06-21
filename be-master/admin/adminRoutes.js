const express = require('express');
const { AdminDashboard, AddProduct, EditProduct, Delete } = require('./adminQueries');
const router = express.Router();
router.get('/', async (req, res) => {
    try {
        const admin = await AdminDashboard();
        res.json(admin);
    } catch (error) {
        console.error('Lỗi truy vấn', error);
        res.status(500).json({ error: 'Lỗi truy vấn ' });
    }
});
router.post('/product', async (req, res) => {
    const {MaSach,TenSach,MoTa,AnhBia,NXB,GiaBan } = req.body;
    
    try {
      const result = await AddProduct(TenSach,MoTa,AnhBia,NXB,GiaBan);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm sản phẩm.' });
    }
  });
  router.put('/product/:MaSach', async (req, res) => {
    const { MaSach } = req.params;
    const { TenSach,MoTa,AnhBia,NXB,GiaBan } = req.body;

    try {
        const result = await EditProduct(MaSach,TenSach,MoTa,AnhBia,NXB,GiaBan);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật sản phẩm.' });
    }
});
router.post('/delete-item', async(req, res) => {
  const {MaSach} = req.body;
  try{
    const result = await Delete(MaSach);
    res.status(201).json(result);
    console.log({result })
  } catch (error) {
    res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa sản phẩm.' });
    console.log(error)
  }
});
module.exports = router;