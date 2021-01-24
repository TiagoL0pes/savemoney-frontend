export class ContaBancaria {
    idContaBancaria: number;
    agencia: string;
    conta: string;
    saldo: number;

    comIdContaBancaria(idContaBancaria: number): this {
        this.idContaBancaria = idContaBancaria;
        return this;
    }

    comAgencia(agencia: string): this {
        this.agencia = agencia;
        return this;
    }

    comConta(conta: string): this {
        this.conta = conta;
        return this;
    }

    comSaldo(saldo: number): this {
        this.saldo = saldo;
        return this;
    }

    construir(): ContaBancaria {
        return this;
    }
}