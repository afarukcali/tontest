import BN from "bn.js";
import { Address, Cell, contractAddress, StateInit } from "ton";
import { TonConnection } from "@ton-defi.org/ton-connection";

interface ContractDeployDetails {
  deployer: Address;
  value: BN;
  code: Cell;
  data: Cell;
  message?: Cell;
  dryRun?: boolean;
}

export class ContractDeployer {
  addressForContract(params: ContractDeployDetails) {
    return contractAddress({
      workchain: 0,
      initialData: params.data,
      initialCode: params.code,
    });
  }

  async deployContract(
    params: ContractDeployDetails,
    tonConnection: TonConnection,
  ): Promise<Address> {
    const _contractAddress = this.addressForContract(params);

    if (!params.dryRun) {
      await tonConnection.requestTransaction({
        to: _contractAddress,
        value: params.value,
        stateInit: new StateInit({ data: params.data, code: params.code }),
        message: params.message,
      });
    }

    return _contractAddress;
  }
}
