import * as React from 'react';
import styles from './Blocklist.module.scss';
import { IBlocklistProps } from './IBlocklistProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { PrimaryButton, DefaultButton} from 'office-ui-fabric-react';
import { initializeContext, consultarGrupo } from './Axios';
import BlocklistConsultar from './BlocklistConsultar'
import BlocklistADM from './BlocklistADM'

export let grupo

class Blocklist extends React.Component<any, any>{
  constructor(props: {}) {
    super(props);
    this.state = {
      menuAtual: this.props.menuAtual,
    }
  }

  componentDidMount() {
    let contexto = this.props.pageContext.web.absoluteUrl
    initializeContext(contexto)

    consultarGrupo().then((_grupo) => {
      if (_grupo == "admin") {
        grupo = "Administração"
        this.setState({ menuAtual: grupo })
      }
      else if (_grupo == "visitante"){
        grupo = "Consulta"
        this.setState({ menuAtual: grupo })
      }

      else {
        this.setState({ menuAtual: undefined })
      }
    })
  }

  render() {
    return (
      <div>
        <div><label>BLOCKLIST EPS - {this.state.menuAtual}</label></div>
        <div>
          {this.state.menuAtual == "Administração" ? <BlocklistADM /> : <div></div>}
          {this.state.menuAtual == "Consulta" ? <BlocklistConsultar /> : <div></div>}
          {this.state.menuAtual == undefined ? <div>Visualização não disponível. Solicite acesso ao time de Tráfego.</div> : <div></div>}
        </div>
      </div>
    );
  }
}

export default Blocklist