export enum Route {
    AUTH = 'auth',
    REGISTRO = 'registro',
    INICIO = 'inicio',
    DESPESA = 'despesas',
    ADICIONAR_DESPESA = 'adicionar/despesa',
    DETALHAR_DESPESA = 'detalhar/:idDespesa',
    EDITAR_DESPESA = 'editar/:idDespesa',
    CARTAO_CREDITO = 'cartoes/credito',
    FATURA = ':idCartao/faturas',
    ADICIONAR_CARTAO_CREDITO = 'adicionar/cartao',
    DETALHAR_CARTAO_CREDITO = 'detalhar/:idCartao',
    EDITAR_CARTAO_CREDITO = 'editar/:idCartao',
    ITEM_CARTAO = 'item/cartao/:idCartao',
    ADICIONAR_ITEM_CARTAO = 'adicionar/item/cartao',
    DETALHAR_ITEM_CARTAO = 'detalhar/item/cartao/:idItem',
    EDITAR_ITEM_CARTAO = 'editar/item/cartao/:idItem',
    DEFAULT = '**'
}
