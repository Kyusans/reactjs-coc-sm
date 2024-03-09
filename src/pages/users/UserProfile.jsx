import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Col, Container, Image } from 'react-bootstrap';
import secureLocalStorage from 'react-secure-storage';
import UserPost from '../../components/UserPost';
import { toast } from 'sonner';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useLocation, useNavigate } from 'react-router-dom';

function UserProfile() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [userDetails, setUserDetails] = useState([]);
  const navigateTo = useNavigate();

  const getProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const url = secureLocalStorage.getItem("url") + "user.php";
      const userId = location.state.userId;

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
  }, [location.state.userId]);

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
  }, [getProfile, getUserDetails, navigateTo]);

  return (
    <div className='bg-zinc-900 text-white w-full vh-100'>
      <Col className='text-center'>
        <Container className='flex justify-center'>
          <Image
            className='mt-3'
            style={{ maxWidth: 100, maxHeight: 100 }}
            src={secureLocalStorage.getItem("url") + "images/" + userDetails.user_image}
            rounded
          />
        </Container>
        <h5>{userDetails.user_username}</h5>
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


    </div>
  );
}

export default UserProfile;
