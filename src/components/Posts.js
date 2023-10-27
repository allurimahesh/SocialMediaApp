import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {Pagination, Grid, Card, Typography, CardContent, TextField, Button, Divider, InputAdornment} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle'; 
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SearchIcon from '@mui/icons-material/Search';

export default function Posts() {

   const navigate = useNavigate(); 
   const [data, setData]= useState([]); 
   const [open, setOpen] = React.useState(false);
   const [openEdit, setOpenEdit] = useState(false);
   const [anchorEl, setAnchorEl] = React.useState(null);
   const openMenu = Boolean(anchorEl);
   const [openDelete, setOpenDelete] = useState();
   const [searchInput, setSearchInput] = useState([]);
   
   const [titleSave, setSaveTitle] = useState('');
   const [descriptionSave, setSaveDescription] = useState('');
   const [title, setTitle] = useState('');
   const [content, setContent] = useState('');
   const [editPost, setEditPost] = useState({});

    const handleLogout = () => {
        navigate('/login')
    }

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClickOpenEdit = () => {
      setTitle(editPost.title);
      setContent(editPost.content);
      setOpenEdit(true);
    }

    const handleClose = () => {
      setOpen(false);
      setAnchorEl(null);
      setSaveTitle('');
      setSaveDescription('');
    };

    const handleCloseEdit= () => {
      setOpenEdit(false);
      setAnchorEl(null);
    }

    const handleClickMenuItem = (event, post) => {
      setEditPost(post);
      setAnchorEl(event.currentTarget);
    };

    const handleOpenDelete = () => {
      setOpenDelete(true); 
    }

    const handleDeleteClose = () => {
      setOpenDelete(false);
      setAnchorEl(null);
    }

    const handleDeletedClose = async () => { 
      try {
        await fetch(`http://localhost:8000/api/posts/${editPost.postId}`, {
          method: 'DELETE',
        });
        getAllposts();
        setOpenDelete(false);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }

    const handleSearch = async (e) => {
      e.preventDefault();
      setSearchInput(e.target.value); 
       if(e.target.value !== ''){
      try {
        const response = await fetch(`http://localhost:8000/api/posts/search/?q=${searchInput}`);
        const data = await response.json(); 
        if( data.message === "No Posts found") {
          setData([]);
        } else {
          setData(data);
        }
        console.log(data) 
      } catch (error) {
        console.log('error in seacrh ')
      }} else {
        getAllposts();
      }
    } 

    const handlePagination = (e) => {
      e.preventDefault(); 
    }

    const handleSavePost = async (e) => {
      e.preventDefault();
      try {
        const data = {
          title: titleSave,
          content: descriptionSave,
        } 
        const response = await fetch('http://localhost:8000/api/posts/', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const posts = await response.json(); 
        getAllposts();
        setSaveTitle('');
        setSaveDescription('');
        setOpen(false);
      } catch (error) {
        console.log(error)
      }
     
    }

    const handleUpdatePost = async (e) => {
      e.preventDefault();
      console.log(title, content);
      const userData = {
        title: title,
        content: content
      }
      try {
        const response = await fetch(`http://localhost:8000/api/posts/${editPost.postId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        getAllposts();
        setOpenEdit(false);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }

    useEffect(() => {
      getAllposts();
        document.title = 'Facebook | Posts';
      }, []
    );

    const getAllposts = async () => {
      try{
        const response = await fetch('http://localhost:8000/api/posts/');
        const data = await response.json(); 
        setData(data);
        setAnchorEl(null);
      } catch(error) {
        console.error('Error fetching posts:', error);
      }
    }

    return(
      <>
        <div className="navbar">
            <a href="/login" onClick={handleLogout}>Logout</a>
        </div>
        <div className="main">
            <div>
            <Grid container spacing={2} style={{marginTop: "10px"}}>
                <Grid item xs={4}>  
                    <h1 style={{textAlign: 'left', color:'#0370d9'}}>Posts</h1>
                </Grid>
                {/* FontFace:' Arial, Helvetica, sans-serif', background: 'linear-gradient(to right, #f32170, #ff6b08, #cf23cf, #eedd44)', '-webkit-text-fill-color': 'transparent', '-webkit-background-clip': 'text' */}
                <Grid item xs={8} style={{textAlign: 'right'}} >  
                    <TextField size="small" id="outlined-basic" variant="outlined" placeholder="Search here...." value={searchInput} onChange={handleSearch} style={{marginRight: "5px"}} InputProps={{
                      endAdornment: (
                        <InputAdornment position="start" >
                          <SearchIcon />
                        </InputAdornment>
                      )
                      }}></TextField>
                    <Button variant="outlined" onClick={handleClickOpen} endIcon={<AddIcon />} style={{marginTop: "2px"}}>Add post</Button>
                </Grid>
            </Grid> 
            </div>
            <div className="body">
            {data.length !== 0
            ? (<Grid container >
            {data && data.map((post) => {
                return (
                    <Grid key={post.id} md={12} style={{paddingBottom: '15px', width: '74rem'}}> 
                    <Card variant="outlined" style={{border: '1px solid #0370d9'}}>
                        <CardContent>
                            <IconButton style={{float: 'right'}}
                              aria-label="more"
                              id="long-button"
                              aria-controls={openMenu ? 'long-menu' : undefined}
                              aria-expanded={openMenu ? 'true' : undefined}
                              aria-haspopup="true"
                              onClick={e => handleClickMenuItem(e, post)}>
                              <MoreHorizIcon style={{color: '#0370d9'}} />
                            </IconButton>
                            <Menu id="long-menu" MenuListProps={{
                                'aria-labelledby': 'long-button',
                              }} anchorEl={anchorEl}  open={openMenu} onClose={handleClose}>
                              <MenuItem key={post.id} onClick={handleClickOpenEdit} style={{color: '#0370d9'}}>Edit <EditIcon style={{color: '#0370d9'}}/></MenuItem>
                              <Divider/>
                              <MenuItem key={post.id} onClick={handleOpenDelete}style={{color: '#0370d9'}}>Delete <DeleteIcon style={{color: '#0370d9'}}/></MenuItem>
                            </Menu>
                            <Typography variant="h6">
                                {post.title}
                            </Typography>
                            <Typography variant="body2" component="p">
                                <p>{post.content}</p>
                            </Typography>
                        </CardContent>
                    </Card> 
                    </Grid>
                        )
                    })}
                </Grid>)
            : ( 
            <Grid md={12} style={{paddingBottom: '15px', textAlign: 'center', width: '74rem'}}> 
            <Card variant="outlined" style={{border: '1px solid #0370d9'}}>
                <CardContent>
                    <Typography variant="h6">
                        No Posts Found
                    </Typography> 
                </CardContent>
            </Card> 
            </Grid>)}
            </div> 
                {/* <Pagination count={10} color="primary" variant="outlined" onChange={handlePagination} /> */}
        </div> 
        <div>
        <Dialog open={open}>
        <DialogTitle style={{color: '#0370d9'}}>Add Post</DialogTitle>
        <Divider style={{color: '#0370d9'}}/>
        <form onSubmit={handleSavePost}>
          <DialogContent>
            <TextField autoFocus margin="dense" id="title" placeholder="Title" label="Title" fullWidth variant="standard" value={titleSave} onChange={event => setSaveTitle(event.target.value)} required/>
            <TextField autoFocus margin="dense" id="description" placeholder="Write Description" label="Description" rows={4} multiline fullWidth variant="standard" value={descriptionSave} onChange={event => setSaveDescription(event.target.value)} required/>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined" endIcon={<CloseIcon />}>Cancel</Button>
            <Button type="submit" variant="outlined" endIcon={<SendIcon />}>Submit</Button>
          </DialogActions>
          </form>
        </Dialog>

        <Dialog open={openEdit}>
        <DialogTitle style={{color: '#0370d9'}}>Update Post</DialogTitle>
            <Divider style={{color: '#0370d9'}}/>
          <form onSubmit={handleUpdatePost}>
          <DialogContent>
            <TextField autoFocus margin="dense" id="title" placeholder="Title" label="Title" fullWidth variant="standard" value={title} onChange={event => setTitle(event.target.value)} required/>
            <TextField autoFocus margin="dense" id="content" placeholder="Write Description"  label="Description" fullWidth rows={4} multiline variant="standard" value={content} onChange={event => setContent(event.target.value)} required/>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEdit} variant="outlined" endIcon={<CloseIcon />}>Cancel</Button>
              <Button type="submit" variant="outlined" endIcon={<SendIcon />}>Update</Button>
            </DialogActions>
          </form>
        </Dialog>
        </div>

        <div>
        <Dialog open={openDelete}>
          <DialogTitle>Delete Post</DialogTitle>
          <Divider style={{color: '#0370d9'}}/>
            <DialogContent>
                <Typography>Are you sure, you want to delete?.</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteClose} variant="outlined" endIcon={<CloseIcon />}>Cancel</Button>
              <Button onClick={handleDeletedClose} variant="outlined" endIcon={<DeleteIcon />}>Yes, Delete</Button>
          </DialogActions>
        </Dialog>
        </div>
      </>
    )

}