import { useState } from "react";
import { Address } from "ton";
import { Box, Fade, Button, Link, Typography } from "@mui/material";

import { Link as ReactRouterLink } from "react-router-dom";
import { FormWrapper, ScreenHeading, StyledDescription, StyledTxLoaderContent, SubHeadingWrapper } from "./styles";
import { Form } from "../../components/form";
import { jettonDeployController, JettonDeployParams } from "../../lib/deploy-controller";
import BigNumber from "bignumber.js";
import { BN } from "bn.js";
import { createDeployParams } from "../../lib/utils";
import { ContractDeployer } from "../../lib/contract-deployer";
import WalletConnection from "../../services/wallet-connection";
import { useTonConnect } from "../../hooks/useTonConnect";
import { Providers } from "../../lib/env-profiles";

async function fetchDecimalsOffchain(url: string): Promise<{ decimals?: string }> {
  let res = await fetch(url);
  let obj = await res.json();
  return obj;
}

function toDecimalsBN(num: number | string, decimals: number | string) {
  const ten = new BigNumber(10);
  return new BN(BigNumber(num).multipliedBy(ten.pow(decimals)).toFixed(0));
}

function DeployerPage() {
  // const { showNotification } = useNotification();
  // const { address } = useConnectionStore();
  const [isLoading, setIsLoading] = useState(false);
  const { address, wallet } = useTonConnect();

  async function deployContract(data: any) {
    await WalletConnection.connect(Providers.OPEN_MASK, () => {}, true);

    const connection = WalletConnection.getConnection();
    console.log(address);
    if (!address || !connection) {
      throw new Error("Wallet not connected");
    }

    let decimals = data.decimals;
    if (data.offchainUri) {
      let res = await fetchDecimalsOffchain(data.offchainUri.replace("ipfs://", "https://ipfs.io/ipfs/"));
      decimals = res.decimals;
    }

    const params: JettonDeployParams = {
      owner: Address.parse(address),
      onchainMetaData: {
        name: data.name,
        symbol: data.symbol,
        image: data.tokenImage,
        description: data.description,
        decimals: parseInt(decimals).toFixed(0),
      },
      offchainUri: data.offchainUri,
      amountToMint: toDecimalsBN(data.mintAmount, decimals ?? 9),
    };
    setIsLoading(true);
    const deployParams = createDeployParams(params, data.offchainUri);
    const contractAddress = new ContractDeployer().addressForContract(deployParams);

    const isDeployed = await WalletConnection.isContractDeployed(contractAddress);

    if (isDeployed) {
      // showNotification(
      //   <>
      //     Contract already deployed, <ReactRouterLink to={`${ROUTES.jetton}/${Address.normalize(contractAddress)}/`}>View contract</ReactRouterLink>
      //   </>,
      //   "warning"
      // );
      setIsLoading(false);
      return;
    }

    try {
      const result = await jettonDeployController.createJetton(params, connection);

      // navigate(`${ROUTES.jetton}/${Address.normalize(result)}`);
    } catch (err) {
      // if (err instanceof Error) {
      //   showNotification(<>{err.message}</>, "error");
      // }

      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <div>
        <Fade in>
          <Box>
            <Box mb={3} mt={3.75}>
              <ScreenHeading variant="h5" style={{ color: "wheat", marginTop: "0" }}>
                Mint your dao token
              </ScreenHeading>
            </Box>
            <FormWrapper>
              <SubHeadingWrapper>
                <Form
                  submitText="Mint"
                  onSubmit={function (values: any): Promise<void> {
                    return deployContract(values);
                    // return Promise.resolve();
                    // throw new Error("Function not implemented.");
                  }}
                  inputs={[
                    {
                      name: "name",
                      label: "Jetton Name",
                      description: "Your project unabbreviated name with spaces (usually 1-3 words).",
                      type: "text",
                      default: "Bitcoin Cash",
                      required: true,
                      errorMessage: "Name required",
                    },
                    {
                      name: "symbol",
                      label: "Jetton Symbol",
                      description: "Currency symbol appearing in balance (usually 3-5 uppercase chars).",
                      type: "text",
                      default: "BCH",
                      required: true,
                      errorMessage: "Symbol required",
                    },
                    {
                      name: "decimals",
                      label: "Jetton Decimals",
                      description: "The decimal precision of your token (9 is TON default).",
                      type: "number",
                      validate: false,
                      default: 9,
                      showDefault: true,
                      required: true,
                      errorMessage: "Decimals amount from 0 to 255 is required", // https://github.com/ton-blockchain/TEPs/blob/master/text/0064-token-data-standard.md#jetton-metadata-attributes
                    },
                    {
                      name: "mintAmount",
                      label: "Tokens to Mint",
                      description: "Number of initial tokens to mint and send to your wallet address (float).",
                      type: "number",
                      default: 21000000,
                      required: true,
                      errorMessage: "Mint amount required",
                    },
                    {
                      name: "description",
                      label: "Description",
                      description: "Optional sentence explaining about your project.",
                      type: "string",
                      default: "Low fee peer-to-peer electronic cash alternative to Bitcoin",
                    },
                  ]}
                />
              </SubHeadingWrapper>
            </FormWrapper>
          </Box>
        </Fade>
      </div>
    </div>
  );
}
export { DeployerPage };
