import React, { Component } from 'react';
import { ROUTER } from "./utils/router";
import { Routes, Route } from 'react-router-dom';
import Homepage from "./pages/user/homepage";
import MasterLayout from './pages/user/theme/masterLayout';
import ProfilePage from './pages/user/profilePage';
import LoginPage from './pages/user/LoginPage';
import DetailPage from './pages/user/detailpage';
import RegisterPage from './pages/user/registerpage';
import cartpage from './pages/user/cartpage';
import AdminPage from './pages/admin/admindashboard';
import ListProductPage from './pages/admin/Product/listproduct';
import AddProductPage from './pages/admin/Product/addproduct';
import EditProductPage from './pages/admin/Product/editproduct';
import ListUsersPage from './pages/admin/Users/listuserpage';

const renderUserRouter = () => {
  const Routers = [ 
    {
      path: ROUTER.USER.HOME,
      Component: Homepage,
      wrapWithLayout: true // Bao lại Homepage với MasterLayout
    },
    {
      path: `${ROUTER.USER.PROFILE}/:Id`,
      Component: ProfilePage,
      wrapWithLayout: true // Bao lại ProfilePage với MasterLayout
    },
    {
      path: ROUTER.USER.CART,
      Component: cartpage,
      wrapWithLayout: true
    },
    {
      path: ROUTER.USER.LOGIN,
      Component: LoginPage,
      wrapWithLayout: false // Không bao lại LoginPage với MasterLayout
    },
    {
      path: ROUTER.USER.REGISTER,
      Component: RegisterPage,
      wrapWithLayout: false // Không bao lại LoginPage với MasterLayout
    },
    {
      path: `${ROUTER.USER.PRODUCT}/:Id`, // Định nghĩa route cho trang chi tiết sản phẩm
      Component: DetailPage,
      wrapWithLayout: true // Bao lại ProductDetailPage với MasterLayout 
    },
    {
      path: ROUTER.ADMIN.ADMINDASHBOAR,
      Component: AdminPage,
      wrapWithLayout: false 
    },
    {
      path: ROUTER.ADMIN.ADDPRODUCT,
      Component: AddProductPage,
      wrapWithLayout: false 
    },
    {
      path: ROUTER.ADMIN.LISTPRODUCT,
      Component: ListProductPage,
      wrapWithLayout: false 
    },
    {
      path: `${ROUTER.ADMIN.EDITPRODUDCT}/:Id`,
      Component: EditProductPage,
      wrapWithLayout: false 
    },
    {
      path: ROUTER.ADMIN.LISTUSERS,
      Component: ListUsersPage,
      wrapWithLayout: false 
    },

  ];

  return (
    <Routes>
      {Routers.map(({ path, Component, wrapWithLayout }, key) => (
        <Route
          key={key}
          path={path}
          element={wrapWithLayout ? <MasterLayout><Component /></MasterLayout> : <Component />}
        />
      ))}
    </Routes>
  );
};

const RouterCustom = () => {
  return renderUserRouter();
};

export default RouterCustom;
