import { useParams } from "react-router-dom";

const HelperDetail = () => {
  const { id } = useParams();

  return (
    <div>{id}</div>
  );
};

export default HelperDetail;