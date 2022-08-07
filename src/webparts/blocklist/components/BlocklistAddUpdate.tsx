import * as React from 'react';
import styles from './Blocklist.module.scss';
import { IBlocklistProps } from './IBlocklistProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { PrimaryButton, DefaultButton, TextField, DialogType, Dialog, DialogFooter, ComboBox, IComboBoxOption, IComboBoxStyles, Toggle } from 'office-ui-fabric-react';
import { consultarLista, consultarEPS, consultarEmpregado, atualizarEmpregado } from './Axios'
import { validaCPF, cpfFinal, cpfValidado, cpfDescricao, cpfErro, cpfDialogo } from './ValidadorCPF'
import { setTabela, renderTabela } from './BlocklistLista'
import {consulta} from './BlocklistConsultar'

let dialogMsg, dialogTitle, dialogAdd, erroMsg, descriptionMsg, ocultaMenu, epsAtual

let options: IComboBoxOption[] = []
const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: 300 } };

class BlocklistAddUpdate extends React.Component<any, any>{
    constructor(props: {}) {
        super(props);
        this.state = {
            carregaLista: [],
            botaoDesabilitado: this.props.botaoDesabilitado,
            solicitacao: this.props.solicitacao,
        }
        ocultaMenu = true;
    }

    componentWillMount(){
        this.consultaEps()
    }

    componentDidMount() {
        this.prepararRegistro()
        this.setState({ botaoDesabilitado: true })
    }

    consultaEps() {
        consultarEPS().then((eps) => {
            let _options = []
            for (let i = 0; i < eps.data.value.length; i++) {
                _options[i] = { key: eps.data.value[i].Id, text: eps.data.value[i].Title }
                options.push(_options[i])
            }
            this.preencheEps()
        })
    }

    preencheEps(){
        if (this.state.epsProfissional == undefined || this.state.epsProfissional == "")
        {
            this.setState({ epsProfissional: options[0].text })
        } else {
            for(let i = 0; i < options.length; i++){
                if(this.state.epsProfissional == options[i].text)
                {
                    epsAtual = options[i].text
                    this.setState({ epsProfissional: epsAtual })
                }
            }
        }
    }

    validaCamposFormulario() {
        let valido = true

        if (this.state.nomeProfissional == undefined || this.state.nomeProfissional == '') {
            //console.log("nome pendente")
            valido = false
        } else {
            //console.log("nome atual: " + this.state.nomeProfissional)
        }

        if (this.state.epsProfissional == undefined || this.state.epsProfissional == '') {
            //console.log("eps pendente")
            valido = false
        } else {
            //console.log("eps atual: " + this.state.epsProfissional)
        }

        if (this.state.matriculaProfissional == undefined || this.state.matriculaProfissional == '') {
            //console.log("matricula pendente")
            valido = false
        } else {
            //console.log("matricula atual: " + this.state.matriculaProfissional)
        }

        if (this.state.chamadoProfissional == undefined || this.state.chamadoProfissional == '') {
            //console.log("chamado pendente")
            valido = false
        } else {
            //console.log("chamado atual: " + this.state.chamadoProfissional)
        }

        if (valido) {
            this.setState({ botaoDesabilitado: false })
        } else {
            this.setState({ botaoDesabilitado: true })
        }

        //console.log("-----------------------")
    }

    prepararRegistro(){
        if (consulta.data.value.length > 0) {
            this.setState({ nomeProfissional: consulta.data.value[0].Nome })
            this.setState({ cpfProfissional: consulta.data.value[0].CPF })
            this.setState({ epsProfissional: consulta.data.value[0].EPS })
            this.setState({ matriculaProfissional: consulta.data.value[0].Matricula })
            this.setState({ chamadoProfissional: consulta.data.value[0].Chamado })

            dialogTitle = "Resultado da busca"
            dialogMsg = "Profissional encontrado"
            this.setState({ solicitacao: "Atualizar" })
        } else {
            this.setState({ nomeProfissional: undefined })
            this.setState({ cpfProfissional: cpfFinal })
            this.setState({ epsProfissional: undefined })
            this.setState({ matriculaProfissional: undefined })
            this.setState({ chamadoProfissional: undefined })

            dialogTitle = "Resultado da busca"
            dialogMsg = "Profissional não encontrado"
            this.setState({ solicitacao: "Adicionar" })
        }
        ocultaMenu = false
    }

