import * as React from 'react';
import styles from './Blocklist.module.scss';
import { IBlocklistProps } from './IBlocklistProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {consultarLista} from './Axios'

let lista = []

export function setTabela(valores){
    lista = valores.data.value
}

export function renderTabela(){
    return (
        <div className={styles['table-master']}>

            <div className={styles['table-header']}>
                <div className={styles['table-row']}>
                    <div className={styles['table-cell']}>Nome</div>
                    <div className={styles['table-cell']}>CPF</div>
                    <div className={styles['table-cell']}>EPS</div>
                    <div className={styles['table-cell']}>Matrícula</div>
                    <div className={styles['table-cell']}>Chamado</div>
                </div>
            </div>

            <div className={styles['table-body']}>
                {lista.map((item, i) =>
                    <div className={styles['table-row']}>
                        <div className={styles['table-cell']}>{item.Nome}</div>
                        <div className={styles['table-cell']}>{item.CPF}</div>
                        <div className={styles['table-cell']}>{item.EPS}</div>
                        <div className={styles['table-cell']}>{item.Matricula}</div>
                        <div className={styles['table-cell']}>{item.Chamado}</div>
                    </div>
                )}
            </div>

        </div>
    );

}