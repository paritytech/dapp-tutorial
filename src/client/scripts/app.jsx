import React from 'react';
import {Rspan} from 'oo7-react';
import {bonds} from 'oo7-parity';
import {InlineAccount} from 'parity-reactive-ui';

export class App extends React.Component {
	render() {
		return (<div>
			Block height is <Rspan>{bonds.height}</Rspan>.
			<br/>
			You are <InlineAccount address={bonds.me}/>.
		</div>);
	}
}
