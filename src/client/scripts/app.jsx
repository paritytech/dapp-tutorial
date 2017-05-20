import React from 'react';
import {Rspan} from 'oo7-react';
import {bonds, ether} from 'oo7-parity';
import {InlineAccount, TransactButton} from 'parity-reactive-ui';

export class App extends React.Component {
	render() {
		return (<div>
			Block height is <Rspan>{bonds.height}</Rspan>.
			You are <InlineAccount address={bonds.me}/>.
			<TransactButton
				content='Give Gav 1 ether'
				tx={{
					to: bonds.registry.lookupAddress('gavofyork', 'A'),
					value: 1000000000000000000
				}}
			/>
		</div>);
	}
}
