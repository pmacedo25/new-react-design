import { Grid } from 'clubbi-ui'
import { Link } from 'react-router-dom'
import { SearchBar as SearchBarClubbi } from 'clubbi-ui'
import { StyledGrid, StyledHeader, StyledSearchBar } from './Header.style'
import { useAppSelector } from 'hooks/Common'
import SearchBarHooks from 'hooks/SearchBar'

const PLACE_HOLDER = 'Digite a sua busca'
const GA_ID = 'search-bar'

const Header = () => {

  const [value, inputValue, recent] = useAppSelector(({ search }) => [
    search.value || '',
    search.inputValue || '',
    search.recent,
  ])

  const [handleChange, handleInputChange, handleKeyDown] = SearchBarHooks()

  const setOptions = () => {
    const optionsDefault = ['Biscoitos', 'Café', 'Suco']

    if (recent.length) {
      return recent.slice(0, 3).map((word) => word)
    }

    return optionsDefault
  }

  return (
    <>
      <StyledHeader>
        <StyledGrid>
          <Grid item xs={3} md={3} sm={3}>
            {/*todo devemos componentizar essa logo na clubbi UI */}
            <Link to="/">
              <img src={'/img/clubbi-logo-white.png'} alt="Logo Clubbi" width={80} />
            </Link>
          </Grid>
          <StyledSearchBar item xs={5} md={5} sm={5}>
            <SearchBarClubbi
              data-testid={GA_ID}
              options={setOptions()}
              placeholder={PLACE_HOLDER}
              handleChange={handleChange}
              handleKeyDown={handleKeyDown}
              value={value}
              inputValue={inputValue}
              handleInputChange={handleInputChange}
            />
          </StyledSearchBar>
        </StyledGrid>
      </StyledHeader>
    </>
  )
}

export default Header
