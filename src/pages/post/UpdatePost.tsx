import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { NotifyAlert } from '../../utils/NotifyAlert';
import { saveToken, saveUserData, getToken } from '../../utils/LocalStorage';
import Input from '../../components/form/Input';
import { useFormik } from 'formik';
import { AddPostValidation } from "./../../validations/PostValidation";
import { useAddPostMutation, useViewPostMutation, useUpdatePostMutation } from '../../store/post/api';
import '../../styles/add-post.scss'
import InfoIcon from '@mui/icons-material/Info';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { storage  } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Post } from "../../utils/AppInterface";



const UpdatePost = () => {

    const { postId } = useParams();
    const [isthumbnailUploading, setIsthumbnailUploading] = useState(false);
    const [isMainPhotoUploading, setIsMainPhotoUploading] = useState(false);
    const [ getPostWithId ] = useViewPostMutation();
    const [postData, setPostData] = useState<any | Post>(null)
 
 
    const navigate = useNavigate()

    useEffect(() => {

        getPost()

    },[]);

    const [ updatePost, {isLoading} ] = useUpdatePostMutation();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        post: '',
        thumbnail: "",
        mainPhoto: "",
        images: "",
        post_id: ''
    });

    const { values, errors, handleSubmit, setFieldValue, touched } = useFormik({
        initialValues: { title: postData?.title, description: postData?.description, post: postData?.post, thumbnail: "", mainPhoto: "", images: "", post_id: '' },
        validationSchema: AddPostValidation,
        onSubmit: () => initRequest()
    })


    const processFirebaseImage =  (data: any, type: string)  => {
        if(data === ""){
            return 
        }   

        if(type == "thumbnail"){
            setIsthumbnailUploading(true)
        }

        if(type == "mainPhoto"){
            setIsMainPhotoUploading(true)
        }

        const storageRef = ref(storage, `files/${data.name}`);
        const uploadTask = uploadBytesResumable(storageRef, data);
    
        uploadTask.on("state_changed",
          (snapshot) => {
            const progress =
              Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            // setProgresspercent(progress);
          },
          (error) => {
            alert(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                if(type == 'thumbnail'){
                    setFieldValue('thumbnail', downloadURL);
                    setIsthumbnailUploading(false)
                    NotifyAlert("thumbnail uploaded successfully", 'success')

                }

                if(type == 'mainPhoto'){
                    setFieldValue('mainPhoto', downloadURL);
                    setIsMainPhotoUploading(false)
                    NotifyAlert("Main photo uploaded successfully", 'success')
                }
            });
          }
        );
    }
   


    const initRequest = () => {
        updatePost(values)
        .unwrap()
        .then((res) => {
            if(res.success){
                NotifyAlert(res.response, 'success')
            }else{
                NotifyAlert(res.response, 'error')
                for (let index = 0; index < res.data.length; index++) {
                    const err = res.data[index];
                    NotifyAlert(err, 'error')
                }
            }
        })
        .catch((e) => {
            if(e.data && e.data !== null){
                NotifyAlert(e.data.message, 'error')
            }else{
                NotifyAlert('No server response, Server error', 'error')
            }
        });
    }



    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setFieldValue(name, value)
    }
    
    const handleFileUpload = (data: any) => {
        const name = data.target.name;
        const value = data.target.value;
        setFieldValue(name, data.target.files[0])
    }
    
 
 const getPost = () => {
    getPostWithId(postId)
     .unwrap()
     .then((res: any) => {
       if(res !== null){
            setFieldValue('title', res.data.title)
            setFieldValue('description', res.data.description)
            setFieldValue('post', res.data.post)
            setFieldValue('post_id', res.data.id)
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




return (
        <>
            <div className='mt-5'>
                <div className='row'>
                    <div className='col-md-3 col-12'></div>
                    <div className='col-md-6 col-12'>

                        <div className='add-post-wrapper'>
                            <div>
                                <h3 className='basic-info'>Add New Post</h3>
                            </div>

                            <div className='row mt-1'>
                                <div className='col-md-12 col-12'>
                                <Input
                                    type="text"
                                    label="Title"
                                    value={values.title}
                                    name="title"
                                    error={Boolean(errors.title)}
                                    errorText={errors.title}
                                    onChange={handleChange}
                                    placeholder="Please enter post title"
                                />
                                </div>
                            </div>

                            <div className='row mt-1'>
                                <div className='col-md-12 col-12'>
                                <Input
                                    type="text"
                                    label="Description"
                                    value={values.description}
                                    name="description"
                                    error={Boolean(errors.description)}
                                    errorText={errors.description}
                                    onChange={handleChange}
                                    placeholder="Please enter post description"
                                />
                                </div>
                            </div>

                            <div className='mt-4'>

                                <div className='upload-btn-wrapper'>
                                    <div>
                                        <label htmlFor="Upload Photo" className='input-label'>Upload Thumbnail</label>
                                        <input
                                            type='file'
                                            id="file"
                                            name="thumbnail"
                                            placeholder="upload thumbnail"
                                            onChange={handleFileUpload}
                                            className='input-text'
                                        />
                                    </div>

                                    <div className='mt-4'>
                                        <button disabled={isthumbnailUploading} onClick={() => {processFirebaseImage(values.thumbnail, 'thumbnail')}} className='btn-block btn btn-primary'>
                                            { !isthumbnailUploading ? <><span>Upload thumbnail</span></>  : <><span><div className="spinner-border text-light spinner-border-sm"></div></span></> }
                                        </button>
                                    </div>
                                </div>

                                {/* {Boolean(errors.photo && errors.photo)  && <><p className="error"> <InfoIcon className='error-icon' /> { errors.photo }</p></> } */}
                                
                            </div>

                            <div className='mt-4'>
                                <div className='upload-btn-wrapper'>
                                    <div>
                                        <label htmlFor="Upload Photo" className='input-label'>Upload Main Photo</label>
                                        <input
                                            type='file'
                                            id="file"
                                            name="mainPhoto"
                                            placeholder="upload main photo"
                                            onChange={handleFileUpload}
                                            className='input-text'
                                        />
                                    </div>
                                    <div className='mt-4'>
                                        <button disabled={isMainPhotoUploading} onClick={() => {processFirebaseImage(values.mainPhoto, 'mainPhoto')}} className='btn-block btn btn-primary'>
                                            { !isMainPhotoUploading ? <><span>Upload main photo</span></>  : <><span><div className="spinner-border text-light spinner-border-sm"></div></span></> }
                                        </button>
                                    </div>
                                </div>
                                {/* {Boolean(errors.photo && errors.photo)  && <><p className="error"> <InfoIcon className='error-icon' /> { errors.photo }</p></> } */}
                            </div>


                            <div className='row mt-3'>
                                <div className='col-md-12 col-12'>
                                    <div className='row mt-3'>
                                        <div className='col-md-12 col-12'>

                                            <CKEditor
                                                editor={ ClassicEditor }
                                                data={values.post}
                                                onReady={ editor => {
                                                
                                                }}
                                                onChange={( event, editor ) => {
                                                        setFieldValue('post', editor.getData())

                                                }}
                                                onBlur={( event, editor ) => {
                                                // console.log( 'Blur.', editor );
                                                }}
                                                onFocus={( event, editor ) => {
                                                ///   console.log( 'Focus.', editor );
                                                }}
                                            />

                                            {/* {Boolean(errors.post)  && <><p className="error"> <InfoIcon className='error-icon' /> { errors.post }</p></> } */}
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className='text-center mt-3'>
                                <button disabled={isLoading} onClick={() => {handleSubmit()}} className='btn-block btn btn-primary'>
                                    { !isLoading ? <><span>Update</span></>  : <><span><div className="spinner-border text-light spinner-border-sm"></div></span></> }
                                </button>
                            </div>
                        </div>


                     
                    </div>
                </div>
            </div>
        </>
)

 



}

export default UpdatePost

