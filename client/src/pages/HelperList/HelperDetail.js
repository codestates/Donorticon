import { useParams } from "react-router-dom";
import ImageUploader from "../../component/ImageUploader";
import { Button } from "../../styles/helperDetail/helperDetailStyle";
import { useState } from "react";

const HelperDetail = () => {
  const { id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div>{id}
      <Button onClick={handleModalOpen}>Send Gifticon</Button>
      {isModalOpen ? <ImageUploader handleModalOpen={handleModalOpen} includeMessage='true'></ImageUploader> : null}
    </div>
  );
};

export default HelperDetail;