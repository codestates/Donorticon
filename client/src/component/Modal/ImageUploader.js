import axios from 'axios';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaFileUpload } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setInfo } from '../../redux/gifticon/gifticonSlice';
import {
  ImgUploadContainer,
  InputImg,
  Text,
  ImgWrapper,
  Button,
  Img,
  DragNDropWrapper,
  TxtWrapper,
  DragNDropText,
  DragNDropLabel,
  ButtonWrapper,
} from '../../styles/Modal/ImageUploaderStyle';
import { ModalBackground } from '../../styles/Modal/ModalStyle';

const ImageUploader = ({
  includeMessage = false,
  handleModalOpen,
  api,
  giverId,
  helperId,
  roomId,
  gifticonId,
  type,
  buttonText,
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
      <ImgUploadContainer>
        <ImgWrapper>
          {uploadedImage ? (
            <Img src={uploadedImage}></Img>
          ) : (
            <>
              <DragNDropWrapper {...getRootProps()}>
                <input {...getInputProps()} />
                <>
                  <FaFileUpload size="4rem" />
                  {isDragActive ? (
                    <DragNDropText>드랍해주세요! 🥳</DragNDropText>
                  ) : (
                    <>
                      <DragNDropText>Drag & Drop</DragNDropText>
                      <DragNDropText middle>아니면</DragNDropText>
                    </>
                  )}
                </>
              </DragNDropWrapper>
              <DragNDropLabel>
                <InputImg
                  type="file"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={preview}
                ></InputImg>
                여기를 클릭해주세요
              </DragNDropLabel>
            </>
          )}
        </ImgWrapper>
        {includeMessage && (
          <TxtWrapper>
            <>메세지도 같이 보내실까요?</>
            <Text onChange={handleMessage}></Text>
          </TxtWrapper>
        )}
        <ButtonWrapper>
          {uploadedImage ? (
            <Button onClick={handleSubmit}>
              {buttonText ? buttonText : '기부하기'}
            </Button>
          ) : (
            <Button className="disabled">
              {buttonText ? buttonText : '기부하기'}
            </Button>
          )}
          <Button onClick={handleModalOpen}>다음에하기</Button>
        </ButtonWrapper>
      </ImgUploadContainer>
    </ModalBackground>
  );
};

export default ImageUploader;
