import React, { Component } from 'react';

 
 

class  App extends Component {
 constructor(props) {
	super(props);
	this.state = { members: [] ,name: '',age: '',nationality: '' ,editing: 'Submit' ,editid: ''};
	 
	this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	 
	this.deleteRow = (i)=> {
		return fetch('people/'+i,{
			method: 'DELETE',
		}).then(
			fetch("/people").then( (response) => {
				return response.json() }).then( (json) => {
						this.setState({members: json});
						console.log(json);
			}) 
		);
	 }
	 
	 
	 this.editRow = (i)=> {
		console.log(i);
		fetch("/peoplefind/"+i).then( (response) => {
		return response.json() }).then( (json) => {
				this.setState({name: json.name,age: json.age,nationality: json.nationality ,editing: 'Update',editid: i});
				console.log(json);
		});
	 }
	 

	
 }
 
 
 	componentDidMount() {
           fetch("/people").then( (response) => {
                return response.json() }).then( (json) => {
                        this.setState({members: json});
						console.log(json);
                    });
    };
	
	
	 handleChange(event) {
	   this.setState({[event.target.name]: event.target.value});
	}
	
	clrRow(event) {
	   this.setState({name: '',age: '',nationality: '' ,editing: 'Submit',editid: ''});
	}
	
	  handleSubmit(event) {
		 event.preventDefault();  
			
		if(this.state.editing==='Update' &&  this.state.editid!==''){
			return fetch('people/'+this.state.editid, {
				 method: 'PUT',
				 headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				  },
				 body: JSON.stringify({name:this.state.name,age:this.state.age,nationality:this.state.nationality})
			}).then(
				 fetch("/people").then( (response) => {
					return response.json() }).then( (json) => {
							this.setState({members: json,name: '',age: '',nationality: '',editing: 'Submit',editid: ''});
							console.log(json);
				 })
			);
		}else{
			return fetch('person/', {
				 method: 'POST',
				 headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				  },
				 body: JSON.stringify({name:this.state.name,age:this.state.age,nationality:this.state.nationality})
			}).then(
				 fetch("/people").then( (response) => {
					return response.json() }).then( (json) => {
							this.setState({members: json,name: '',age: '',nationality: '',editing: 'Submit'});
							console.log(json);
				 })
			);
		}
	  }

 
 
 render() {
    return (
       <div className="row">
  
                
				<div className="col-lg-12">
					<div className="panel panel-primary">
						<div className="panel-heading">
							Add Users
						</div>
						<div className="panel-body">
							<div className="row">
								<div className="col-lg-6">
									 <form onSubmit={this.handleSubmit}>
									<div className="form-group">
										<input className="form-control" placeholder="Name"  name="name"  value={this.state.name} onChange={this.handleChange} />
									</div>
									<div className="form-group">
										<input className="form-control" placeholder="Age"  name="age"   value={this.state.age} onChange={this.handleChange} />
									</div>
									
									
									<div className="form-group">
										<input className="form-control" placeholder="nationality" name="nationality"  value={this.state.nationality} onChange={this.handleChange}  />
									</div>
									
									<button  type="submit" value="Submit"  className="btn btn-primary">{this.state.editing} </button> &nbsp;&nbsp;
									<button    className="btn btn-primary"  onClick={(e) => this.clrRow( e)}>Clear </button>
									</form>
								</div>
							</div>
						   
						</div>
					</div>
				</div>
				
				
				<p>-</p><p>-</p>
				
				
				
				<div className="col-lg-12">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            Users
							
							
							
							
                        </div>
                       
                        <div className="panel-body">
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Age</th>
                                            <th>Nationality</th>
											 <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
									{this.state.members.map(member =>
										<tr key={member._id}>
                                            <td>{member._id}</td>
                                            <td>{member.name}</td>
                                            <td>{member.age}</td>
                                            <td>{member.nationality}</td>
											 <th>
												
												<button type="button" className="btn btn-warning btn-circle" onClick={(e) => this.editRow(member._id, e)}><i className="fa fa-pencil"></i>  </button>&nbsp;&nbsp;
												<button type="button" className="btn btn-danger btn-circle" onClick={(e) => this.deleteRow(member._id, e)}><i className="fa fa-times"></i> </button>&nbsp;&nbsp;
												 
											 
											 </th>
                                        </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                             
                        </div>
                         
                    </div>
                    
                </div>
                
            </div>
           
    );
  }
}

export default App;
