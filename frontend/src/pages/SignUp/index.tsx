
import { Wrapper, Background, InputContainer, ButtonContainer } from "./styles";
import background from "../../assets/images/background-login.jpg";
import logoInter from "../../assets/images/logo.png";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const handleToSignUp = () => {
    navigate("/dashboard");
  };
  return (
    <Wrapper>
      <Background image={background} />
      <Card width="403px">
        <img src={logoInter} width={172} height={61} alt="Inter" />
        <InputContainer>
          <Input placeholder="NOME" />
          <Input placeholder="SOBRENOME" />
          <Input placeholder="EMAIL" />
          <Input placeholder="SENHA" type="password" />
          <Input placeholder="CONFIRMAR SENHA" type="password" />
        </InputContainer>
        <ButtonContainer>
          <Button type="button" onClick={handleToSignUp}>
            Entrar
          </Button>
          <p>
            Já tem uma conta?<Link to="/"> Entre Já</Link>
          </p>
        </ButtonContainer>
      </Card>
    </Wrapper>
  );
};

export default SignUp;
