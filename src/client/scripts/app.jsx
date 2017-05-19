import React from 'react';
import {Bond} from 'oo7';
import {Rspan, Rimg, ReactiveComponent} from 'oo7-react';
import {InputBond, HashBond, BButton, TransactionProgressLabel, AccountIcon, TransactButton} from 'parity-reactive-ui';
import {formatBalance, isNullData} from 'oo7-parity';

const CounterABI = [
	{"constant":false,"inputs":[{"name":"_option","type":"uint256"}],"name":"vote","outputs":[],"payable":false,"type":"function"},
	{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"hasVoted","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},
	{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"votes","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},
	{"anonymous":false,"inputs":[{"indexed":true,"name":"who","type":"address"},{"indexed":true,"name":"option","type":"uint256"}],"name":"Voted","type":"event"}
];
const CounterCode = '\
0x6060604052341561000c57fe5b5b61017d8061001c6000396000f300606060405263fffff\
fff60e060020a6000350416630121b93f811461003757806309eef43e1461004c5780635df8\
13301461007c575bfe5b341561003f57fe5b61004a6004356100a1565b005b341561005457f\
e5b610068600160a060020a036004351661012a565b60408051911515825251908190036020\
0190f35b341561008457fe5b61008f60043561013f565b60408051918252519081900360200\
190f35b600160a060020a03331660009081526001602052604090205460ff16156100c85760\
006000fd5b60008181526020818152604080832080546001908101909155600160a060020a0\
3331680855292819052818420805460ff191690911790555183927f4d99b957a2bc29a30ebd\
96a7be8e68fe50a3c701db28a91436490b7d53870ca491a35b50565b6001602052600090815\
2604090205460ff1681565b600060208190529081526040902054815600a165627a7a723058\
20ef4d0d5cd232790fab92fcd67c633d228600212c1f337d0c68622f19f106c7fc0029';
const Options = ['Red', 'Green', 'Blue'];

class VoteOption extends ReactiveComponent {
	constructor () {
		super(['votes', 'enabled', 'already']);
	}
	readyRender () {
		var s = {float: 'left', minWidth: '3em'};
		if (!this.state.enabled)
			s.cursor = 'not-allowed';
		return (<span style={{ borderLeft:
			`${1 + this.state.votes * 10}px black solid` }}>
			<a
				style={s}
				href='#'
				onClick={this.state.enabled && this.props.vote}>
				{this.props.label}
			</a>
			{this.state.already.map(a => (<AccountIcon
				style={{width: '1.2em', verticalAlign: 'bottom', marginLeft: '1ex'}}
				key={a}
				address={a}
			/>))}
		</span>);
	}
}

export class Counter extends React.Component {
	constructor() {
		super();
		this.state = { tx: null };
	}
	componentWillMount () { this.componentWillReceiveProps(this.props); }
	componentWillReceiveProps (props) {
		this.voted = this.props.contract.hasVoted(parity.bonds.me);
		this.prevVote = this.props.contract.Voted({ who: parity.bonds.me });
		this.prevVotes = this.props.contract.Voted({ who: parity.bonds.accounts });
	}
	render () {
		var votingEnabled = Bond.all([this.voted, this.state.tx])
			.map(([v, t]) => !v && (!t || !!t.failed));
		return (<div>
			{Options.map((n, i) => (<div key={i}><VoteOption
				label={n}
				votes={this.props.contract.votes(i)}
				vote={() => this.setState({tx: this.props.contract.vote(i)})}
				enabled={votingEnabled}
				already={this.prevVotes.map(a => a.filter(x => x.option == i).map(x => x.who))}
			/></div>))}
			<div style={{marginTop: '1em'}}>
				<TransactionProgressLabel value={this.state.tx}/>
			</div>
			<Rspan>
				{this.prevVote.map(v => v.length > 0 ? `Already voted for ${Options[v[0].option]}` : '')}
			</Rspan>
		</div>);
	}
}

export class App extends React.Component {
	constructor () {
		super();
		this.state = { counter: null };
		this.deploy = this.deploy.bind(this);
	}
	deploy () {
		let tx = parity.bonds.deployContract(CounterCode, CounterABI);
		tx.done(s => this.setState({ counter: s.deployed }));
		return tx;
	}
	render () {
		return (<div>
			{!!this.state.counter
				? <Counter contract={this.state.counter} />
				: <div>
					<TransactButton content='Deploy' tx={this.deploy} statusText/>
				</div>
			}
		</div>);
	}
}
