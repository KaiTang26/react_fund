var React = require('react');
var PropTypes = require("prop-types");
var api = require("../utils/api");

function SelectLanguage(props){
    var language = ["All", "Javascript", "Ruby", "Java", "CSS", "Python", "Apex"];
    return(
        <ul className="language">
            {language.map(function(lang, index){
                return (
                    <li key={index} 
                        onClick={props.handleLangUpdate.bind(null, lang)}
                        style={lang === props.selectedLang ? {color: "#d0021b"}: null}>
                        {lang}
                    </li>
                )
            })}
        </ul>  
)}

function RepoGrid(props){
    return(
       
        <ul className='popular-list'>
        {props.repo.map(function (repo, index) {
            return (
            <li key={repo.name} className='popular-item'>
                <div className='popular-rank'>#{index + 1}</div>
                <ul className='space-list-items'>
                <li>
                    <img
                    className='avatar'
                    src={repo.owner.avatar_url}
                    alt={'Avatar for ' + repo.owner.login}
                    />
                </li>
                <li><a href={repo.html_url}>{repo.name}</a></li>
                <li>@{repo.owner.login}</li>
                <li>{repo.stargazers_count} stars</li>
                </ul>
            </li>
            )
        })}
    </ul>

    )}

RepoGrid.propTypes={
    repo: PropTypes.array.isRequired
}

SelectLanguage.propTypes={
    selectedLang: PropTypes.string.isRequired,
    handleLangUpdate: PropTypes.func.isRequired
};

class Popular extends React.Component{

    constructor(props){
        super(props);
        this.state={
            selectedLang: "All",
            repo: null
        };
        this.handleLangUpdate = this.handleLangUpdate.bind(this);
    }

    componentDidMount(){

        this.handleLangUpdate(this.state.selectedLang);

    }

    handleLangUpdate(lang){
        this.setState(function(){
            return {
                selectedLang: lang,
                repo: null}
        });

        api.fetchPopularRepos(lang)
            .then(function(resp){
                console.log(this);
                this.setState(function(){
                    
                    return({repo: resp})
                })
            }.bind(this));
        
    }
    
    render(){
        
        return (
            <div>
                <SelectLanguage handleLangUpdate={this.handleLangUpdate} selectedLang={this.state.selectedLang}/>
                {
                    !this.state.repo ? <p>Loading</p> : <RepoGrid repo={this.state.repo}/>
                }
            </div>)
    }
}

module.exports = Popular;