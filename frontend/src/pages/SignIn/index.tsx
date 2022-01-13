import React from "react";
import { Wrapper, Background, InputContainer, ButtonContainer } from "./styles";
import background from "../../assets/images/background-login.jpg";
import logoInter from "../../assets/images/logo.png";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const SignIn = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();
  const { userSignIn } = useAuth();

  const handleToSignIn = async () => {
    const data = {
      email,
      password,
    };

    const response = await userSignIn(data);
   
    if (response.id) {
      navigate("/dashboard");
      return;
    }
    alert("Usuário ou senha inválida");
  };
  return (
    <Wrapper>
      <Background image={background} />
      <Card width="403px">
        <img src={logoInter} width={172} height={61} alt="Inter" />
        <InputContainer>
          <Input
            placeholder="EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="SENHA"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputContainer>
        <ButtonContainer>
          <Button type="button" onClick={handleToSignIn}>
            Entrar
          </Button>
          <p>
            Ainda não é cadastrado? <Link to="/signup">Cadastre-se Já</Link>
          </p>
        </ButtonContainer>
      </Card>
    </Wrapper>
  );
};

export default SignIn;
