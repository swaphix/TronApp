interface IWalletUser {
    id: number;
    network: string;
    crypto: string;
    address: string;
    balance: number;
    balance_fiat: string;
    icon: string;
}

export class WalletUser implements IWalletUser {
    constructor(
        public id: number,
        public network: string,
        public crypto: string,
        public address: string,
        public balance: number,
        public icon: string,
        public balance_fiat: string,
    ) { }

    toJSON(): string {
        return JSON.stringify({
            id: this.id,
            network: this.network,
            crypto: this.crypto,
            address: this.address,
            balance: this.balance,
            icon: this.icon,
            balance_fiat: this.balance_fiat
        });
    }


    static fromJSON(json: string): WalletUser {
        const data = JSON.parse(json);
        return new WalletUser(
            data.id,
            data.network,
            data.crypto,
            data.address,
            data.balance,
            data.icon,
            data.balance_fiat
            
        );
    }
}