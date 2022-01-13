import { HeaderContainer, HeaderWrapper, UserInfo } from "./styles";
import logo from "../../assets/images/logo.png";
import UserCircle from '../UserCircle'
import { useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth'

const Header = () => {
  const navigate = useNavigate();
  const {user} = useAuth()

  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`

  const handleLogoOff = () => {
    navigate('/')
  }
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <img src={logo} width={172} height={61} alt="logo inter" />
        <UserInfo>
            <UserCircle initials={initials}/>
          <div>
                <p>
                Olá, <span className="primary-color font-bold">{user.firstName} {user.lastName}</span>
                </p>
                <strong>{user.accountNumber}-{user.accountDigit}</strong>
                <br />
                <a href="#" onClick={handleLogoOff}>Sair</a>
          </div>
        </UserInfo>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default Header;
