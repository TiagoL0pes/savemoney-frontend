export function formatarData(data: string): string {
    if (!data || data.length === 0) {
        return '';
    }

    var d = new Date(data),
        mes = '' + (d.getMonth() + 1),
        dia = '' + d.getDate(),
        ano = d.getFullYear();

    if (mes.length < 2) mes = '0' + mes;
    if (dia.length < 2) dia = '0' + dia;

    return [dia, mes, ano].join('-').replace(/-/g, '/');
}

export function mesAtual(nomeMes: number): string {
    switch (nomeMes) {
        case 0:
            return 'Janeiro';
        case 1:
            return 'Fevereiro';
        case 2:
            return 'Março';
        case 3:
            return 'Abril';
        case 4:
            return 'Maio';
        case 5:
            return 'Junho';
        case 6:
            return 'Julho';
        case 7:
            return 'Agosto';
        case 8:
            return 'Setembro';
        case 9:
            return 'Outubro';
        case 10:
            return 'Novembro';
        case 11:
            return 'Dezembro';
    }

}

export function mesPorNome(nomeMes: string): number {
    switch (nomeMes) {
        case 'Janeiro':
            return 0;
        case 'Fevereiro':
            return 1;
        case 'Março':
            return 2;
        case 'Abril':
            return 3;
        case 'Maio':
            return 4;
        case 'Junho':
            return 5;
        case 'Julho':
            return 6;
        case 'Agosto':
            return 7;
        case 'Setembro':
            return 8;
        case 'Outubro':
            return 9;
        case 'Novembro':
            return 10;
        case 'Dezembro':
            return 11;
    }
}

export function gerarMeses() {
    return [
        {
            mes: 'Janeiro',
            numero: 1
        },
        {
            mes: 'Fevereiro',
            numero: 2
        },
        {
            mes: 'Março',
            numero: 3
        },
        {
            mes: 'Abril',
            numero: 4
        },
        {
            mes: 'Maio',
            numero: 5
        },
        {
            mes: 'Junho',
            numero: 6
        },
        {
            mes: 'Julho',
            numero: 7
        },
        {
            mes: 'Agosto',
            numero: 8
        },
        {
            mes: 'Setembro',
            numero: 9
        },
        {
            mes: 'Outubro',
            numero: 10
        },
        {
            mes: 'Novembro',
            numero: 11
        },
        {
            mes: 'Dezembro',
            numero: 12
        },
    ];
}