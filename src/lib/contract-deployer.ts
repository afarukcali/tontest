import BN from "bn.js";
import { Address, Cell, contractAddress, StateInit } from "ton";
import { TonConnection } from "@ton-defi.org/ton-connection";
import { Sender } from "ton-core";

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

  async deployContract(params: ContractDeployDetails, tonConnection: Sender): Promise<Address> {
    const _contractAddress = this.addressForContract(params);

    if (!params.dryRun) {
      await tonConnection.send({
        to: _contractAddress as any,
        value: BigInt(params.value.toNumber()),
        init: { data: params.data as any, code: params.code as any },
        // message: params.message,
      });
    }

    return _contractAddress;
  }
}
