import * as React from 'react';
import styles from './Blocklist.module.scss';
import { IBlocklistProps } from './IBlocklistProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { PrimaryButton, DefaultButton, DialogType, Dialog, DialogFooter } from 'office-ui-fabric-react';
import { cpfFinal, cpfValidado } from './ValidadorCPF'
import { deletarEmpregado } from './Axios'
import { setTabela, renderTabela } from './BlocklistLista'
import {consulta} from './BlocklistConsultar'

let dialogMsg, dialogTitle, erroMsg, descriptionMsg, ocultaMenu

class BlocklistExcluir extends React.Component<any, any>{
    constructor(props: {}) {
        super(props);
        this.state = {
            carregaLista: [],
            cpfProfissional: this.props.cpfProfissional,
            ocultarConsulta: this.props.ocultarConsulta,
            ocultarExcluir: this.props.ocultarExcluir,
            profissionalAtual: this.props.profissionalAtual,
        }

        ocultaMenu = true
    }

    componentDidMount() {
        this.prepararDeletar()
    }

    prepararDeletar(){
         this.setState({profissionalAtual : consulta}, function(){
            dialogTitle = "Excluir"
            dialogMsg = "Deseja mesmo excuir: " + cpfFinal + "?"
            this.setState({ ocultarExcluir: false })
        })
    }

    deletar() {
        deletarEmpregado(this.state.profissionalAtual.data.value[0].Id).then(() => {
            dialogMsg = "Funcionário removido do Blocklist"
            this.setState({ ocultarConsulta: false })
        })
    }

    render() {
        let dialogContentProps = {
            type: DialogType.normal,
            title: dialogTitle,
            closeButtonAriaLabel: 'Fechar',
            subText: dialogMsg
        };

        return (
            <div>
                <div>
                    <Dialog
                        hidden={this.state.ocultarExcluir}
                        dialogContentProps={dialogContentProps}
                    >
                        <DialogFooter>
                            <DefaultButton  text="Cancelar" onClick={() => { this.setState({ ocultarExcluir: true }) }} />
                            <PrimaryButton text="Excluir" onClick={() => {
                                this.setState({ ocultarExcluir: true })
                                this.deletar()
                            }} />
                        </DialogFooter>
                    </Dialog>

                    <Dialog
                        hidden={this.state.ocultarConsulta}
                        dialogContentProps={dialogContentProps}
                    >
                        <DialogFooter>
                            <PrimaryButton  text="Concluir" onClick={() => { this.setState({ ocultarConsulta: true }) }} />
                        </DialogFooter>
                    </Dialog>
                </div>
            </div>
        );
    }
}

export default BlocklistExcluir