import axios from 'axios';
import React, { useEffect, useState } from 'react'
import secureLocalStorage from 'react-secure-storage';
import { toast } from 'sonner';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';

function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [pendingPost, setPendingPost] = useState([]);
  const navigateTo = useNavigate();

  const getPendingPost = async () => {
    setIsLoading(true);
    try {
      const url = secureLocalStorage.getItem("url") + "admin.php";
      const formData = new FormData();
      formData.append("operation", "getPendingPost");
      const res = await axios.post(url, formData);
      console.log("res.data: ", JSON.stringify(res.data));
      if (res.data !== 0) {
        setPendingPost(res.data);
      } else {
        setPendingPost([]);
      }
    } catch (error) {
      toast.error("Network error!");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (secureLocalStorage.getItem("isAdminLoggedIn") === "true") {
      getPendingPost();
    } else {
      navigateTo("/");
    }
  }, [navigateTo]);

  return (
    <div>
      {isLoading ? <LoadingSpinner /> :
        <>
          {pendingPost.length > 0 ?
            <div className='text-center'>
              {pendingPost.map((post, index) => (
                <Card key={index} className="m-3">
                  <Card.Body>
                  {"mga post "}
                  </Card.Body>
                </Card>
              ))}
            </div>
            :
            <div className='text-center'><b>No pending posts</b></div>
          }
        </>
      }
    </div>
  )
}

export default AdminDashboard