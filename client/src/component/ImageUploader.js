import { Container, InputImg, InputText, ImgWrapper, Button, ButtonSection, Label, Img, DragNDropWrapper, DragNDropSpace, TxtWrapper } from "../styles/ImageUploaderStyle";
import { useState, useCallback } from 'react';
import { useDropzone } from "react-dropzone";
import { FaFileUpload } from 'react-icons/fa';
import { ModalBackground, ModalFrame } from '../styles/utils/Modal';

const ImageUploader = ( {includeMessage=false, handleModalOpen, api}) => {
  const [uploadedImage, setUploadedImage] = useState('');
  const [message, setMessage] = useState('');
  const preview = (event) => {
    const file = event.target.files[0];
    const objectUrl = URL.createObjectURL(file)
    setUploadedImage(objectUrl);
  }
  const handleMessage = (event) => {
    const text = event.target.value;
    setMessage(text);
  }

  const onDrop = useCallback((acceptedFiles, rejectFiles) => {
    setUploadedImage(URL.createObjectURL(acceptedFiles[0]));
  }, []);
  const { getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: 'image/png, image/jpg, image/jpeg',
  });

  return (
    <ModalBackground>
    <Container>
      <ImgWrapper>    
        {uploadedImage ? <Img src={uploadedImage}></Img> : 
        <div>
          <DragNDropWrapper>
            <div {...getRootProps()}>
            <input {...getInputProps()} />
            <DragNDropSpace>
            <FaFileUpload size='5rem'/>
            {isDragActive ?
              <div>YESSSS DROP IT!</div>:
              <div><p>Drag & Drop</p><p>OR</p></div>}
            </DragNDropSpace>
            </div>
          </DragNDropWrapper>
          <Label><InputImg type="file" accept="image/png, image/jpg, image/jpeg" onChange={preview}></InputImg>Click here</Label>
        </div>}
      </ImgWrapper>
      {includeMessage ?
        <TxtWrapper>
        <div>Please send a message</div>
        <InputText onChange={handleMessage}></InputText>      
        </TxtWrapper> : null
      }
      <ButtonSection>
        <Button>Okay</Button>
        <Button onClick={handleModalOpen}>Cancle</Button>
      </ButtonSection>
    </Container>
    </ModalBackground>
  )
}

export default ImageUploader;
