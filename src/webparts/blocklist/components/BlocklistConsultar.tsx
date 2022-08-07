import * as React from 'react';
import styles from './Blocklist.module.scss';
import { IBlocklistProps } from './IBlocklistProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { TextField, PrimaryButton, DefaultButton,DialogType, Dialog, DialogFooter } from 'office-ui-fabric-react';
import { consultarEmpregado } from './Axios'
import { validaCPF, cpfFinal, cpfValidado, cpfDescricao, cpfErro, cpfDialogo } from './ValidadorCPF'
import { setTabela, renderTabela } from './BlocklistLista'
import {grupo} from './Blocklist'
import BlocklistAddUpdate from './BlocklistAddUpdate'
import BlocklistExcluir from './BlocklistExcluir'

export let consulta
let dialogMsg, erroMsg, descriptionMsg, ocultaMenu, addUpdate

class BlocklistConsultar extends React.Component<any, any>{
    constructor(props: {}) {
        super(props);
        this.state = {
            carregaLista: [],
            menuAtual: this.props.menuAtual,
            cpfProfissional: this.props.cpfProfissional,
            ocultaDialogo: this.props.ocultaDialogo,
            funcionarioEncontrado: this.props.funcionarioEncontrado,
            cpfState: this.props.cpfState,
            showUpdate: this.props.showState,
            showExcluir: this.props.showExcluir
        }
        ocultaMenu = true
    }

    componentDidMount() {
        this.validador("")
        this.setState({ menuAtual : "consulta" })
        this.setState({ funcionarioEncontrado: false })       
    }

    consultar(_cpf) {
        consultarEmpregado(_cpf)
            .then((resposta) => {
                if (resposta.data.value.length > 0) {
                    this.setState({ funcionarioEncontrado: true })
                    setTabela(resposta)
                    dialogMsg = "Funcionário encontrado - não poderá participar de processos de atendimento PAGSEGURO"
                    this.setState({ ocultaDialogo: false })
                    addUpdate = "Atualizar"
                }
                else {
                    this.setState({ funcionarioEncontrado: false })
                    dialogMsg = "Funcionário não encontrado - OK para seguir com a contratação"
                    this.setState({ ocultaDialogo: false })
                    addUpdate = "Adicionar"
                }
                consulta = resposta
                ocultaMenu = false
            })
    }

    validador(_cpf){
        validaCPF(_cpf)
        this.setState({ cpfProfissional : cpfFinal})
        this.setState({ cpfState : cpfValidado})

        if(cpfValidado == false){
            ocultaMenu = true
        }
    }

    showUpdate(){
        return (<BlocklistAddUpdate/>)
    }

    render() {
        let dialogContentProps = {
            type: DialogType.normal,
            title: "Resultado da Consulta",
            closeButtonAriaLabel: 'Fechar',
            subText: dialogMsg
        };

        return (
            <div>
                <div >
                    <TextField
                        className={styles['textfield']}
                        placeholder="000.000.000-00"
                        value={this.state.cpfProfissional}
                        onPaste={(value) => {this.setState({ menuAtual: "consulta"}, function(){ocultaMenu = true})}}
                        onChanged={(value) => this.validador(value)}
                        label="Digite o CPF"
                        description={cpfDescricao}
                        errorMessage={cpfErro}
                        required={true}
                    />
                </div>

                <div>{this.state.funcionarioEncontrado ? renderTabela() : <div></div>}</div>

                <div className={styles['table-row']}>
                    <DefaultButton text="Consultar" disabled={!cpfValidado} onClick={() => {this.consultar(cpfFinal), this.setState({ menuAtual : "consulta"})}} 
                        className={this.state.menuAtual == "consulta" && cpfValidado ? styles['selected'] : styles['unselected']}/>

                    {grupo == "Admin" && this.state.cpfState == true ? 
                        <div hidden={ocultaMenu}>
                            <DefaultButton text={addUpdate} onClick={() => this.setState({ menuAtual : "update"})}
                                className={this.state.menuAtual == "update" ? styles['selected'] : styles['unselected']}/>

                            {this.state.funcionarioEncontrado ? 
                                <DefaultButton text="Excluir" onClick={() => this.setState({ menuAtual : "excluir"})}  
                                className={this.state.menuAtual == "excluir" ? styles['selected'] : styles['unselected']}/>
                            : <div></div>}

                            {this.state.menuAtual == "update" ? <BlocklistAddUpdate/> : <div></div> }
                            {this.state.menuAtual == "excluir" ? <BlocklistExcluir/>: <div></div>}
                        </div> 
                    : <div></div>}
                </div>

                <div>
                    <Dialog
                        hidden={this.state.ocultaDialogo}
                        dialogContentProps={dialogContentProps}
                    >
                        <DialogFooter>
                            <PrimaryButton onClick={() => { this.setState({ ocultaDialogo: true }) }} text="Concluído" />
                        </DialogFooter>
                    </Dialog>
                </div>
            </div>
        );
    }
}

export default BlocklistConsultar