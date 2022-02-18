import { useParams } from "react-router-dom";
import ImageUploader from "../../component/ImageUploader";
import { Button } from "../../styles/helperDetail/helperDetailStyle"

const HelperDetail = () => {
  const { id } = useParams();

  return (
    <div>{id}
      <Button>Send Gifticon</Button>
      <ImageUploader></ImageUploader>
    </div>
  );
};

export default HelperDetail;