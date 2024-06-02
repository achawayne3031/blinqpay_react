
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { NotifyAlert } from '../../utils/NotifyAlert';
import { saveToken, saveUserData, getToken, getUserData } from '../../utils/LocalStorage';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useAllPostMutation, useDeletePostMutation, useUpdatePostMutation } from '../../store/post/api';
import { Post } from "../../utils/AppInterface";
import PageLoader from "../../components/loader/PageLoader";
import '../../styles/overview.scss'
import Modal from 'react-bootstrap/Modal';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Input from '../../components/form/Input';
import { useFormik } from 'formik';




const Overview = () => {
    const navigate = useNavigate()
    useEffect(() => {
        getAllPosts()
    },[]);

    const [getPosts, { isLoading }] = useAllPostMutation();
    const [deletePost, ] = useDeletePostMutation();
    const [postData, setPostData] = useState<Post[]>([])
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const handleCloseDeleteDialogo = () => setShowDeleteDialog(false);
    const [handleSelectedPost, setHandleSelectedPost] = useState<any | Post>(null)



 
 
    ///// Delete Post ////////
    const deleteSelectedPost = () => {
        if(handleSelectedPost !== null){
        let postId = handleSelectedPost?.id

        let data = {
            post_id: handleSelectedPost?.id
        }

        deletePost(data)
        .unwrap()
        .then((res: any) => {
            console.log(res)
            if(res.status){
                setShowDeleteDialog(false)
                NotifyAlert(res.response, 'success')
                getAllPosts()
            }
        })
        .catch((e: any) => {
            if(e.data !== null){
            NotifyAlert(e.data.message, 'error')
            }else{
            NotifyAlert('No server response, Server error', 'error')
            }
        });
        }else{
        NotifyAlert('No Post selected', 'error')

        }
    }
 
    //// Get All Posts ////////
    const getAllPosts = () => {
    getPosts(null)
     .unwrap()
     .then((res: any) => {
       if(res !== null){
        setPostData(res.data)
       } 
     })
     .catch((e) => {
       if(e.data !== null){
         NotifyAlert(e.data.message, 'error')
       }else{
         NotifyAlert('No server response, Server error', 'error')
       }
     });
   
    }
        


   
    //// Go to view post ////
  const goToViewPost = (postId: number) => {
    navigate(`/user/view-post/${postId}`)
  }

  
  //// Edit Post /////
  const handleEditDialogClose = () => {
    ///setOpenDialogUpdate(false)
  }


  const handleEditDialog = (postId: number) => {
    navigate(`/user/update-post/${postId}`)

  }



return (
        <>
            <div className='mt-5'>
                <div className='container'>
                    <div className='row'>
                        { isLoading ? <><PageLoader /></> : 
                            <>
                                {
                                    postData.map((item, index) => (
                                        <div key={index} className='col-md-3 col-12'>
                                            <Card style={{ width: '18rem' }}>
                                            <Card.Img variant="top" src={item.images.thumbnail} className='thumbnail-content' />
                                            <Card.Body className='col-wrapper-content'>
                                                <h6 className='title-text'>{item.title}</h6>
                                                <Card.Text className='desc-text'>
                                                    {item.description}

                                                </Card.Text>
                                                <sub className='sub-text'>posted by <b>{item.user.name}</b></sub>
                                                <div className='btn-card-wrapper'>
                                                    <button className="btn btn-secondary custom-btn" onClick={() => { handleEditDialog(item.id)  }}>Edit</button>
                                                    <button className="btn btn-primary custom-btn" onClick={() => { goToViewPost(item.id); }}>view</button>
                                                    {   getUserData().id === item.user_id ?
                                                        <> 
                                                           <button className="btn btn-danger custom-btn" onClick={() => { setShowDeleteDialog(true); setHandleSelectedPost(item)  }}>Delete</button>
                                                        </> :<></>
                                                    }
                                                </div>
                                            </Card.Body>
                                            </Card>
                                        </div>

                                    ))
                                }
                            </> 
                        }
                    </div>
                </div>
            </div>





             {/* Delete Post */}
            <Modal
                show={showDeleteDialog}
                onHide={handleCloseDeleteDialogo}
                backdrop="static"
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                    <Modal.Header closeButton>
                    <Modal.Title>Do you still want to proceed ?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="button-wrapper-proceed">
                            <div>
                                <button className="btn btn-success btn-block" onClick={ () => { deleteSelectedPost() }}>Yes</button>
                            </div>
                            <div>
                            <button className="btn btn-danger btn-block" onClick={handleCloseDeleteDialogo}>No</button>
                            </div>
                        </div>
                    </Modal.Body>
            </Modal>




        </>
)

 



}

export default Overview

