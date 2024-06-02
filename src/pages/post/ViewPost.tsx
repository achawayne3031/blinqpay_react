
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { NotifyAlert } from '../../utils/NotifyAlert';
import { saveToken, saveUserData, getToken, getUserData } from '../../utils/LocalStorage';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useAllPostMutation, useViewPostMutation } from '../../store/post/api';
import { Post } from "../../utils/AppInterface";
import PageLoader from "../../components/loader/PageLoader";
import '../../styles/view-post.scss'


const ViewPost = () => {

  const navigate = useNavigate()
  const { postId } = useParams();
    useEffect(() => {
    

        getPost()
    },[]);

   

    
 const [getPostWithId, { isLoading }] = useViewPostMutation();
 const [postData, setPostData] = useState<any | Post>(null)
 
 
 
 const getPost = () => {
    getPostWithId(postId)
     .unwrap()
     .then((res: any) => {
        console.log(res)
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
        

   

   
  
  const handleEditDialogClose = () => {
    ///setOpenDialogUpdate(false)
  }


  const handleEditDialog = (event: any) => {


  }


return (
        <>
            <div className='mt-5'>
                <div className='container'>
                    <div className='row'>

                        <div className='col-md-2 col-12'></div>
                        { isLoading ? <><PageLoader /></> : 
                            <>
                                <div className='col-md-8 col-12'>
                                    {
                                        <Card>
                                            <Card.Img variant="top" src={postData?.images.main_photo} className='main-photo-content' />
                                            <Card.Body>
                                                <h6 className='title-text'>{postData?.title}</h6>
                                                <Card.Text className='desc-text'>
                                                    {postData?.description}
                                                </Card.Text>
                                                <sub className='sub-text'>posted by <b>{postData?.user.name}</b></sub>

                                                <Card.Text className='post-content-text' dangerouslySetInnerHTML={{ __html: postData?.post }}></Card.Text>
                                            </Card.Body>
                                        </Card>
                                    }
                                </div>
                            </> 
                        }
                    </div>
                </div>
            </div>
        </>
)

 



}

export default ViewPost

