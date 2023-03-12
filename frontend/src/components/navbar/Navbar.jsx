import React,{ useState, useEffect } from 'react';
import {AppBar,Toolbar, styled,Typography,Box,Menu,MenuItem,Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
//import IconButton from '@mui/material/IconButton';
import { NavLink,Link} from 'react-router-dom';
import '../../hide.css';
import {logoutUser} from '../../store/actions/authActions';

const Navbar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //alert(JSON.stringify(userInfo));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout= async(e) => {
    e.preventDefault();
    handleClose();
    dispatch(logoutUser());
    
    navigate("/login");

   }
   const onProfile= async(e) => {
      handleClose();
   }
  useEffect(() => {},[userInfo]);
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static">
        <Toolbar>
        <Typography variant='h5'  sx={{ flexGrow: 1 }}><Tabs to="/" style={{fontSize: '25px'}}>MERN with Theincircle.com</Tabs></Typography>
              <Typography variant="h6" sx={{ flexGrow: 9 }}>
              <Tabs to="/student"  className={`${!userInfo ? "mystyle" : ""}`} >All Students</Tabs>
          </Typography> 
              <Tabs color="inherit" reloadDocument to="/login" className={`${userInfo ? "mystyle" : ""}`}>Login</Tabs> 
              <Tabs color="inherit" reloadDocument to="/sign-up" className={`${userInfo ? "mystyle" : ""}`}>Sign Up</Tabs>
              
                  <div className={`${!userInfo ? "mystyle" : ""}`} >
                      
                        <Button 
                          id="basic-button"
                          aria-controls={open ? 'basic-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          onClick={handleClick}
                        ><Tabs >{userInfo && userInfo.name}</Tabs> 
                        </Button>
                        <Menu 
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          MenuListProps={{
                            'aria-labelledby': 'basic-button',
                          }} className={`${!userInfo ? "mystyle" : ""}`}
                        >
                            <MenuItem onClick = {(e) => { onProfile(e);}}>
                              {/* <Link reloadDocument> will try */}
                              <a style={{color:'black',textDecoration: 'none'}} href={`/user-profile/${userInfo && userInfo._id}`} >Profile</a></MenuItem>
                            <MenuItem onClick = {(e) => { onLogout(e);}}>Logout</MenuItem>
                        </Menu>
                  </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar;

const Tabs = styled(NavLink)`
font-size: 15px;
margin-right: 20px;
color:white;
text-decoration:none;
text-transform: capitalize;
`
const ProfileLink = styled(Link)`
color:black;
text-decoration:none;
`