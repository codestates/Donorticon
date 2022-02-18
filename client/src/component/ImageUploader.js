import { Container, Input, Wrapper, Button, ButtonSection, Label, Img, DragNDropWrapper, DragNDropSpace } from "../styles/ImageUploaderStyle";
import { useState, useCallback } from 'react';
import { useDropzone } from "react-dropzone";
import { FaFileUpload } from 'react-icons/fa';

const ImageUploader = (okCallback, cancleCallback, mesage=false) => {
  const [uploadedImage, setUploadedImage] = useState('');
  const preview = (event) => {
    const file = event.target.files[0];
    const objectUrl = URL.createObjectURL(file)
    setUploadedImage(objectUrl);
  }

  const onDrop = useCallback((acceptedFiles, rejectFiles) => {
    console.log("acceptedFiles",URL.createObjectURL(acceptedFiles[0]))
    console.log("rejectFiles", rejectFiles)
    setUploadedImage(URL.createObjectURL(acceptedFiles[0]));
  }, []);
  const { getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: 'image/png, image/jpg, image/jpeg',
  });

  return (
    <Container>
      <Wrapper>    
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
          <Label><Input type="file" accept="image/png, image/jpg, image/jpeg" onChange={preview}></Input>Click here</Label>
        </div>}
      </Wrapper>
      <ButtonSection>
        <Button onClick={okCallback}>Okay</Button>
        <Button onClick={cancleCallback}>Cancle</Button>
      </ButtonSection>
    </Container>
  )
}

export default ImageUploader;
