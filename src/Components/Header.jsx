import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../utils/getAllUsers';
import { useUser } from '../Contexts/UserContext';

const Header = () => {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const { user, signOut } = useUser();

    useEffect(() => {
        setIsLoading(true);
        getAllUsers()
            .then((data) => {
                setUsers(data.users);
            })
            .then(() => {
                setIsLoading(false);
            });
    }, [])

    return isLoading ? <p>Loading...</p> : (
        <div className="header">
            <h1>NC News</h1>
            <div className='user-header'>
                {user ? (
                    <>
                        <div className="user-info">
                            <img src={user.avatar_url} className='user-img-header' />
                            <div className="user-text">
                                <p className='logged-in-msg'>You're Logged In As</p>
                                <p className='user-logged-in'>{user.username}</p>
                            </div>
                        </div>
                        <button className="sign-out" onClick={signOut}>Sign Out</button>
                    </>
                ) : (
                    <button className='sign-out' onClick={() => {
                        window.location.href = '/users';
                    }}>Sign In</button>
                )}
            </div>
        </div>
    );
}

export default Header;