import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Container, Image } from 'react-bootstrap';
import secureLocalStorage from 'react-secure-storage';
import UserPost from '../../components/UserPost';
import { toast } from 'sonner';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useLocation } from 'react-router-dom';
import UpdateProfileModal from '../../modal/UpdateProfileModal';

function UserProfile() {
  const location = useLocation();
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [userDetails, setUserDetails] = useState([]);
  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);
  const openUpdateProfileModal = () => { setShowUpdateProfileModal(true); }
  const hideUpdatProfileeModal = async () => {
    await getProfile();
    await getUserDetails(); 
    setShowUpdateProfileModal(false); 
  }

  const getProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const url = secureLocalStorage.getItem("url") + "user.php";

      const jsonData = {
        userId: userId,
      };

      const formData = new FormData();
      formData.append("operation", "getProfile");
      formData.append("json", JSON.stringify(jsonData));

      const res = await axios.post(url, formData);
      console.log("res nako ni : " + JSON.stringify(res.data));
      if (res.data !== 0) {
        setUserProfile(res.data);
      } else {
        setUserProfile(null);
      }

    } catch (error) {
      toast.error("Network error");
      console.log("error: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const getUserDetails = useCallback(async () => {
    setIsLoading(true);
    try {
      const url = secureLocalStorage.getItem("url") + "user.php";
      const userId = location.state.userId;
      const jsonData = {
        userId: userId
      };
      const formData = new FormData();
      formData.append("json", JSON.stringify(jsonData));
      formData.append("operation", "getUserDetails");
      const res = await axios.post(url, formData);
      console.log("res sa getUserDetails userprofile : " + JSON.stringify(res.data));
      if (res.data !== 0) {
        setUserDetails(res.data);
      }
    } catch {
      toast.error("Network error");
    } finally {
      setIsLoading(false);
    }
  }, [location.state.userId]);


  useEffect(() => {
    getProfile();
    getUserDetails();
    setUserId(location.state.userId);
    window.scrollTo(0, 0);
  }, [getProfile, getUserDetails, location.state.userId]);

  return (
    <div className=' text-white w-full vh-100'>
      <Col className='text-center'>
        <Container className='flex justify-center'>
          <Image
            className='mt-3'
            style={{ maxWidth: 300, maxHeight: 300 }}
            src={secureLocalStorage.getItem("url") + "images/" + userDetails.user_image}
            rounded
          />
        </Container>
        <h5 className='mt-3 mb-3'>{userDetails.user_username}</h5>
        <Button variant='outline-light' onClick={openUpdateProfileModal}>Update profile picture</Button>
      </Col>
      {isLoading ? <LoadingSpinner /> :
        <Container className='p-5 flex justify-center'>
          <Col xs={12} md={7}>
            {userProfile === null && <div className='text-center'><b>No approved post yet</b></div>}
            {userProfile && userProfile.map((userPost, index) => (
              <div key={index} className='mt-3'>
                <UserPost userPost={userPost} />
              </div>
            ))}
          </Col>
        </Container>
      }
      <UpdateProfileModal show={showUpdateProfileModal} onHide={hideUpdatProfileeModal} userId={userId} />
    </div>
  );
}

export default UserProfile;
