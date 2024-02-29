import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import secureLocalStorage from 'react-secure-storage';
import UserPost from '../../components/UserPost';
import { toast } from 'sonner';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useLocation } from 'react-router-dom';

function UserProfile() {
  const location = useLocation(); 
  const [isLoading, setIsLoading] = useState(false);
  const [userPost, setUserPost] = useState([]);
  const getProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const url = secureLocalStorage.getItem("url") + "user.php";
      const userId = location.state.userId;
      console.log("user id mo to: ", userId);
      const jsonData = {
        userId: userId, 
      };

      const formData = new FormData();
      formData.append("operation", "getProfile");
      formData.append("json", JSON.stringify(jsonData));

      const res = await axios.post(url, formData);
      console.log("res nako ni : " + JSON.stringify(res.data));
      if (res.data !== 0) {
        setUserPost(res.data);
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
      <div className='width'></div>
      {isLoading ? <LoadingSpinner /> :

        <Container>
          <div className='w-full border-[1px] border-[#ffffff]' />
          {userPost.map((userPosts, index) => (
            <Container key={index} className='mt-3'>
              <UserPost
                username={userPosts.user_username}
                userImage={userPosts.user_image}
                title={userPosts.post_title}
                description={userPosts.post_description}
                dateTime={userPosts.post_dateCreated}
                image={userPosts.post_image}
                status={userPosts.post_status}
              />
            </Container>
          ))}
        </Container>

      }
    </>
  )
}

export default UserProfile;
