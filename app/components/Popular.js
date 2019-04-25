var React = require('react');

class Popular extends React.Component{

    constructor(props){
        super(props);
        this.state={
            selectedLang: "All"
        };
        //this.handleLangUpdate = this.handleLangUpdate.bind(this);
    }

    handleLangUpdate(lang){
        this.setState(function(){
            return {
                selectedLang: lang}
        })
    }
    
    render(){
        var language = ["All", "Javascript", "Ruby", "Java", "CSS", "Python"];
        return(
                <ul className="language">
                    {language.map(function(lang, index){
                        return (
                            <li key={index} 
                                onClick={this.handleLangUpdate.bind(this,lang)}
                                style={lang === this.state.selectedLang ? {color: "#d0021b"}: null}>
                                {lang}
                            </li>
                        )
                    }, this)}
                </ul>  
        )
    }
}

module.exports = Popular;