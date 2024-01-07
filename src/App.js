import React from 'react';
import { Helmet } from 'react-helmet';
import { Route, Routes, useLocation } from 'react-router-dom';
import NotFound from './NotFound.jsx';
import Layout from './components/admin/Layout/index.jsx';
import Login from './components/admin/auth/sigin.jsx';
import Banners from './components/admin/banner/Banners.jsx';
import CategoriesCrud from './components/admin/categoriesCrud/Table.jsx';
import Deliveries from './components/admin/deliveries/Table.jsx';
import DiscountTbale from './components/admin/discountCrud/Table.jsx';
import OrderCrud from './components/admin/order/Orders.jsx';
import { default as ProductCrud, default as ProductTable } from './components/admin/productCrud/Table.jsx';
import SubcategorieCom from './components/admin/subCategoriya/TableSub.jsx';
import BaskerPage from './pages/client/basket/index.jsx';
import CategoryIdPage from './pages/client/categorieid/index.jsx';
import HomePage from './pages/client/home/index.jsx';
import ProductPage from './pages/client/product/index.jsx';

function App() {
  const location = useLocation();
  const isClientPage = !location.pathname.startsWith('/admin');
  //TODO ushbu is_admin backend orqali tekshieuv kerak

  const is_admin = localStorage.getItem("token");


  return (
    <>
     
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/categories/:id" element={<CategoryIdPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path='basket' element={<BaskerPage />} />
        <Route path="/admin" element={<Login />} />
        {
          is_admin ? (
            <Route element={<Layout />}>
              <Route path="/admin/home" element={<OrderCrud />} />
              <Route path="/admin/order" element={<OrderCrud />} />
              <Route path="/admin/subcategories" element={<SubcategorieCom />} />
              <Route path="/admin/banners" element={<Banners />} />
              <Route path="/admin/dashbord" element={<ProductTable />} />
              <Route path="/admin/discount" element={<DiscountTbale />} />
              <Route path="/admin/categories" element={<CategoriesCrud />} />
              <Route path="/admin/products" element={<ProductCrud />} />
              <Route path="/admin/deliveries" element={<Deliveries />} />
              {/* <Route path="/admin/order" element={<ProductTable />} /> */}
            </Route>
          ) : null
          // <Route path="/admin/*" element={<Login />} />
        }
        <Route path="/*" element={
          <NotFound is_admin={is_admin} />
        } />
      </Routes>

    </>
  );
}

export default App;
