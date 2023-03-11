import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";

import styled from "styled-components";
import { FlexBoxCol, FlexBoxColCenter, FlexBoxRow } from "./components/styled/styled";
import { useTonConnect } from "./hooks/useTonConnect";
import "@twa-dev/sdk";
import { Form } from "./components/form";
import { DeployerPage } from "./pages/deployer";
import WalletConnection from "./services/wallet-connection";

const StyledApp = styled.div`
  background-color: #e8e8e8;
  color: black;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
  min-height: 100vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

function App() {
  const { connected } = useTonConnect();

  return (
    <StyledApp>
      <AppContainer>
        <FlexBoxCol>
          <FlexBoxCol>
            <TonConnectButton />
            {!connected && <h3 style={{ marginTop: "1rem" }}>Welcome To DAO-TON ! Please connect your wallet for continue !</h3>}
            {connected && <DeployerPage />}
          </FlexBoxCol>
        </FlexBoxCol>
      </AppContainer>
    </StyledApp>
  );
}

export default App;
