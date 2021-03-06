import Template from './template/Template';
import ProductDetail from './products/detail/ProductDetail';
import { Routes, Route } from 'react-router-dom';
import Landing from './landing/Landing';
import ProductList from './products/ProductList';
import AddProduct from './products/AddProduct/AddProduct';
import Login from './SignIn/Login';
import Logout from './SignIn/Logout';
import Signup from './SignIn/Signup';
import Profile from './Profile/Profile';
import Checkout from './Checkout/CheckoutCart';
import Track from './Checkout/Track';

function App() {
    return (
        <Template>
            <Routes>
                <Route exact path="/products" element={<ProductList />} />
                <Route path="/products/:pid" element={<ProductDetail />} />
                <Route path="/products/add-product" element={<AddProduct />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/logout" element={<Logout />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/profile/:uid" element={<Profile />} />
                <Route exact path="/checkout/:cid" element={<Checkout />} />
                <Route exact path="/checkout/track/:cid" element={<Track />} />
                <Route exact path="/" element={<Landing />} />
            </Routes>
        </Template>
    );
}

export default App;
