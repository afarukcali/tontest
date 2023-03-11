import { ChromeExtensionWalletProvider, TonConnection, TonhubProvider, TonkeeperProvider, OpenMaskWalletProvider } from "@ton-defi.org/ton-connection";
import { Providers } from "../lib/env-profiles";
import { Address } from "ton";

class WalletConnection {
  private static connection?: TonConnection;

  private constructor() {}

  public static getConnection() {
    if (!this.connection) {
      throw new Error("Connection missing");
    }
    return this.connection;
  }

  public static isContractDeployed(contractAddr: Address) {
    return false; // TODO fix
    // return this.connection?._tonClient.isContractDeployed(contractAddr);
  }

  public static async connect(providerId: Providers, onLinkReady: (link: string) => void, isTestnet: boolean, onTransactionLinkReady?: (link: string) => void) {
    let prov;

    switch (providerId) {
      case Providers.TON_HUB:
        prov = new TonhubProvider({
          onSessionLinkReady: onLinkReady,
          isSandbox: isTestnet,
          persistenceProvider: localStorage,
          onTransactionLinkReady,
        });
        break;
      case Providers.EXTENSION:
        prov = new ChromeExtensionWalletProvider();
        break;
      case Providers.TONKEEPER:
        prov = new TonkeeperProvider({
          manifestUrl: "https://minter.ton.org/tonconnect-manifest.json",
          onSessionLinkReady: (l) => {
            onLinkReady(l);
          },
        });
        break;
      case Providers.OPEN_MASK:
        prov = new OpenMaskWalletProvider();
        break;
      default:
        throw new Error("UNKNOWN PROVIDER");
    }

    this.connection = new TonConnection(prov);
    return this.connection.connect();
  }

  public static async disconnect() {
    await this.connection?.disconnect();
  }
}

export default WalletConnection;
