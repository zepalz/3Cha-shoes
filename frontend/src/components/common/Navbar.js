import React from 'react'
import styled from 'styled-components'
import logoWhite from '../../assets/logo/logowhite.png'
import logoBlack from '../../assets/logo/logoblack.png'
import { withRouter, Link } from 'react-router-dom'

import Rodal from 'rodal'
import LoginPage from '../login/LoginPage'

const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  background: initial;
  padding: 0 1em;
  padding-right: 2em;
  transition: color 500ms, background 500ms, box-shadow 500ms;
`

const Logo = styled.img`
  height: 20px;
  margin: 1em;
`

const Menu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  color: inherit;
  > * + * {
    margin-left: 1em !important;
  }
`

const StyledLink = styled(Link)`
  font-size: inherit;
  font-weight: inherit;
  text-decoration: none;
  margin: 1.6em 0;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    color: inherit;
    text-decoration: none;
  }
`

const Login = styled.div`
  cursor: pointer;
`

const rodalStyle = {
  maxWidth: '500px',
  width: '90%',
  height: 'auto',
  top: '50%',
  transform: 'translateY(-50%)',
  padding: '2em 1em',
}

const menus = [
  { name: 'HOME', path: '/' },
  { name: 'REGISTER', path: '/register' },
]

class Navbar extends React.PureComponent {
  constructor(props) {
    super(props)
    this.navbar = React.createRef()
  }

  state = {
    logo: logoWhite,
    isModalOpen: true,
  }

  alterNavbar = () => {
    if (this.props.location.pathname === '/') {
      this.navbar.current.style.color = 'white'
      this.navbar.current.style.position = 'fixed'
      this.setState({ logo: logoWhite })
      if (window.scrollY > 40) {
        this.navbar.current.style.background = 'rgba(0, 0, 0, 0.7)'
        this.navbar.current.style.boxShadow = '0 0 4px rgba(0, 0, 0, 0.1)'
      } else {
        this.navbar.current.style.background = 'initial'
        this.navbar.current.style.boxShadow = 'initial'
      }
    } else {
      this.setState({ logo: logoBlack }, () => {
        this.navbar.current.style.color = 'black'
        this.navbar.current.style.position = 'sticky'
        this.navbar.current.style.background = 'white'
        this.navbar.current.style.boxShadow = 'none'
      })
    }
  }

  componentDidUpdate = prevProps => {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.alterNavbar()
      if (this.props.location.pathname === '/') {
        this.navbar.current.style.position = 'fixed'
      } else {
        this.navbar.current.style.position = 'sticky'
      }
    }
  }

  componentDidMount = () => {
    this.alterNavbar()
    window.addEventListener('scroll', this.alterNavbar)
  }

  onModalClose = () => {
    this.setState({
      isModalOpen: false,
    })
  }

  render() {
    return (
      <Container innerRef={this.navbar}>
        <Link to="/">
          <Logo src={this.state.logo} alt="curt." />
        </Link>
        <Menu>
          {menus.map(menu => (
            <StyledLink key={menu.name} to={menu.path}>
              {menu.name}
            </StyledLink>
          ))}
          <Login onClick={() => this.setState({ isModalOpen: true })}>
            LOGIN
          </Login>
        </Menu>
        <Rodal
          customStyles={rodalStyle}
          visible={this.state.isModalOpen}
          onClose={this.onModalClose}
        >
          <LoginPage />
        </Rodal>
      </Container>
    )
  }
}

export default withRouter(Navbar)
