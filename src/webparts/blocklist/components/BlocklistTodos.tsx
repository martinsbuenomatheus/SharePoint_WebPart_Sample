import * as React from 'react';
import styles from './Blocklist.module.scss';
import { IBlocklistProps } from './IBlocklistProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {consultarLista} from './Axios'
import { setTabela, renderTabela } from './BlocklistLista'

class BlocklistTodos extends React.Component<any, any>{
    constructor(props: {}) {
        super(props);
        this.state = {
            carregaLista: [],
        }
    }

    componentDidMount() {
        this.verLista()
    }

    verLista() {
        consultarLista()
            .then((lista) => {
                setTabela(lista)
                this.setState({ carregaLista : lista})
            })
    }

    render() {
        return (
            <div>{renderTabela()}</div>
        );
    }
}

export default BlocklistTodos