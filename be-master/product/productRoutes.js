const express = require('express');
const router = express.Router();
const { queryProduct1, queryProductById } = require('./productQueries');

router.get('/', async (req, res) => {
    try {
        const products = await queryProduct1();
        res.json(products);
    } catch (error) {
        console.error('Lỗi truy vấn product1:', error);
        res.status(500).json({ error: 'Lỗi truy vấn product1' });
    }
});

router.get('/:MaSach', async (req, res) => {
    const MaSach = req.params.MaSach;
    try {
        const product = await queryProductById(MaSach);
        if (!product) {
            return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
        }
        res.json(product);
    } catch (error) {
        console.error(`Lỗi truy vấn sản phẩm ${MaSach}:`, error);
        res.status(500).json({ error: `Lỗi truy vấn sản phẩm ${MaSach}` });
    }
});

module.exports = router;
