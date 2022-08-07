import axios from "axios";
import * as React from 'react';

let BASE_URL, TOKEN_URL, BLOCKLIST_ITEMS, EPS_ITEMS, GRUPO_ADM, GRUPO_EPS 

export function initializeContext(contexto){
    BASE_URL = contexto;
    TOKEN_URL = contexto + "/_api/contextinfo";
    //LISTAS
    BLOCKLIST_ITEMS = contexto + "/_api/web/Lists/GetByTitle('CadastroBlocklist')/Items";
    EPS_ITEMS = contexto + "/_api/web/Lists/GetByTitle('CadastroEPS')/Items";
    //GRUPOS
    GRUPO_ADM = contexto + "/_api/Web/SiteGroups/GetByName('Blocklist_ADM')/Users";
    GRUPO_EPS = contexto + "/_api/Web/SiteGroups/GetByName('Blocklist_EPS')/Users";
}

export function consultarGrupo() {
    let grupo, userId
    let admin = false

    return axios.get(BASE_URL + "/_api/Web/currentuser/?$expand=groups")
        .then((user) => {

            for(let i = 0; i < user.data.Groups.length; i++){
                let groupTitle = user.data.Groups[i].Title

                if (groupTitle == "Blocklist_ADM" || groupTitle == "Blocklist_EPS")
                    if(groupTitle == "Blocklist_ADM"){
                        return("admin")
                    }
                    else if (groupTitle == "Blocklist_EPS"){
                        return("visitante")
                    }
            }
            return (undefined)
        })
}

export function consultarLista() {
    let lista

    return axios.get(BLOCKLIST_ITEMS + "?$SortDir=Desc")  //"?$top=10"
        .then((listaCadastro) => {
            lista = listaCadastro
            return lista
        })
}

export function consultarEPS() {
    let eps

    return axios.get(EPS_ITEMS)
        .then((listaEps) => {
            eps = listaEps
            return eps
        })
}

export function consultarEmpregado(_cpf) {
    let profissional

    return axios.get(BLOCKLIST_ITEMS + "?$filter=CPF" + "+eq('" + _cpf + "')")
        .then((resposta) => {
            profissional = resposta
            return profissional
        })
}

export function atualizarEmpregado(dados) {
    let id, method, validacao, urlFinal, token, header, data

    return axios.post(TOKEN_URL)
        .then((resposta) => {
            token = resposta.data.FormDigestValue;

            consultarEmpregado(dados[0])
                .then((resposta) => {

                    if ((resposta.data.value).length > 0) {
                        id = resposta.data.value[0].Id
                        urlFinal = BLOCKLIST_ITEMS + "(" + id + ")";
                        method = 'PATCH'
                        validacao = "atualizado"
                    } else {
                        id = 0
                        urlFinal = BLOCKLIST_ITEMS
                        method = 'POST'
                        validacao = "adicionado"
                    }

                    header = {
                        headers: {
                            'X-RequestDigest': token,
                            'IF-MATCH': '*',
                            'X-HTTP-Method': method,
                        }
                    }
                    data = {
                        'Title': "blocklisted",
                        'CPF':  dados[0],
                        'Nome': dados[1],
                        'EPS':  dados[2],
                        'Matricula':    dados[3],
                        'Chamado':      dados[4]
                    }

                    return axios.post(urlFinal, data, header).then((resposta) => {
                        return resposta
                    })
                        .catch((error) => {
                            console.log(error.message)
                        })
                })
        })
}

export function deletarEmpregado(id) {
    return axios.post(TOKEN_URL)
        .then((response) => {
            let token = response.data.FormDigestValue;
            let urlFinal = BLOCKLIST_ITEMS + "(" + id + ")/recycle()";
            let header = {
                'X-RequestDigest': token,
                'IF-MATCH': '*',
                'X-HTTP-Method': 'DELETE',
            }

            return axios.delete(urlFinal, { headers: header }).then((resposta) => {
                return resposta
            })
                .catch((error) => {
                    console.log(error.message)
                })
        })
        .catch((error) => {
        })
}