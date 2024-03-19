import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Card, Col, Image, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import { toast } from 'sonner';
import { formatDate } from './FormatDate';
import DeletePostModal from '../modal/DeletePostModal';
import CommentModal from '../modal/CommentModal';
import GetPostLikers from '../modal/GetPostLikers';
import ViewImage from '../modal/ViewImage';

function UserPost({ userPost }) {
  const [postPoints, setPostpoints] = useState(userPost.likes);
  const [isUserLiked, setIsUserLiked] = useState(false);
  const [isUserPost, setIsUserPost] = useState(false);
  const navigateTo = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const openDeleteModal = () => { setShowDeleteModal(true); }
  const hideDeleteModal = () => { setShowDeleteModal(false); }

  const [showCommentModal, setShowCommentModal] = useState(false);
  const openCommentModal = () => { setShowCommentModal(true); }
  const hideCommentModal = () => { setShowCommentModal(false); }

  const [showPostLikersModal, setShowPostLikersModal] = useState(false);
  const openPostLikersModal = () => { setShowPostLikersModal(true); }
  const hidePostLikersModal = () => { setShowPostLikersModal(false); }

  const [showViewImage, setShowViewImage] = useState(false);
  const openViewImage = () =>{setShowViewImage(true)}
  const hideViewImage = () =>{setShowViewImage(false)}

  const handleHeartPost = async (postId) => {
    try {
      const url = secureLocalStorage.getItem("url") + "user.php";
      const userId = secureLocalStorage.getItem("userId");
      const jsonData = {
        postId: postId,
        userId: userId
      }

      const formData = new FormData();
      formData.append("operation", "heartPost");
      formData.append("json", JSON.stringify(jsonData));
      const res = await axios.post(url, formData);

      if (res.data === 5) {
        setPostpoints(postPoints - 1);
      } else if (res.data === 1) {
        setPostpoints(postPoints + 1);
      } else {
        toast.error("Something wrong");
        console.log("error: ", res.data);
      }
      setIsUserLiked(!isUserLiked);
    } catch (error) {
      alert("Network Error");
      console.log(error);
    }
  }

  const isUserLike = useCallback(async () => {
    try {
      const url = secureLocalStorage.getItem("url") + "user.php";
      const userId = secureLocalStorage.getItem("userId");
      const jsonData = {
        postId: userPost.post_id,
        userId: userId
      }

      const formData = new FormData();
      formData.append("operation", "isUserLiked");
      formData.append("json", JSON.stringify(jsonData));

      const res = await axios.post(url, formData);
      // console.log("res.data userLike", res.data);
      setIsUserLiked(res.data === 1);
    } catch (error) {
      alert("Network error")
      console.log(error);
    }
  }, [userPost.post_id])
  

  function navigateToUser() {
    navigateTo("/user", { state: { userId: userPost.post_userId } })
    // sessionStorage.setItem("selectedProfile", userPost.post_userId);
    // navigateTo("/user");
  }

  useEffect(() => {
    console.log("post mo to", userPost);
    setPostpoints(userPost.likes);
    isUserLike();
    setIsUserPost(userPost.post_userId === secureLocalStorage.getItem("userId"));
  }, [isUserLike, userPost, userPost.likes])

  return (
    <div className='flex justify-center'>
      <Card className='text-white w-full bg-black p-1'>
        <div className='p-3 bg-zinc-950'>
          <Row className='align-items-center mb-2'>
            <Col xs='auto'>
              <Image
                className='clickable'
                onClick={navigateToUser}
                style={{ maxWidth: 55, maxHeight: 100, minHeight: 50, minWidth: 20 }}
                src={secureLocalStorage.getItem("url") + "images/" + userPost.user_image}
                roundedCircle
              />
            </Col>
            <Col>
              <h5 onClick={navigateToUser} className='text-sm clickable'>{userPost.user_username}</h5>
            </Col>
            <Col xs='auto' className='d-flex flex-column align-items-center'>
              <h6 className='w-50 clickable' onClick={openPostLikersModal}>{postPoints}</h6>
              <FontAwesomeIcon icon={faHeart} size='lg' className={`clickable ${isUserLiked ? "text-red-500" : ""}`}
                onClick={() => handleHeartPost(userPost.post_id, userPost.post_userId)}
              />
            </Col>
          </Row>

          <Row className='flex justify-center mt-3'>
            <Col>
              <h5><b>{userPost.post_title}</b></h5>
            </Col>
          </Row>

          {userPost.post_image !== "" && (
            <div className='flex justify-center'>
              <Image
                onClick={openViewImage}
                style={{ maxWidth: 700, maxHeight: 500, minHeight: 100, minWidth: 200 }}
                className='w-100 clickable'
                src={secureLocalStorage.getItem("url") + "images/" + userPost.post_image}
              />
            </div>
          )}
          <p className='mt-3'>{userPost.post_description}</p>
          <Row className='text-secondary'>
            <Col>
              <div>
                <span className='me-2 clickable' onClick={openCommentModal}>
                  Comment
                </span>
                {isUserPost && (
                  <span className='text-start clickable' onClick={openDeleteModal}>Delete</span>
                )}
              </div>
            </Col>
            <Col>
              <p className='text-end'>{formatDate(userPost.post_dateCreated)}</p>
            </Col>
          </Row>

        </div>
      </Card>
      <DeletePostModal show={showDeleteModal} onHide={hideDeleteModal} postId={userPost.post_id} />
      <CommentModal show={showCommentModal} onHide={hideCommentModal} postId={userPost.post_id} />
      <GetPostLikers show={showPostLikersModal} onHide={hidePostLikersModal} postId={userPost.post_id} />
      <ViewImage show={showViewImage} onHide={hideViewImage} fileName={userPost.post_image} />
    </div>
  );
}

export default UserPost;
