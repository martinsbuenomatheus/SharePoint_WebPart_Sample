import { cpf } from 'cpf-cnpj-validator';
import StringMask from 'string-mask'

export let cpfFinal = ""
export let cpfValidado = false
export let cpfDialogo, cpfErro, cpfDescricao
let valorCPF

function format (_cpf){
     cpfFinal = _cpf
     var formatter = new StringMask('0##.###.###-##');
     cpfFinal = formatter.apply(_cpf);
 }

export function validaCPF(_cpf) {
    if(_cpf.length > 14){
        format(valorCPF)
    }
    else{
        valorCPF = _cpf.replace(/[^a-zA-Z0-9]/g, '')

        if (valorCPF.length > 10) {
            if (cpf.isValid(valorCPF)) {
                cpfValidado = true
                cpfErro = ""
                cpfDescricao = "CPF válido"
            }
            else {
                cpfValidado = false
                cpfErro = "CPF inválido"
                cpfDescricao = ""
            }
        }
        else {
            cpfValidado = false
            cpfErro = ""
            cpfDescricao = ""
        }
        format(valorCPF)
    }
}