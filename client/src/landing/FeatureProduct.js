import Image from '../nillkin-case.webp';
import { Link } from 'react-router-dom';
import React from 'react';

const FeatureProduct = ({product}) => {
    return (
        <div className="col">
            <div className="card shadow-sm">
                <img
                    className="card-img-top bg-dark cover"
                    height="240"
                    alt=""
                    src={product.imageUrl}
                />
                <div className="card-body">
                    <h5 className="card-title text-center">
                        {product.prod_name}
                    </h5>
                    <p className="card-text text-center text-muted">Rs. {product.price}</p>
                    <div className="d-grid gap-2">
                        <Link
                            to={`/products/${product.pid}`}
                            className="btn btn-outline-dark"
                            replace
                        >
                            Detail
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureProduct;
