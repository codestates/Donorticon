import {
  Container,
  InputImg,
  InputText,
  ImgWrapper,
  Button,
  ButtonSection,
  Label,
  Img,
  DragNDropWrapper,
  DragNDropSpace,
  TxtWrapper,
} from '../styles/ImageUploaderStyle';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaFileUpload } from 'react-icons/fa';
import { ModalBackground } from '../styles/utils/Modal';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setInfo } from '../redux/gifticon/gifticonSlice';

const ImageUploader = ({
  includeMessage = false,
  handleModalOpen,
  api,
  giverId,
  helperId,
  roomId,
  gifticonId,
  type,
}) => {
  const dispatch = useDispatch();
  const gifticon = useSelector((state) => state.gifticon);
  const [uploadedImage, setUploadedImage] = useState('');
  const [bucketImage, setBucketImage] = useState('');
  const [message, setMessage] = useState('');
  const preview = (event) => {
    const rawFile = event.target.files[0];
    setBucketImage(rawFile);
    const objectUrl = URL.createObjectURL(rawFile);
    setUploadedImage(objectUrl);
  };
  const handleMessage = (event) => {
    const text = event.target.value;
    setMessage(text);
  };

  //Drag and drop codes
  const onDrop = useCallback((acceptedFiles, rejectFiles) => {
    setUploadedImage(URL.createObjectURL(acceptedFiles[0]));
    setBucketImage(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/png, image/jpg, image/jpeg',
  });

  //Upload images to S3
  const handleSubmit = async () => {
    const { data } = await await axios.post(api, {
      message,
      giverId,
      helperId,
      roomId,
      gifticonId,
      type,
    });
    const url = data.url;
    const imageUrl = data.imageUrl;
    const upload = await axios(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: bucketImage,
    });
    if (upload) {
      handleModalOpen();
      dispatch(setInfo({ ...gifticon, thanksImgUrl: imageUrl }));
    } else {
      alert('Failed at sending image');
    }
  };

  return (
    <ModalBackground>
      <Container>
        <ImgWrapper>
          {uploadedImage ? (
            <Img src={uploadedImage}></Img>
          ) : (
            <div>
              <DragNDropWrapper>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <DragNDropSpace>
                    <FaFileUpload size="5rem" />
                    {isDragActive ? (
                      <div>YESSSS DROP IT!</div>
                    ) : (
                      <div>
                        <p>Drag & Drop</p>
                        <p>OR</p>
                      </div>
                    )}
                  </DragNDropSpace>
                </div>
              </DragNDropWrapper>
              <Label>
                <InputImg
                  type="file"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={preview}
                ></InputImg>
                Click here
              </Label>
            </div>
          )}
        </ImgWrapper>
        {includeMessage ? (
          <TxtWrapper>
            <div>Please send a message</div>
            <InputText onChange={handleMessage}></InputText>
          </TxtWrapper>
        ) : null}
        <ButtonSection>
          {uploadedImage ? (
            <Button onClick={handleSubmit}>Okay</Button>
          ) : (
            <Button disabled="disabled" className="disabled">
              Okay
            </Button>
          )}
          <Button onClick={handleModalOpen}>Cancle</Button>
        </ButtonSection>
      </Container>
    </ModalBackground>
  );
};

export default ImageUploader;
