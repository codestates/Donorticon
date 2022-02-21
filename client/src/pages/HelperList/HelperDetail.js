import { useParams } from "react-router-dom";
import ImageUploader from "../../component/ImageUploader";
import { Button } from "../../styles/helperDetail/helperDetailStyle";
import { useState } from "react";
import { userSlice } from '../../redux/user/userSlice'
import { useSelector } from 'react-redux';


const HelperDetail = () => {
  const { id } = useParams();
  const giverId = useSelector((state) => state.user.user.id);
  console.log(useSelector((state) => state.user));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div>{id}
      <Button onClick={handleModalOpen}>Send Gifticon</Button>
      {isModalOpen ? <ImageUploader handleModalOpen={handleModalOpen} includeMessage='true' api={`/helperlist/${id}`} giverId={giverId} helperId={parseInt(id)} ></ImageUploader> : null}
    </div>
  );
};

export default HelperDetail;