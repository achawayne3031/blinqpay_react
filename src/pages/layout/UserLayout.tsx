import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { saveToken, saveUserData, logUserOut, getToken } from '../../utils/LocalStorage';
import blinqpaylogo from '../../public/images/blinqpaylogo.jpg'
import '../../styles/user-layout.scss'



const UserLayout = () => {

    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
   
    useEffect(() => {
        if(getToken() === null){
            navigate('/')
            setIsAuthenticated(false)
        }else{
            setIsAuthenticated(true)
        }
    });


    const [anchorElSm, setAnchorElSm] = React.useState(null);
    const openSm = Boolean(anchorElSm);
    const handleClickSm = (event: any) => {
        setAnchorElSm(event.currentTarget);
    };

    const handleCloseSm = () => {
        setAnchorElSm(null);
    };

    const processLogout = () => {
        navigate('/')
        logUserOut()
    }

    const processDashboard = () => {
        navigate('/user/overview')
    }

    const processAddPost = () => {
        navigate('/user/add-post')
    }


    


  return (
    <div>
        <div>
            <Navbar sticky="top" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand>
                        <img src={blinqpaylogo} className='img-fluid logo-img' alt="" />
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>

                        {isAuthenticated ? <>
                            <div>
                                <Button className='btn-light'
                                    id="basic-button-user"
                                    aria-controls={openSm ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={openSm ? 'true' : undefined}
                                    onClick={handleClickSm}
                                >
                                <AccountCircleIcon />
                                </Button> 
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorElSm}
                                    open={openSm}
                                    onClose={handleCloseSm}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                    PaperProps={{
                                        style: {
                                        width: '25ch',
                                        },
                                    }}
                                    >


                                    <MenuItem onClick={() => {processDashboard(); handleCloseSm()}}>
                                        <div className="menu-item">
                                            <p className="menu-item-text">All Posts</p>
                                        </div>
                                    </MenuItem>   

                                    <MenuItem onClick={() => {processAddPost(); handleCloseSm()}}>
                                        <div className="menu-item">
                                            <p className="menu-item-text">Add Post</p>
                                        </div>
                                    </MenuItem>   

                                    <MenuItem onClick={() => {processLogout(); handleCloseSm()}}>
                                        <div className="menu-item">
                                            <p className="menu-item-text">Logout</p>
                                        </div>
                                    </MenuItem>   

                                </Menu> 
                            </div>
                        
                        </> : <>      
                            <NavLink className="navbar-item" to="/auth/login">
                                Sign In
                            </NavLink>
                        </> }
                    </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
        <Outlet />
    </div>
  )
}

export default UserLayout