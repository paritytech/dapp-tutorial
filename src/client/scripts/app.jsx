import React from 'react';
import {Bond} from 'oo7';
import {Rspan} from 'oo7-react';
import {InputBond} from 'parity-reactive-ui';
import {bonds, formatBalance} from 'oo7-parity';

export class App extends React.Component {
	render() {
		return (
			<div>
        Default account: &nbsp;
        <Rspan>
          {bonds.me}
        </Rspan>
        <br/>Given the name of&nbsp;
        <Rspan>
          {bonds.accountsInfo[bonds.me].name}
        </Rspan>
        <br/>With a balance of&nbsp;
        <Rspan>
          {bonds.balance(bonds.me).map(formatBalance)}
        </Rspan>
			</div>
		);
	}
}
