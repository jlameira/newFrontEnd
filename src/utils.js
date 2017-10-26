function formataPlaca(dados) {
    let a1 = dados.data.retorno._00._00._a1;
    let a2 = dados.data.retorno._00._00._a2;
    let a3 = dados.data.retorno._00._00._a3;
    let n1 = dados.data.retorno._00._00._n1;
    let n2 = dados.data.retorno._00._00._n2;
    let n3 = dados.data.retorno._00._00._n3;
    let n4 = dados.data.retorno._00._00._n4;
    let placa = a1 + a2 + a3 + '-' + n1 + n2 + n3 + n4;
    return placa.toLocaleUpperCase();
}

export { formataPlaca }