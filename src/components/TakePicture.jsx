import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useCallback, useRef, useState } from 'react'
import { Button, Container, FloatingLabel, Form, Modal, Row, Spinner } from 'react-bootstrap';
import secureLocalStorage from 'react-secure-storage';
import Webcam from 'react-webcam';
import { toast } from 'sonner';

function TakePicture({ onHide }) {
  // const [commentText, setCommentText] = useState("");
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [videoConstraints, setVideoConstraints] = useState({
    facingMode: 'user',
  });

  const handleCaptureSubmit = async () => {
    setIsLoading(true);
    try {
      const url = secureLocalStorage.getItem("url") + "user.php";
      const userId = secureLocalStorage.getItem("userId");
      const jsonData = { userId: userId, };

      const formData = new FormData();
      formData.append("operation", "updateProfilePicture");
      formData.append("json", JSON.stringify(jsonData));

      if (capturedImage) {
        const blob = await fetch(capturedImage).then((res) => res.blob());
        const file = new File([blob], "captured-image.jpg", { type: "image/jpeg" });
        console.log("filefilefile", file);
        formData.append('file', file);
      }


      const res = await axios({
        url: url,
        data: formData,
        method: "post",
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      switch (res.data) {
        case 1:
          toast.success("success", "Success!");
          setTimeout(() => {
            onHide();
          }, 1000);
          break;
        case 2:
          toast.danger("You cannot Upload files of this type!");
          break;
        case 3:
          toast.danger("There was an error uploading your file!");
          break;
        case 4:
          toast.danger("Your file is too big (25mb maximum)");
          break;
        default:
          toast.danger("Unsuccessful");
          break;
      }
    } catch (error) {
      toast.error("Network error");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  }, [webcamRef]);

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const switchCamera = () => {
    setVideoConstraints({
      ...videoConstraints,
      facingMode: videoConstraints.facingMode === 'user' ? 'environment' : 'user',
    });
  };

  const handleOnHide = () => {
    onHide();
    setCapturedImage(null);
  }

  return (
    <>
      <Container className='text-center mt-3'>
        {capturedImage ? (
          <img src={capturedImage} alt="Captured" className="img-fluid" />
        ) : (
          <Row className='d-flex  justify-content-center'>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-100"
              videoConstraints={videoConstraints}
            />
          </Row>
        )}
        <Row className='d-flex justify-content-center mt-3'>
          {capturedImage ? (
            <>
              {isLoading ?
                <Container className='text-center mt-2'>
                  <Spinner variant='success' />
                </Container>
                :
                <>
                  {/* <Container className='mt-3 mb-3'>
                          <FloatingLabel label="Add comment">
                            <Form.Control type='text' value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              placeholder='Add comment'
                            />
                          </FloatingLabel>
                        </Container> */}
                  <Button variant='outline-success big-height w-50 me-1' onClick={handleCaptureSubmit}>
                    Submit
                  </Button>
                  <Button variant='outline-danger big-height w-50 mt-2' onClick={handleRetake}>
                    Retake
                  </Button>
                </>
              }
            </>
          ) : (
            <Button variant='outline-success big-height w-50' onClick={capture}>
              Capture Photo
            </Button>
          )}
        </Row>
        {!capturedImage && (
          <Row className='d-flex justify-content-center mt-2'>
            <Button variant='outline-info big-height w-50' onClick={switchCamera}>
              Switch Camera
            </Button>
          </Row>
        )}
      </Container>
    </>
  );
}

export default TakePicture