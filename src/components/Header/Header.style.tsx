import { clubbiStyled, Grid } from 'clubbi-ui'

export const StyledHeader = clubbiStyled('div')(({ theme }) => ({
  width: '100vw',
  height: '175px',
  left: '0px',
  top: '0px',
  backgroundColor: theme.palette.brandPurple[60],
  color: '#fff',
  paddingLeft: '16px',
  paddingRight: '16px',
  paddingTop: '40px',
  marginRight: '-8px',

  [theme.breakpoints.up('sm')]: {
    paddingTop: '35px',
    height: '120px',
    paddingLeft: '24px',
    paddingRight: '24px',
  },
}))

export const StyledSearchBar = clubbiStyled(Grid)(({ theme }) => ({
  width: '100%',
  borderRadius: '4px',
  boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.3)',
  marginTop: '20px',

  background: '#fff',

  [theme.breakpoints.up('sm')]: {
    width: '578px',
    marginTop: '0',
  },
}))

export const StyledGrid = clubbiStyled(Grid)(({ theme }) => ({
  xs: 20,
  md: 20,
  sm: 20,
  margin: 0,
  display: 'flex',
  justifyContent: 'left',
  alignItems: 'left',
}))

