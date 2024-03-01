import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Card, Col, Container, Image } from 'react-bootstrap';
import secureLocalStorage from 'react-secure-storage';
import UserPost from '../../components/UserPost';
import { toast } from 'sonner';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useLocation } from 'react-router-dom';

function UserProfile() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

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
      }

    } catch (error) {
      toast.error("Network error");
      console.log("error: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [location.state.userId]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <>
      {isLoading ? <LoadingSpinner /> :
        <Container className='p-5 flex justify-center'>
          <Col xs={12} md={7}>
            {userProfile && userProfile.map((userPost, index) => (
              <div key={index} className='mt-3'>
                <UserPost
                  username={userPost.user_username}
                  userImage={userPost.user_image}
                  title={userPost.post_title}
                  description={userPost.post_description}
                  dateTime={userPost.post_dateCreated}
                  image={userPost.post_image}
                  status={userPost.post_status}
                />
              </div>
            ))}
          </Col>
          <Col xs={12} md={3} className='position-fixed end-0 p-5'>
            {userProfile && (
              <Card className='mt-3 text-white bg-black'>
                <Container className='bg-zinc-900 p-4'>
                  <Image src={secureLocalStorage.getItem("url") + "images/" + userProfile[0].user_image} />
                </Container>
                <Card.Body className='bg-zinc-900'>
                  <h5>{userProfile[0].user_username}</h5>
                </Card.Body>
              </Card>
            )}
          </Col>

        </Container>
      }
    </>
  );
}

export default UserProfile;
