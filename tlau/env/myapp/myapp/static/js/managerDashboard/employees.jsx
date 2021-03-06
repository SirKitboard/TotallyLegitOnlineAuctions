var AddEditEmployee = React.createClass({
    getInitialState : function(){
        return {
            firstName : this.props.employee ? this.props.employee.firstName : "",
            lastName : this.props.employee ? this.props.employee.lastName : "",
            ssn : this.props.employee ? this.props.employee.ssn : "",
            address : this.props.employee ? this.props.employee.address : "",
            city : this.props.employee ? this.props.employee.city : "",
            state : this.props.employee ? this.props.employee.state : "",
            telephone : this.props.employee ? this.props.employee.telephone : "",
            startDate : this.props.employee ? this.props.employee.startDate : "",
            hourlyRate : this.props.employee ? this.props.employee.hourlyRate : "",
            type : this.props.employee ? this.props.employee.type : 1,
            username : this.props.employee ? this.props.employee.username : "",
            zipCode : this.props.employee ? this.props.employee.zipCode : "",
            error : 0
        }
    },
    componentDidMount : function() {
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        });
    },
    verifyPassword : function() {
        this.setState({
            'error' : 1,
            saving : false
        });
        var password = ReactDOM.findDOMNode(this.refs.password).value
        var password_r = ReactDOM.findDOMNode(this.refs.password_r).value
        if(password != password_r) {
            this.setState({
                error : 2
            })
            // this.forceUpdate();
        }
    },
    close : function() {
        this.props.onClose();
    },
    createEmployee : function() {

        var dateString = ReactDOM.findDOMNode(this.refs.startDate).value
        // debugger;
        if(this.state.error != 1) {
            // console.log(this.state.error);
            return;
        }
        // };
        var type = $('#isManager').is(':checked') ? 0 : 1
        var params = {
            firstName : ReactDOM.findDOMNode(this.refs.first_name).value,
            lastName : ReactDOM.findDOMNode(this.refs.last_name).value,
            username : ReactDOM.findDOMNode(this.refs.username).value.toLowerCase(),
            password : ReactDOM.findDOMNode(this.refs.password).value,
            address : ReactDOM.findDOMNode(this.refs.address).value,
            city : ReactDOM.findDOMNode(this.refs.city).value,
            state : ReactDOM.findDOMNode(this.refs.state).value,
            zipCode : ReactDOM.findDOMNode(this.refs.zipCode).value,
            telephone : ReactDOM.findDOMNode(this.refs.phone).value,
            startDate : new Date(dateString).toISOString().slice(0,10),
            hourlyRate : ReactDOM.findDOMNode(this.refs.hourlyRate).value,
            type : type,
            ssn : ReactDOM.findDOMNode(this.refs.ssn).value,
        };
        this.setState({
            saving: true
        })

        console.log(params);

        var self = this;
        $.ajax({
            url : '/api/employees',
            method: 'POST',
            data : params,
            success : function(response) {
                // window.location.href = '/#modalLogin'
                self.setState({
                    saving : false
                });
                self.props.onSubmit()
            },
            error : function() {
                self.setState({
                    saving : false
                })
            }
        });
    },
    updateEmployee : function() {
        // var dateString = ReactDOM.findDOMNode(this.refs.startDate).value
        // debugger;
        // if(this.state.error != 1) {
        //     // console.log(this.state.error);
        //     return;
        // }
        // };
        var type = $('#isManager').is(':checked') ? 0 : 1
        if(this.props.employee.id == window.currentUser.id) {
            type = window.currentUser.employeeType
        }
        var params = {
            firstName : ReactDOM.findDOMNode(this.refs.first_name).value,
            lastName : ReactDOM.findDOMNode(this.refs.last_name).value,
            address : ReactDOM.findDOMNode(this.refs.address).value,
            city : ReactDOM.findDOMNode(this.refs.city).value,
            state : ReactDOM.findDOMNode(this.refs.state).value,
            zipCode : ReactDOM.findDOMNode(this.refs.zipCode).value,
            telephone : ReactDOM.findDOMNode(this.refs.phone).value,
            hourlyRate : ReactDOM.findDOMNode(this.refs.hourlyRate).value,
            type : type,
            ssn : ReactDOM.findDOMNode(this.refs.ssn).value,
        };
        this.setState({
            saving: true
        });

        console.log(params);

        var self = this;
        $.ajax({
            url : '/api/employees/'+this.props.employee.id,
            method: 'PUT',
            data : params,
            success : function(response) {
                // window.location.href = '/#modalLogin'
                self.setState({
                    saving : false
                });
                self.props.onSubmit()
            },
            error : function() {
                self.setState({
                    saving : false
                })
            }
        });
    },
    render : function() {
        if(this.state.saving) {
            return (
                <div className="modal-content">
                    <div className="preloader-wrapper big active">
                       <div className="spinner-layer spinner-blue-only">
                         <div className="circle-clipper left">
                           <div className="circle"></div>
                         </div><div className="gap-patch">
                           <div className="circle"></div>
                         </div><div className="circle-clipper right">
                           <div className="circle"></div>
                         </div>
                       </div>
                   </div>
                 </div>
            )
        }
        var passwordClasses = ''
            if(this.state.error == 2) {
                passwordClasses = 'invalid'
            } else if (this.state.error == 1) {
                passwordClasses = 'valid'
            }
        var userDiv = "";
        var passwordDiv = ""
        var startDateDiv = (
            <div className="input-field col s6 m6">
                <input type="date" ref="startDate" id="startDate" disabled={this.props.employee ? true : false} className="datepicker"/>
                <label htmlFor="startDate">Start Date</label>
            </div>
        )
        var submitButton = (
            <button onClick={this.createEmployee} className="btn waves-effect waves-light" id='login' type="submit" name="action">Submit
                <i className="material-icons right">send</i>
            </button>
        );
        var classActive = "";
        if(this.props.employee) {
            classActive = "active";
            startDateDiv = "";
            submitButton = (
                <button  onClick={this.updateEmployee} style={{margin:'0 5px'}} className="btn waves-effect waves-light" id='login' type="submit" name="action">Submit
                    <i className="material-icons right">send</i>
                </button>
            )
        } else {
            userDiv = (
                <div className="row">
                    <div className="input-field col s12">
                        <input ref="username" id="username" type="text" className="validate"/>
                        <label htmlFor="username">Username</label>
                    </div>
                </div>
            );
            passwordDiv = (
                <div className="row">
                    <div className="input-field col s12 m6">
                        <input onChange={this.verifyPassword} ref="password" type="password" id="password" ref="password" className={passwordClasses}/>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="input-field col s12 m6">
                        <input onChange={this.verifyPassword} data-error="Passwords dont match" data-success='Passwords match!' ref="password_r" id="password_r" type="password" className={passwordClasses}/>
                        <label htmlFor="password_r">Repeat Password</label>
                    </div>
                </div>
            )
        }
        var typeInputs = (
            <div className="row">
                <p className="col s6 m3 employment-type">
                    <input name="group1" type="radio" id="isRep" defaultChecked={this.state.type == 1}/>
                    <label htmlFor="isRep">Customer Rep</label>
                </p>
                <p className="col s6 m3">
                    <input name="group1" type="radio" id="isManager" defaultChecked={this.state.type == 0}/>
                    <label htmlFor="isManager">Manager</label>
                </p>
            </div>
        )
        if(this.props.employee && this.props.employee.id == window.currentUser.id) {
            typeInputs = "";
        }
        return (
            <div>
                <div className="modal-content container edit-customer">
                    <div className="row">
                        <h4>Edit Employee Info</h4>
                    </div>
                    <div className="row contact header">
                        <span>Contact Info&nbsp;</span>
                        <i className="material-icons">info_outline</i>
                    </div>
                    <div className="row">
                        <div className="input-field col s12 m6">
                            <input ref="first_name" id="first_name" type="text" className="validate" defaultValue={this.state.firstName}/>
                            <label className={classActive} htmlFor="first_name">First Name</label>
                        </div>
                        <div className="input-field col s12 m6">
                            <input ref="last_name" id="last_name" type="text" className="validate" defaultValue={this.state.lastName}/>
                            <label className={classActive} htmlFor="last_name">Last Name</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12 m6">
                            <input ref="phone" id="phone" type="tel" className="validate" defaultValue={this.state.telephone}/>
                            <label className={classActive} htmlFor="phone">Phone</label>
                        </div>
                        <div className="input-field col s12 m6">
                            <input ref="ssn" id="ssn" type="tel" className="validate" defaultValue={this.state.telephone}/>
                            <label className={classActive} htmlFor="phone">SSN</label>
                        </div>
                    </div>
                    <div className="row employment header">
                        <span>Employment Info&nbsp;</span>
                        <i className="material-icons">work</i>
                    </div>
                    <div className="row">
                        <div className="input-field col s6 m6">
                            <input defaultValue={this.state.hourlyRate} type="number" step="0.01" min="0" ref="hourlyRate" id="hourlyRate" className="validate"/>
                            <label className={classActive} htmlFor="hourlyRate">Hourly Rate</label>
                        </div>
                        {startDateDiv}
                    </div>
                    {typeInputs}
                    <div className="row account header">
                        <span>Account Info&nbsp;</span>
                        <i className="material-icons">vpn_key</i>
                    </div>
                    {userDiv}
                    {passwordDiv}
                    <div className="row address header">
                        <span>Address Info&nbsp;</span>
                        <i className="material-icons">home</i>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input ref="address" id="address" type="text" className="validate" defaultValue={this.state.address}/>
                            <label className={classActive} htmlFor="address">Address</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input ref="city" id="city" type="text" className="validate" defaultValue={this.state.city}/>
                            <label className={classActive} htmlFor="city">City</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12 m6">
                            <input ref="state" id="state" type="text" className="validate" defaultValue={this.state.state}/>
                            <label className={classActive} htmlFor="state">State</label>
                        </div>
                        <div className="input-field col s12 m6">
                            <input ref='zipCode' id="zipcode" type="number" className="validate" defaultValue={this.state.zipCode}/>
                            <label className={classActive} htmlFor="zipCode">ZipCode</label>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button onClick={this.close} className="btn waves-effect waves-light" id='login' type="submit" name="action">
                        <span>Close</span>
                        <i className="material-icons right">clear</i>
                    </button>
                    {submitButton}
                </div>
            </div>
        )
    }
})

