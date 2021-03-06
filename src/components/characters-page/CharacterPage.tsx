import { useEffect } from 'react';
import { SelfCharactersCardsList } from '../self-cards-list';
import { ApiRoutesEnum, GlobalStore } from '../../models';
import { api } from '../../utils';
import { characterActions } from '../../store';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { Header } from '../header';


const CharacterCardsPage: React.FC = () => {
  const dispatch = useDispatch();

  const allCharacters = useSelector((state: GlobalStore) => state.characters.allCharacters);
  const totalPages = useSelector((state: GlobalStore) => state.characters.allCharacters.info.pages);
  const location = useLocation();
  
  const currentPage = +location.pathname.split('page=')[1];
  console.log(location);


  useEffect(() => {
    async function fetchData() {
      const res = await api.getAllCharacters(ApiRoutesEnum.getCh, currentPage);

      if (res) {
        dispatch(characterActions.setAllCharacters(res));
      }
    }
    if (!allCharacters.results.length) {
      fetchData();
    }
  }, [currentPage])

  if (!allCharacters.results.length) {
    return (
      <div className="spinner-border" role="status">

      </div>
    )
  }

  return (
    <div className = 'container-fluid'>
        <Header/>
        <SelfCharactersCardsList arr={allCharacters.results}/>
        <Pagination>
          <Pagination.First href={`/characters/page=1`}/>
          <Pagination.Prev href={`/characters/page=${(currentPage - 1) === 0 ? currentPage : currentPage - 1}`}/>
          <Pagination.Item active>{currentPage}</Pagination.Item>
          <Pagination.Next href={`/characters/page=${currentPage + 1}`}/>
          <Pagination.Last href={`/characters/page=${totalPages}`}/>
        </Pagination>
    </div>
  )
}
export { CharacterCardsPage };