import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  Typography,
  CardContent,
  TextField,
  Button,
  Divider,
  Pagination,
  Snackbar,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment/moment";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  searchPost,
} from "../Services/post";
import { SearchInput } from "./SearchInput";

export default function Posts() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const [openDelete, setOpenDelete] = useState();
  const [searchInput, setSearchInput] = useState("");

  const [titleSave, setSaveTitle] = useState("");
  const [descriptionSave, setSaveDescription] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editPost, setEditPost] = useState({});
  const [openAlert, setOpenAlert] = useState(false);
  const [perPage, setPerPage] = useState([]);
  const [pagesCount, setPagesCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const handleLogout = () => {
    navigate("/login");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenEdit = () => {
    setTitle(editPost.title);
    setContent(editPost.content);
    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
    setSaveTitle("");
    setSaveDescription("");
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setAnchorEl(null);
  };

  const handleClickMenuItem = (event, post) => {
    console.log(post);
    setEditPost(post);
    setAnchorEl(event.currentTarget);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
    setAnchorEl(null);
  };

  const handleDeletedClose = async () => {
    try {
      // await fetch(`http://localhost:8000/api/posts/${editPost.postId}`, {
      //   method: 'DELETE',
      // });
      deletePost(editPost._id)
        .then((res) => {
          getAllposts();
          setOpenDelete(false);
        })
        .catch((error) => {
          setOpenAlert(true);
        });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    //  if(e.target.value !== ''){
    // try {
    //   // const response = await fetch(`http://localhost:8000/api/posts/search/?q=${searchInput}`);
    //   // const data = await response.json();
    //   searchPost(e.target.value).then(res => {
    //     if( res.data.message === "No Posts found") {
    //       setData([]);
    //       setCurrentPage(1);
    //       setPagesCount(1);
    //     } else {
    //       const fulldata = res.data.reverse()
    //       setData(fulldata);
    //       setPerPage(fulldata.slice(0,10));
    //       setPagesCount(Math.ceil(fulldata.length/10))
    //     }
    //   }).catch( error => {
    //     setOpenAlert(true);
    //   })
    // } catch (error) {
    //   console.log('error in seacrh ')
    // }} else {
    //   getAllposts();
    // }
  };

  const handlePagination = (e, page) => {
    e.preventDefault();
    setCurrentPage(page);
    setPerPage(data.slice(page * 10 - 10, page * 10));
  };

  const handleSavePost = (e) => {
    e.preventDefault();
    try {
      const data = {
        title: titleSave,
        content: descriptionSave,
      };

      // await fetch('http://localhost:8000/api/posts/', {
      //   method: 'POST',
      //   body: JSON.stringify(data),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // });
      createPost(data)
        .then((res) => {
          console.log(res);
          const fulldata = res.data.reverse();
          setData(fulldata);
          setPerPage(fulldata.slice(0, 10));
          setPagesCount(Math.ceil(fulldata.length / 10));
          setAnchorEl(null);
          // getAllposts();
          setSaveTitle("");
          setSaveDescription("");
          setOpen(false);
        })
        .catch((error) => {
          setOpenAlert(true);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatePost = (e) => {
    e.preventDefault();
    const userData = {
      title: title,
      content: content,
    };
    try {
      //  await fetch(`http://localhost:8000/api/posts/${editPost.postId}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(userData),
      // });

      updatePost(userData, editPost._id)
        .then((res) => {
          getAllposts();
          setOpenEdit(false);
        })
        .catch((error) => {
          setOpenAlert(true);
        });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    if (searchInput !== "") {
      try {
        // const response = await fetch(`http://localhost:8000/api/posts/search/?q=${searchInput}`);
        // const data = await response.json();
        searchPost(searchInput)
          .then((res) => {
            if (res.data.message === "No Posts found") {
              setData([]);
              setCurrentPage(1);
              setPagesCount(1);
            } else {
              const fulldata = res.data.reverse();
              setData(fulldata);
              setPerPage(fulldata.slice(0, 10));
              setPagesCount(Math.ceil(fulldata.length / 10));
            }
          })
          .catch((error) => {
            setOpenAlert(true);
          });
      } catch (error) {
        console.log("error in seacrh ");
      }
    } else {
      getAllposts();
    }
  }, [searchInput]);

  useEffect(() => {
    // getAllposts();
    document.title = "OYT | Posts";
  }, []);

  const getAllposts = () => {
    try {
      // const response = await fetch('http://localhost:8000/api/posts/');
      // const data = await response.json();
      getPosts()
        .then((res) => {
          const fulldata = res.data.reverse();
          setData(fulldata);
          setPerPage(fulldata.slice(0, 10));
          setPagesCount(Math.ceil(fulldata.length / 10));
          setAnchorEl(null);
        })
        .catch((error) => {
          setOpenAlert(true);
        });
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleSnackClose = () => {
    setOpenAlert(false);
  };

  const handleClickStudentOpen = () => {
    navigate("/students");
  };

  return (
    <>
      <div className="navbar">
        <a href="/login" onClick={handleLogout}>
          Logout
        </a>
        <h4>Open Your Thoughts (OYT)</h4>
      </div>
      <div className="main">
        <div>
          <Grid container spacing={2} style={{ marginTop: "10px" }}>
            <Grid item xs={4}>
              <h1 style={{ textAlign: "left", color: "#0370d9" }}>Posts</h1>
            </Grid>
            <Grid item xs={8} style={{ textAlign: "right" }}>
              <SearchInput
                searchInput={searchInput}
                handleSearch={handleSearch}
              />
              <Button
                variant="outlined"
                onClick={handleClickOpen}
                endIcon={<AddIcon />}
                style={{ marginTop: "2px", marginRight: "5px" }}
              >
                Add post
              </Button>
              <Button
                variant="outlined"
                onClick={handleClickStudentOpen}
                style={{ marginTop: "2px" }}
              >
                Students
              </Button>
            </Grid>
          </Grid>
        </div>
        <div className="body">
          {data.length !== 0 ? (
            <Grid container>
              {perPage &&
                perPage.map((post) => {
                  return (
                    <Grid
                      key={post.id}
                      md={12}
                      style={{ paddingBottom: "15px", width: "74rem" }}
                    >
                      <Card
                        variant="outlined"
                        style={{ border: "1px solid #0370d9" }}
                      >
                        <CardContent>
                          <IconButton
                            style={{ float: "right" }}
                            aria-label="more"
                            id="long-button"
                            aria-controls={openMenu ? "long-menu" : undefined}
                            aria-expanded={openMenu ? "true" : undefined}
                            aria-haspopup="true"
                            onClick={(e) => handleClickMenuItem(e, post)}
                          >
                            <MoreHorizIcon style={{ color: "#0370d9" }} />
                          </IconButton>
                          <Menu
                            id="long-menu"
                            MenuListProps={{
                              "aria-labelledby": "long-button",
                            }}
                            anchorEl={anchorEl}
                            open={openMenu}
                            onClose={handleClose}
                          >
                            <MenuItem
                              key={post.id}
                              onClick={handleClickOpenEdit}
                              style={{ color: "#0370d9" }}
                            >
                              Edit <EditIcon style={{ color: "#0370d9" }} />
                            </MenuItem>
                            <Divider />
                            <MenuItem
                              key={post.id}
                              onClick={handleOpenDelete}
                              style={{ color: "#0370d9" }}
                            >
                              Delete <DeleteIcon style={{ color: "#0370d9" }} />
                            </MenuItem>
                          </Menu>
                          <Typography
                            variant="h6"
                            style={{ fontWeight: "bold" }}
                          >
                            {post.title}
                          </Typography>
                          <Typography variant="body2" component="p">
                            <p>{post.content}</p>
                          </Typography>
                          <Typography variant="body2" component="p">
                            <p style={{ float: "left" }}>
                              {moment
                                .utc(post.createdAt)
                                .local()
                                .startOf("seconds")
                                .fromNow()}
                            </p>
                          </Typography>
                          <Typography variant="body2" component="p">
                            <p
                              style={{
                                float: "right",
                                fontStyle: "italic",
                                color: "#0370D9",
                              }}
                            >
                              ~ Alluri Mahesh
                            </p>
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
            </Grid>
          ) : (
            <Grid
              md={12}
              style={{
                paddingBottom: "15px",
                textAlign: "center",
                width: "74rem",
              }}
            >
              <Card variant="outlined" style={{ border: "1px solid #0370d9" }}>
                <CardContent>
                  <Typography variant="h6">No Posts Found</Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
        </div>
        <Pagination
          style={{ float: "right" }}
          count={pagesCount}
          page={currentPage}
          color="primary"
          variant="outlined"
          onChange={handlePagination}
        />
      </div>
      <div>
        <Dialog open={open}>
          <DialogTitle style={{ color: "#0370d9" }}>Add Post</DialogTitle>
          <Divider style={{ color: "#0370d9" }} />
          <form onSubmit={handleSavePost}>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                placeholder="Title"
                label="Title"
                fullWidth
                variant="standard"
                value={titleSave}
                onChange={(event) => setSaveTitle(event.target.value)}
                required
              />
              <TextField
                autoFocus
                margin="dense"
                id="description"
                placeholder="Write Description"
                label="Description"
                rows={4}
                multiline
                fullWidth
                variant="standard"
                value={descriptionSave}
                onChange={(event) => setSaveDescription(event.target.value)}
                required
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose}
                variant="outlined"
                endIcon={<CloseIcon />}
              >
                Cancel
              </Button>
              <Button type="submit" variant="outlined" endIcon={<SendIcon />}>
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        <Dialog open={openEdit}>
          <DialogTitle style={{ color: "#0370d9" }}>Update Post</DialogTitle>
          <Divider style={{ color: "#0370d9" }} />
          <form onSubmit={handleUpdatePost}>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                placeholder="Title"
                label="Title"
                fullWidth
                variant="standard"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
              <TextField
                autoFocus
                margin="dense"
                id="content"
                placeholder="Write Description"
                label="Description"
                fullWidth
                rows={4}
                multiline
                variant="standard"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                required
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseEdit}
                variant="outlined"
                endIcon={<CloseIcon />}
              >
                Cancel
              </Button>
              <Button type="submit" variant="outlined" endIcon={<SendIcon />}>
                Update
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>

      <div>
        <Dialog open={openDelete}>
          <DialogTitle>Delete Post</DialogTitle>
          <Divider style={{ color: "#0370d9" }} />
          <DialogContent>
            <Typography>Are you sure, you want to delete?.</Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleDeleteClose}
              variant="outlined"
              endIcon={<CloseIcon />}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeletedClose}
              variant="outlined"
              endIcon={<DeleteIcon />}
            >
              Yes, Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="warning" sx={{ width: "100%" }}>
          Something went wrong, Please try again!.
        </Alert>
      </Snackbar>
    </>
  );
}
