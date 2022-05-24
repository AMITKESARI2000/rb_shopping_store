import { useState, useEffect } from 'react';

import {Grid } from '@mui/material';

const Profile = () => {
    // Getting details of the user
    const userData = JSON.parse(localStorage.getItem('profile'));

    return (
        <div className="card__collection clear-fix" style={{ margin: '6em' }}>
            <Grid container>
                <Grid item sm={3} xs={12}>
                    {/* Image of the user  */}
                    <div className="cards cards--two">
                        <img
                            src={userData.dpUrl}
                            className="img-responsive"
                            alt="Cards"
                            style={{ width: '300px' }}
                        />
                        <span
                            className="cards--two__rect"
                            style={{ height: '500px' }}
                        />
                        <span className="cards--two__tri" />
                        <hr></hr>
                        {/* Seller/Buyer of the user  */}
                        {userData.is_seller === 1 ? (
                            <h4 style={{ margin: 0 }}>
                                {userData.user_name}: Seller
                            </h4>
                        ) : (
                            <h4 style={{ margin: 0 }}>
                                {userData.user_name}: Buyer
                            </h4>
                        )}
                        <hr></hr>
                    </div>
                </Grid>
                <Grid item sm={9} xs={12}>
                    <div
                        style={{
                            width: '100%',
                            textAlign: 'right',
                        }}
                    >
                        {/* Name of the user  */}
                        <h5 style={{ margin: 0 }}>Name</h5>
                        <h3 style={{ marginTop: '0.3px', marginBottom: '2%' }}>
                            {userData.user_name}
                        </h3>
                        {/* Email of the user  */}
                        <h5 style={{ margin: 0 }}>Contact</h5>
                        <h3 style={{ marginTop: '0.3px', marginBottom: '2%' }}>
                            {userData.email}
                        </h3>
                        <h3 style={{ marginTop: '0.3px', marginBottom: '2%' }}>
                            {userData.mobile}
                        </h3>
                        {/* Membership of the user  */}
                        <h5 style={{ margin: 0 }}>Membership</h5>
                        <h3 style={{ marginTop: '0.3px', marginBottom: '2%' }}>
                            {userData.membership}
                        </h3>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default Profile;