    registrar() {
        if (this.state.solicitacao == "Adicionar") {
            dialogTitle = "Adicionar ao Blocklist"
            dialogMsg = "Deseja mesmo adicionar: " + this.state.cpfProfissional + "?"
        } else {
            dialogTitle = "Atualizar o Blocklist"
            dialogMsg = "Deseja mesmo atualizar: " + this.state.cpfProfissional + "?"
        }
    }

    atualizar() {
        let data = [this.state.cpfProfissional, this.state.nomeProfissional, this.state.epsProfissional, this.state.matriculaProfissional, this.state.chamadoProfissional]

        atualizarEmpregado(data)
            .then(() => {
                consultarEmpregado(this.state.cpfProfissional).then((response) => {
                    setTabela(response)
                    dialogMsg = "Registrado no Blocklist!"
                    this.setState({ ocultarConsulta: false })
                })
            })
    }

    render(){
        let dialogContentProps = {
            type: DialogType.normal,
            title: dialogTitle,
            closeButtonAriaLabel: 'Fechar',
            subText: dialogMsg
        };

        return (
            <div>
                <div hidden={ocultaMenu}>
                    <TextField
                        className={styles['textfield']}
                        value={this.state.nomeProfissional == undefined ? "" : this.state.nomeProfissional}
                        onChanged={(value) => (this.setState({ nomeProfissional: value }, function () { this.validaCamposFormulario() }))}
                        label="Digite o Nome"
                        placeholder="Nome"
                        required={true}
                        errorMessage={this.state.nomeProfissional == undefined ? 'Campo Obrigatório' : ''} />

                    <div className={styles['table-row']}>
                        <ComboBox
                            className={styles['textfield']}
                            label="Selecione o EPS"
                            options={options}
                            value={this.state.epsProfissional}
                            styles={comboBoxStyles}
                            onChanged={(value) => (this.setState({ epsProfissional: value.text }, function () { this.validaCamposFormulario() }))}
                        />
                    </div>

                    <TextField
                        className={styles['textfield']}
                        value={this.state.matriculaProfissional == undefined ? "" : this.state.matriculaProfissional}
                        onChanged={(value) => (this.setState({ matriculaProfissional: value }, function () { this.validaCamposFormulario() }))}
                        label="Digite a Matrícula"
                        placeholder="Número da Matrícula"
                        required={true}
                        errorMessage={this.state.matriculaProfissional == undefined ? 'Campo Obrigatório' : ''} />

                    <TextField
                        className={styles['textfield']}
                        value={this.state.chamadoProfissional == undefined ? "" : this.state.chamadoProfissional}
                        onChanged={(value) => (this.setState({ chamadoProfissional: value }, function () { this.validaCamposFormulario() }))}
                        label="Digite o Chamado"
                        placeholder="SDSCA-"
                        required={true}
                        errorMessage={this.state.chamadoProfissional == undefined ? 'Campo Obrigatório' : ''} />

                    <PrimaryButton text="Registrar" disabled={this.state.botaoDesabilitado} onClick={() => { 
                        this.registrar(), this.setState({ ocultarAdd: false }) }} />

                    <div>
                        <Dialog
                            hidden={this.state.ocultarAdd}
                            dialogContentProps={dialogContentProps}>
                            <DialogFooter>
                                <DefaultButton onClick={() => { this.setState({ ocultarAdd: true }) }} text="Cancelar" />
                                <PrimaryButton text={this.state.solicitacao} onClick={() => {
                                    this.setState({ ocultarAdd: true }), this.atualizar() }} />
                            </DialogFooter>
                        </Dialog>
                    </div>
                    <div>
                        <Dialog
                            hidden={this.state.ocultarConsulta}
                            dialogContentProps={dialogContentProps}>
                            <DialogFooter>
                                <PrimaryButton text="Concluído" onClick={() => { this.setState({ ocultarConsulta: true }) }} />
                            </DialogFooter>
                        </Dialog>
                    </div>
                </div>
            </div>
        );
    }
}

export default BlocklistAddUpdate