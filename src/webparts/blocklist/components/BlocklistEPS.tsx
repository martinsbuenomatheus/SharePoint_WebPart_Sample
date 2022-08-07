import * as React from 'react';
import styles from './Blocklist.module.scss';
import { IBlocklistProps } from './IBlocklistProps';
import { escape } from '@microsoft/sp-lodash-subset';
import BlocklistConsultar from './BlocklistConsultar'

class BlocklistEPS extends React.Component<any, any>{
    constructor(props: {}) {
        super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <BlocklistConsultar/>
      </div>
    );
  }
}

export default BlocklistEPS