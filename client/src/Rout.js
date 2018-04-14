import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import App from './App';
import './Style.css';


class Rout extends Component {
   render() {
      return (
         <Router>
				<div>
				 <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
				  <div class="container">
					<a class="navbar-brand js-scroll-trigger" href="#page-top">MERN CURD</a>
					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
					  <span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarResponsive">
					  <ul class="navbar-nav ml-auto">
						   <li><Link to={'/'} class="nav-link js-scroll-trigger">Home</Link></li>
						   <li><Link to={'/User'} class="nav-link js-scroll-trigger">User</Link></li>
						   <li><Link to={'/About'} class="nav-link js-scroll-trigger">About</Link></li>
					  </ul>
					</div>
				  </div>
				</nav>
				 
				   
				    <section id="about">
					  <div class="container">
						<div class="row">
						  <div class="col-lg-8 mx-auto">
				   
							   <Switch>
								   <Route exact path='/' component={Home} />
								   <Route exact path='/About' component={About} />
								   <Route exact path='/User' component={App} />
							   </Switch>
						
							</div>
						</div>
					  </div>
					</section>	   
							   
				
				
				
				</div>
			 </Router>
      );
   }
}
export default Rout;
