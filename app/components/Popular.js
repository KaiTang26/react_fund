var React = require('react');

class Popular extends React.Component{

    render(){
        var language = ["All", "Jave", "Python", "Javascript"];
        return(
            <div>
                <ul>
                    {language.map(function(lang, index){
                        return (
                            <li key={index}>
                                {lang}
                            </li>
                        )
                    })}
                </ul>  
            </div>
        )
    }
}

module.exports = Popular;