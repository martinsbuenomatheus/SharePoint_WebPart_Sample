import * as React from 'react';
import styles from './Blocklist.module.scss';
import { IBlocklistProps } from './IBlocklistProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react';
import BlocklistConsultar from './BlocklistConsultar'
import BlocklistTodos from './BlocklistTodos'

class BlocklistADM extends React.Component<any, any>{
    constructor(props: {}) {
        super(props);
        this.state = {
            menuAtual: this.props.menuAtual,
        }
    }

    componentDidMount() {
        if (this.state.menuAtual !== undefined) {
            this.setState({ menuAtual: "consultar" })
        }
        else
            this.setState({ menuAtual: "consultar" })
    }

    render() {
        return (
            <div>
                <div>
                    <DefaultButton text="Consultar Profissional" onClick={() => { this.setState({menuAtual:"consultar"}) }} 
                        className={this.state.menuAtual == "consultar" ? styles['selected'] : styles['unselected']}/>

                    <DefaultButton text="Consultar Todos" onClick={() => { this.setState({menuAtual:"lista"}) }} 
                        className={this.state.menuAtual == "lista" ? styles['selected'] : styles['unselected']}/>
                </div>
                
                {this.state.menuAtual =="consultar"?<BlocklistConsultar/>:<div></div>}
                {this.state.menuAtual =="lista"?<BlocklistTodos/>:<div></div>}
            </div>
        );
    }
}

export default BlocklistADM