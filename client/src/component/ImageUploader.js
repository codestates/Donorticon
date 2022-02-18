import { Container, Input, Wrapper, Button, ButtonSection, Label, Img, DragNDropWrapper, DragNDropContainer } from "../styles/ImageUploaderStyle";
import { useState, useCallback } from 'react';
import { useDropzone } from "react-dropzone";
import { FaFileUpload } from 'react-icons/fa';

const ImageUploader = () => {
  const [uploadedFile, setUploadedFile] = useState('');
  const preview = (event) => {
    const file = event.target.files[0];
    const objectUrl = URL.createObjectURL(file)
    setUploadedFile(objectUrl);
  }

  const { getRootProps, getInputProps, isDragActive} = useDropzone();
  console.log(getInputProps())

  return (
    <Container>
      <Wrapper>    
        {uploadedFile ? <Img src={uploadedFile}></Img> : 
        <div>
          <DragNDropWrapper>
            <FaFileUpload size='5rem'/>
            <div>Drag & Drop</div>
            <div>OR</div>
          </DragNDropWrapper>
          <Label><Input type="file" accept="image/png, image/jpg" onChange={preview}></Input>Click here</Label>
        </div>}
      </Wrapper>
      <ButtonSection>
        <Button>Okay</Button>
        <Button>Cancle</Button>
      </ButtonSection>

      <DragNDropContainer>
        dragNdrop
      <div {...getRootProps()}>
        <input {...getInputProps()} />
      </div>
      </DragNDropContainer>
    </Container>
  )
}

export default ImageUploader;
