let axios = require('axios');

let dados = {
    ano: "",
    anoModelo: "",
    codigoMarca: "4",
    codigoModelo: "",
    codigoTabelaReferencia: "218",
    codigoTipoCombustivel: "",
    codigoTipoVeiculo: "1",
    modeloCodigoExterno: ""
}
let url = 'http://veiculos.fipe.org.br/api/veiculos/ConsultarModelos';

for (i = 1; i < 88; i++) {
    dados.codigoMarca = i;


    axios.post(url, dados)
        .then(resp => { console.log(resp) })
        .catch(err => {
            err.response.data.erro.map(err => console.log(err))

        });
}