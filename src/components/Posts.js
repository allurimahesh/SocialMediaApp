import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {Pagination, Grid, Card, Typography, CardContent, TextField, Button} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Loader from "./loader"; 

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function Posts() {

    const navigate = useNavigate(); 
    const [data, setData]= useState([]); 
    // const [classes, setClasses]= useState();
   // const [renderDate, setRenderDate] = useState();
   const [open, setOpen] = React.useState(false);
   const [loading, setLoading] = useState(false);
   const [menuOpen, setMenuOpen] = React.useState(false);
   const [openEdit, setOpenEdit] = useState(false);

    const handleLogout = () => {
        navigate('/login')
    }

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClickOpenEdit = ()=> {
    setOpenEdit(true)
    }

    const handleClose = () => {
    setOpen(false);
    };

    const handleCloseEdit= () => {
    setOpenEdit(false)
    setMenuOpen(false)
    }

    const handleClickMenu = () => {
        setMenuOpen(true)
    }

    useEffect(() => {
        setLoading(true);
            setLoading(false);
            setData([{
                id: 1,
                title: 'Alluri Mahesh', 
                description: 'Never is this principle more pertinent than when dealing with type, the bread and butter of Web-borne communication. A well-set paragraph of text is not supposed to wow the reader; the wowing should be left to the idea or observation for which the paragraph is a vehicle.'
            },
            {
                id: 2,
                title: 'Alluri Mahesh', 
                description: "Never is this principle more pertinent than when dealing with type, the bread and butter of Web-borne communication. A well-set paragraph of text is not supposed to wow the reader; the wowing should be left to the idea or observation for which the paragraph is a vehicle.The Typography component uses the variantMapping prop to associate a UI variant with a semantic element. It's important to realize that the style of a typography component is independent from the semantic underlying element."
            },
            {
                id: 3,
                title: 'Alluri Mahesh', 
                description: "Never is this principle more pertinent than when dealing with type, the bread and butter of Web-borne communication. A well-set paragraph of text is not supposed to wow the reader; the wowing should be left to the idea or observation for which the paragraph is a vehicle.The Typography component uses the variantMapping prop to associate a UI variant with a semantic element. It's important to realize that the style of a typography component is independent from the semantic underlying element."
            }])        
        document.title = 'Facebook | Posts';
      }, []);

    return(
        <> 
            <div className="navbar">
                <a href="/login" onClick={handleLogout}>Logout</a>
            </div>
            <div className="main">
                <div>
                <Grid container spacing={2} style={{marginTop: "10px"}}>
                    <Grid item xs={4}>  
                        <h1 style={{textAlign: 'left'}}>Posts</h1>
                    </Grid>
                    <Grid item xs={8} style={{textAlign: 'right'}} >  
                        <TextField size="small" id="outlined-basic" variant="outlined" placeholder="Search here...." style={{marginRight: "5px"}}></TextField>
                        <Button variant="outlined" onClick={handleClickOpen} endIcon={<AddIcon />} style={{marginTop: "2px"}}>Add post</Button>
                    </Grid>
                </Grid> 
                </div>
                <div className="body">
                {data.length !== 0
                ? (<Grid container direction="row" >
                {data.map((post) => {
                    return (
                        <Grid post direction="row" key={post.id} md={12} style={{paddingBottom: '15px'}}> 
                        <Card variant="outlined" >
                            <CardContent>
                            <IconButton style={{float: 'right'}}
                            aria-label="more" id="long-button" aria-controls={open ? 'long-menu' : undefined}  aria-expanded={open ? 'true' : undefined}  aria-haspopup="true"  onClick={handleClickMenu} >  <MoreHorizIcon />
                                    </IconButton>
                                    <Menu id="long-menu" open={menuOpen}>
                                        <MenuItem key="edit" onClick={handleClickOpenEdit}>Edit</MenuItem>
                                        <MenuItem key="delete">Delete</MenuItem>
                                    </Menu>
                                <Typography variant="h6">
                                    {post.title}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    <p>{post.description}</p>
                                </Typography>
                            </CardContent>
                        </Card> 
                    </Grid>
                            )
                        })}
                    </Grid>)
                : (<Loader/>)}
                </div> 
                    <Pagination count={10} variant="outlined" shape="rounded" />
            </div> 
            <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button onClick={handleCloseEdit}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
        </>
    )

}