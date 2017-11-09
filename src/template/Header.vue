<template>
    <div id="m">
        <h1>Sistema</h1>
        <div id="menuModulo">
            <ul>
                <li id="li_monitoramento" >
                    <router-link id="li_monitoramento" to="/" active-class="at" exact>Alertas </router-link>
                </li>
                <li id="li_pesquisa">
                    <router-link id="li_monitoramento" to="/pesquisar" active-class="at" exact>Pesquisar </router-link>
                </li>
                <li id="li_gerenciaCamera">
                    <router-link id="li_monitoramento" to="/gerenciamento" active-class="at" exact>Gerenciamento </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>