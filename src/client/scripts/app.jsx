import React from 'react';
import {Bond} from 'oo7';
import {Rspan} from 'oo7-react';
import {InputBond} from 'parity-reactive-ui';
import {formatBalance} from 'oo7-parity';

export class App extends React.Component {
	render() {
		return (
			<div>
				gavofyork's address is&nbsp;
				<Rspan>{parity.bonds.registry.lookupAddress('gavofyork', 'A')}</Rspan>
			</div>
		);
	}
}
