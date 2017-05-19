import React from 'react';
<<<<<<< HEAD
=======
import {Rspan} from 'oo7-react';
import {bonds} from 'oo7-parity';
import {InlineAccount} from 'parity-reactive-ui';
>>>>>>> local

export class App extends React.Component {
	render() {
		return (<div>
<<<<<<< HEAD
			Hello world!
=======
			Block height is <Rspan>{bonds.height}</Rspan>.
			<br/>
			You are <InlineAccount address={bonds.me}/>.
>>>>>>> local
		</div>);
	}
}
