import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetCameraImage, selectCameraImage } from './features/cameraSlice';
import CloseIcon from '@material-ui/icons/Close'
import './Preview.css';
import { useDispatch } from 'react-redux';
import TextFieldsIcon from '@material-ui/icons/TextFields'
import CreateIcon from '@material-ui/icons/Create'
import NoteIcon from '@material-ui/icons/Note'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import CropIcon from '@material-ui/icons/Crop'
import TimerIcon from '@material-ui/icons/Timer'
import SendIcon from '@material-ui/icons/Send'
import {v4 as uuid} from 'uuid'
import {getDownloadURL, ref, uploadString} from 'firebase/storage'
import { colRef, storage } from './Firebase';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { selectUser } from './features/appSlice';

export default function Preview() {
    const cameraImage = useSelector(selectCameraImage)
    const user = useSelector(selectUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if(!cameraImage) {
            navigate('/', {replace:true})
        }
    }, [cameraImage,navigate])

    const closePreview = () => {
        dispatch(resetCameraImage())
    }

    const sendPost = () => {
        const id = uuid()
        const imageRef = ref(storage, `images/${id}`)
        uploadString(imageRef, cameraImage, 'data_url').then((snapshot) => {
            getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(url => {
                addDoc(colRef, {
                    imageUrl: url,
                    username: user.username,
                    read: false,
                    timestamp: serverTimestamp(),
                    profilePic: user.profilePic
                })
                navigate('/chats', {replace:true})
            })
        })
    }

    return (
        <div className='preview'>
            <CloseIcon className='preview__close' onClick={closePreview} />
            <div className="preview__toolbarRight">
                <TextFieldsIcon />
                <CreateIcon />
                <NoteIcon />
                <MusicNoteIcon />
                <AttachFileIcon />
                <CropIcon />
                <TimerIcon />
            </div>
            <img src={cameraImage} alt="" />
            <div className="preview__footer" onClick={sendPost}>
                <h2>Send Now</h2>
                <SendIcon className='preview__sendIcon' fontSize='small' />
            </div>
        </div>
    )
}
