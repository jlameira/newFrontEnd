<template>
    <div id="m">
        <h1>Sistema</h1>
        <div id="menuModulo">
            <ul>
                <li id="li_monitoramento" >
                    <a id="li_monitoramento" href="https://helios.policiamilitar.mg.gov.br/" >Alertas </a>
                </li>
                <li id="li_pesquisa">
                    <router-link id="li_monitoramento" to="/v3/pesquisar" active-class="at" exact>Pesquisar </router-link>
                </li>
                <li id="li_gerenciaCamera">
                    <a id="li_monitoramento" href="https://helios.policiamilitar.mg.gov.br/#gerenciaCamera" >Gerenciamento </a>
                </li>
            </ul>
        </div>
    </div>
</template>