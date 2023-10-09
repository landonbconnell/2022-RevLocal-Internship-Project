import React from 'react'
import HomePage from './pages/HomePage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Container from '@mui/system/Container'
import LogInPage from './pages/LogInPage'
import ProductPage from './pages/ProductPage'
import PostNewProduct from './pages/PostNewProduct'
import CheckoutPage from './pages/CheckoutPage'
import EditListingPage from './pages/EditListingPage'
import { RegisterUserPage } from './pages/RegisterUserPage'
import SellerPage from './pages/SellerPage'
import StoreSetUpPage1 from './pages/storeSetup/StoreSetUpPage1'
import StoreSetUpPage2 from './pages/storeSetup/StoreSetUpPage2'
import StoreSetUpPage3 from './pages/storeSetup/StoreSetUpPage3'
import StoreSetUpPage4 from './pages/storeSetup/StoreSetUpPage4'
import MyShop from './pages/MyShop'

const App = () => {
  return (
    <Router>
      <Container className="App" maxWidth="xl">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/products/id/:id" element={<ProductPage />} />
          <Route path="/sell" element={<PostNewProduct />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/myProfile" element={<MyShop />} />
          <Route path="/editListing/id/:id" element={<EditListingPage />} />
          <Route path="/registerUser" element={<RegisterUserPage />} />
          <Route path="/shop/:shopId" element={<SellerPage />} />
          <Route path="/setUpShop/1" element={<StoreSetUpPage1 />} />
          <Route path="/setUpShop/2/:shopId" element={<StoreSetUpPage2 />} />
          <Route path="/setUpShop/3/:shopId" element={<StoreSetUpPage3 />} />
          <Route path="/setUpShop/4/:shopId" element={<StoreSetUpPage4 />} />
        </Routes>
      </Container>
    </Router>
  )
}
export default App