var Employees = React.createClass({
    getInitialState : function() {
        return {
            employees : [],
            filteredEmployees : [],
            openEditModal : false,
            selectedEmployee : null
        }
    },
    componentDidMount : function() {
        this.reloadEmployees();
        $(".modal-trigger").leanModal();
    },
    openAddModal : function() {
        this.setState({
            openEditModal : true
        });
        $("#modalAddEmployee").openModal();
    },
    reloadEmployees : function() {
        var self = this;
        $.ajax({
            url: '/api/employees',
            method: 'GET',
            success: function(response){
                self.setState({
                    employees : response,
                    filteredEmployees : response
                });
                // console.log(response);
            }
        });
    },
    editEmployee : function(e) {
        var employeeID = e.target.getAttribute('data-id');
        var employee = _.find(this.state.employees, function(employee) {
            return employee.id == employeeID
        });
        this.setState({
            selectedEmployee : employee
        });
        this.openAddModal();
    },
    closeModal : function() {
        this.setState({
            openEditModal : false,
            selectedEmployee : null
        });
        $("#modalAddEmployee").closeModal();
    },
    filterEmployees : function(e) {
        var value = e.target.value.toLowerCase();
        this.setState({
            filteredEmployees : _.filter(this.state.employees, function(employee){
                return (employee.name.toLowerCase().indexOf(value) > -1);
            })
        })
    },
    makeBackup : function() {
        $.ajax({
            url : '/api/database',
            method : 'GET',
            success : function() {
                window.location.href = "/static/databases/bak.sql"
            }
        })
    },
    render : function() {
        console.log(this.state.filteredEmployees);
        var self = this;
        var editModal = "";
        if(this.state.openEditModal){
            if(this.state.selectedEmployee) {
                editModal = (<AddEditEmployee employee={this.state.selectedEmployee} onClose={this.closeModal} onSubmit={this.reloadEmployees}/>)
            } else {
                editModal = (<AddEditEmployee onClose={this.closeModal} onSubmit={this.reloadEmployees}/>)
            }
        }
        return (
            <div className="container">
                <div className="row">
                    <h3 className="header col s6"> All Employees </h3>
                    <div className="input-field col offset-s2 s4">
                        <i className="material-icons prefix">search</i>
                        <input onChange={this.filterEmployees}id="search" type="text"></input>
                        <label htmlFor="search">Search</label>
                    </div>
                </div>
                <div className="row">
                {
                    _.map(this.state.filteredEmployees, function(employee){
                        return (
                            <div className="col s12 m4 l3">
                                <div className="card">
                                    <div className="card-image">
                                        <img src="http://dismagazine.com/uploads/2011/08/notw_silhouette-1.jpg"/>
                                        <span className="card-title white-text">{employee.name}</span>
                                    </div>
                                    <div className="card-content">
                                        <span className="bold">Hourly Rate: </span> {employee.hourlyRate}<br/>
                                        <span className="bold">Start Date: </span> {employee.startDate}<br/>
                                        <span className="bold">Telephone: </span> {employee.telephone}<br/>
                                        <span className="bold">State/ZipCode: </span>{employee.state}/{employee.zipCode}<br/>
                                    </div>
                                    <div className="card-action">
                                        <a href="#" data-id={employee.id} onClick={self.editEmployee}>
                                            <i className="material-icons">create</i>
                                            <span>&nbsp;Edit</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
                <div id="modalAddEmployee" className="modal modal-fixed-footer">
                    {editModal}
                </div>
                <div className="fixed-action-btn">
                    <a onClick={this.openAddModal} className="btn-floating btn-large green">
                        <i className="large material-icons">add</i>
                    </a>
                    <ul>
                      <li><a onClick={this.makeBackup} className="btn-floating red"><i className="material-icons">cloud_download</i></a></li>
                    </ul>
                </div>
            </div>
        )
    }
})
ReactDOM.render(
    <Employees/>,
    document.getElementById('employeesTab')
)
