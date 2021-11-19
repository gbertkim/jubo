import React, { useState } from 'react'
import './Account.css'
import Password from '../Password/Password'
import DeleteAccount from '../DeleteAccount/DeleteAccount'
export default function Account() {
    const [passwordToggle, setPasswordToggle] = useState(false)
    const [deleteToggle, setDeleteToggle] = useState(false)
    const passwordHandleOpen = () => {
        setPasswordToggle(true);
    }
    const passwordHandleClose = () => {
        setPasswordToggle(false);
    }
    const deleteHandleOpen = () => {
        setDeleteToggle(true);
    }
    const deleteHandleClose = () => {
        setDeleteToggle(false);
    }
    return (
        <div className='Account'>
            <div className='accountContainer'>            
                <h2 className='pageTitle'>Account</h2>
                <ul>
                    <li className='accountList'><button className='accountLink' onClick={passwordHandleOpen}>Change Password</button></li>
                    <li className='accountList'><button className='accountLink' onClick={deleteHandleOpen}>Delete Account</button></li>
                </ul>
            </div>
            {passwordToggle && <Password passwordHandleClose={ passwordHandleClose }/> }
            {deleteToggle && <DeleteAccount deleteHandleClose={ deleteHandleClose }/> }
        </div>
    )
}
