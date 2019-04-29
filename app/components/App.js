var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var Popular = require('./Popular');


class App extends React.Component{
    render(){

        return(
            <Router>
                <div className='container'>
                    <ul className='nav'>
                        <li className='nav-item'>
                            <Link to="/">Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="/battle">Battle</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="/popular">Popular</Link>
                        </li>
                    </ul>

                    <Route path="/popular" component={Popular}/>
                
                </div>
            </Router>
        )
        
    }
}

module.exports = App;