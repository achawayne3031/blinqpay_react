import * as Yup from 'yup'

export const AddPostValidation = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('description is required'),
    post: Yup.string().required('post is required'),
})


