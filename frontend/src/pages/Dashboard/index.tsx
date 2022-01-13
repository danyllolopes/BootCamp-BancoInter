import Button from "../../components/Button";
import Card from "../../components/Card";
import Header from "../../components/Header";
import Input from "../../components/Input";
import useAuth from '../../hooks/useAuth'
import {
    DashboardBackground,
    BodyContainer,
    InlineContainer,
    InlineTitle,
} from "./styles";
import Statement from "./Statement";
import React from "react"
import {pay, request} from '../../services/resources/pix'

const Dashboard = () => {
    const {user, getCurrentUser} = useAuth()
    const wallet = user?.wallet || 0;
  

    const [key, setKey] = React.useState('')
    const [generateKey, setGenerateKey] = React.useState('')
    const [newValue, setNewValue] = React.useState('')

    const handleNewPayment = async () => {
        const {data} = await request(Number(newValue))

        if(data.copyPasteKey){
            setGenerateKey(data.copyPasteKey)
        }
    }
    const handleReceivePix = async () => {
        try {
            const {data} = await pay(key)
            if(data.msg){
                alert(data.msg)
                return
            }
            alert('Não foi possivel fazer o pagamento.')
        }catch(e){
            console.log(e)
            alert('Não foi possivel receber o pix dos mesmo usuário.')
        }
    }

    React.useEffect(() => {
        getCurrentUser()
    }, [])
  
    if(!user){
        return null
    }
    
  
    return (
        <DashboardBackground>
            <Header />
            <BodyContainer>
                <div>
                    <Card noShadow width="90%">
                        <InlineTitle>
                            <h2 className="h2">Saldo Atual</h2>
                        </InlineTitle>
                        <InlineContainer>
                            <h3 className="wallet">
                                {wallet.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                })}
                            </h3>
                        </InlineContainer>
                    </Card>
                    <Card noShadow width="90%">
                        <InlineTitle>
                            <h2 className="h2">Receber PIX</h2>
                        </InlineTitle>
                        <InlineContainer>
                            <Input style={{ flex: 1 }} value={newValue} onChange={e => setNewValue(e.target.value)} placeholder="Valor" />
                            <Button onClick={handleNewPayment}>Gerar Código</Button>
                        </InlineContainer>
                        {generateKey && (
                            <>
                            <p className="primary-color">Pix copia e cola</p>
                            <p className="primary-color">{generateKey}</p>
                            </>
                        )}
                   
                    </Card>
                    <Card noShadow width="90%">
                        <InlineTitle>
                            <h2 className="h2">Pagar PIX</h2>
                        </InlineTitle>
                        <InlineContainer>
                            <Input style={{ flex: 1 }}  value={key} onChange={e => setKey(e.target.value)} placeholder="Insira a chave" />
                            <Button onClick={handleReceivePix}>Pagar PIX</Button>
                        </InlineContainer>

                    </Card>
                </div>
                <div>
                    <Card noShadow width="90%">
                        <InlineTitle>
                            <h2 className="h2">Extrato da Conta</h2>
                        </InlineTitle>
                            <Statement></Statement>
                    </Card>
                </div>
            </BodyContainer>
        </DashboardBackground>
    );
};

export default Dashboard;
