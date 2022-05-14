import Template from './template/Template';
import ProductDetail from './products/detail/ProductDetail';
import { Routes, Route } from 'react-router-dom';
import Landing from './landing/Landing';
import ProductList from './products/ProductList';
import Login from './SignIn/login';
import Signup from './SignIn/signup';


function App() {

    return (
        <Template>
            <Routes>
                <Route exact path="/" element={<Landing />} />
                <Route exact path="/products" element={<ProductList />} />
                <Route path="/products/:slug" element={<ProductDetail />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
            </Routes>
        </Template>
    );
}

export default App;
