import Loader from '../Loader';
import HelperCard from './HelperCard';
import Pagination from '../Pagination/Pagination';
import { CardContainer } from '../../styles/CardStyle';

const HelperList = ({ list, maxPage, count, currentPage, setCurrentPage }) => {
  return (
    <>
      {list === undefined ? (
        <Loader />
      ) : (
        <>
          <CardContainer>
            {list.map((helper) => {
              return (
                <HelperCard
                  id={helper.id}
                  name={helper.name}
                  img={helper.img}
                  slogan={helper.slogan}
                  key={helper.id}
                />
              );
            })}
          </CardContainer>
          <Pagination
            maxPage={maxPage}
            currentPage={currentPage}
            count={count}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </>
  );
};

export default HelperList;
