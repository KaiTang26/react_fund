var React = require('react');
var PropTypes = require("prop-types");
var Link = require('react-router-dom').Link;

function PlayerPreview(props){

    return(
        <div>
            <div className='column'>
                <img
                    className='avatar'
                    src={props.avatar}
                    alt={`Avater for ${props.username}`}/>
                <h2 className='username'>
                    @{props.username}
                </h2>
            </div>
            <button className='reset' onClick={props.onReset.bind(null, props.id)}>Reset</button>
        </div>
    )

}

PlayerPreview.prototypes={
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
}



class PlayerInput extends React.Component{

    constructor(props){
        super(props);
        this.state={
            name:''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);

    }

    handleChange(e){
        var value = e.target.value;
        console.log(value);
        this.setState(function(){
            return(
                {name:value}
            )
        })
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.handleSubmit(this.props.id, this.state.name);

        

    }

    render(){
        return(
            <form className="column" onSubmit={this.handleSubmit}>
                <label className="header" htmlFor='name'>
                {this.props.lable}
                </label>
                <input id='name' placeholder='github username' type='text' autoComplete='off' value={this.state.name} onChange={this.handleChange}/>
                <button className='button' type='submit' disabled={!this.state.name}>
                    Submit
                </button>
                

            </form>
            
        )
    }
}

PlayerInput.prototypes={
    id: PropTypes.string.isRequired,
    lable: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired
}


class Battle extends React.Component{
    constructor(props){
        super(props);
        this.state={
            playerOneName:"",
            playerTwoName:"",
            playerOneImage: null,
            playerTwoImage: null

        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);

    }

    handleSubmit(id, userName){
        this.setState(function(){
            var newState=[];
            newState[id+'Name']=userName;
            newState[id+'Image']=`https://github.com/${userName}.png?size=200`;
            return newState;
        })
    }

    handleReset(id){
        this.setState(function(){
            var newState=[];
            newState[id+'Name']='';
            newState[id+'Image']=null;
            return newState;
            
        })
    }
    render(){
        var match = this.props.match;
        var playerOneName = this.state.playerOneName;
        var playerTwoName = this.state.playerTwoName;
        var playerOneImage = this.state.playerOneImage;
        var playerTwoImage = this.state.playerTwoImage;
        return(
            <div>
                <div className='row'>
                {!playerOneName && <PlayerInput id='playerOne' lable='Player One' handleSubmit={this.handleSubmit} />}
                {playerOneImage !== null && <PlayerPreview avatar={playerOneImage} username={playerOneName} id='playerOne' onReset={this.handleReset}/>}

                {!playerTwoName && <PlayerInput id='playerTwo' lable='Player Two' handleSubmit={this.handleSubmit}/>}
                {playerTwoImage !== null && <PlayerPreview avatar={playerTwoImage} username={playerTwoName} id='playerTwo' onReset={this.handleReset}/>}

                </div>
                {playerTwoImage && playerOneImage && 
                 <Link className='button' 
                        to={{
                            pathname: match.url+'/results',
                            search:'?playeronename='+playerOneName+'&playertwoname='+playerTwoName
                        }}>
                 Battle
                </Link>}


            </div>
        )
    }

}

module.exports= Battle;