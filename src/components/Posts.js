import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {Pagination, Grid, Card, Typography, CardContent, TextField, Button, Divider} from '@mui/material';
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

const posts = [{
  id: 0,
  title: 'Alluri Mahesh', 
  description: 'Never is this principle more pertinent than when dealing with type, the bread and butter of Web-borne communication. A well-set paragraph of text is not supposed to wow the reader; the wowing should be left to the idea or observation for which the paragraph is a vehicle.'
},
{
  id: 1,
  title: 'Jhon Clever', 
  description: "Never is this principle more pertinent than when dealing with type, the bread and butter of Web-borne communication. A well-set paragraph of text is not supposed to wow the reader; the wowing should be left to the idea or observation for which the paragraph is a vehicle.The Typography component uses the variantMapping prop to associate a UI variant with a semantic element. It's important to realize that the style of a typography component is independent from the semantic underlying element."
},
{
  id: 2,
  title: 'Mark Zukes', 
  description: "Never is this principle more pertinent than when dealing with type, the bread and butter of Web-borne communication. A well-set paragraph of text is not supposed to wow the reader; the wowing should be left to the idea or observation for which the paragraph is a vehicle.The Typography component uses the variantMapping prop to associate a UI variant with a semantic element. It's important to realize that the style of a typography component is independent from the semantic underlying element."
}]


export default function Posts() {

    const navigate = useNavigate(); 
    const [data, setData]= useState([]); 
    // const [classes, setClasses]= useState();
   // const [renderDate, setRenderDate] = useState();
   const [open, setOpen] = React.useState(false);
   const [openEdit, setOpenEdit] = useState(false);
   const [anchorEl, setAnchorEl] = React.useState(null);
   const openMenu = Boolean(anchorEl);
   const [openDelete, setOpenDelete] = useState();
   const [searchInput, setSearchInput] = useState([]);
   
   const [titleSave, setSaveTitle] = useState('Alluri Mahesh');
   const [descriptionSave, setSaveDescription] = useState('');
   const [title, setTitle] = useState('Alluri Mahesh');
   const [description, setDescription] = useState('');
   const [editPost, setEditPost] = useState({});

    const handleLogout = () => {
        navigate('/login')
    }

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClickOpenEdit = () => {
      setTitle(editPost.title);
      setDescription(editPost.description);
      setOpenEdit(true);
    }

    const handleClose = () => {
      setOpen(false);
      setAnchorEl(null);
      setSaveTitle('Alluri Mahesh');
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
      console.log(editPost.id)
    }

    const handleDeleteClose = () => {
      setOpenDelete(false);
      setAnchorEl(null);
    }

    const handleDeletedClose = () => {
        // req api for delete the post.
    }

    const handleSearch = (e) => {
      e.preventDefault();
      setSearchInput(e.target.value);
    } 

    const handlePagination = (e) => {
      e.preventDefault();
      console.log(e)
    }

    // if (searchInput.length >= 3) {
    //     console.log(searchInput)
    // }

    const handleSavePost = (e) => {
      e.preventDefault();
      console.log(titleSave, descriptionSave);

      setSaveTitle('');
      setSaveDescription('');
    }

    const handleUpdatePost = (e) => {
      e.preventDefault();
      console.log(title, description);
    }

    useEffect(() => {
      setData(posts)        
        document.title = 'Facebook | Posts';
      }, []
    );

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
                    <TextField size="small" id="outlined-basic" variant="outlined" placeholder="Search here...." onChange={handleSearch} value={searchInput} style={{marginRight: "5px"}}></TextField>
                    <Button variant="outlined" onClick={handleClickOpen} endIcon={<AddIcon />} style={{marginTop: "2px"}}>Add post</Button>
                </Grid>
            </Grid> 
            </div>
            <div className="body">
            {data.length !== 0
            ? (<Grid container >
            {data.map((post, i) => {
                return (
                    <Grid key={post.id} style={{paddingBottom: '15px'}}> 
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
                                <p>{post.description}</p>
                            </Typography>
                        </CardContent>
                    </Card> 
                </Grid>
                        )
                    })}
                </Grid>)
            : ('Loading...')}
            </div> 
                <Pagination count={10} color="primary" variant="outlined" onChange={handlePagination} />
        </div> 
        <div>
        <Dialog open={open}>
        <DialogTitle style={{color: '#0370d9'}}>Add Post</DialogTitle>
        <Divider style={{color: '#0370d9'}}/>
        <form onSubmit={handleSavePost}>
          <DialogContent>
            <TextField autoFocus margin="dense" id="title" placeholder="Title" label="Title" fullWidth variant="standard" value={titleSave} onChange={event => setSaveTitle(event.target.value)} required disabled/>
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
            <TextField autoFocus margin="dense" id="title" placeholder="Title" label="Title" fullWidth variant="standard" value={title} onChange={event => setTitle(event.target.value)} required disabled/>
            <TextField autoFocus margin="dense" id="description" placeholder="Write Description"  label="Description" fullWidth rows={4} multiline variant="standard" value={description} onChange={event => setDescription(event.target.value)} required/>
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