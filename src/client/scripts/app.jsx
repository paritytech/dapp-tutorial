import React from 'react';
import {Bond} from 'oo7';
import {Rspan} from 'oo7-react';
import {InputBond} from 'parity-reactive-ui';
import {formatBalance} from 'oo7-parity';

export class App extends React.Component {
	render() {
		return (
			<div>
				Default account:&nbsp;
				<Rspan>{parity.bonds.me}</Rspan>&nbsp;
				<br/>Given the name of&nbsp;<Rspan>
					{parity.bonds.accountsInfo[parity.bonds.me].name}
				</Rspan>
				<br/>With a balance of&nbsp;
				<Rspan>
					{parity.bonds.balance(parity.bonds.me).map(formatBalance)}
				</Rspan>
			</div>
		);
	}
}
