import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        This field is required!
      </div>
    );
  }
};

const firstName = (value) => {
  if (value.length < 3 || value.length > 50) {
    return (
      <div className="invalid-feedback d-block">
        Last name must be between 3 and 50 characters.
      </div>
    );
  }
};

const lastName = (value) => {
  if (value.length < 3 || value.length > 50) {
    return (
      <div className="invalid-feedback d-block">
        First name must be between 3 and 50 characters.
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="invalid-feedback d-block">
        This is not a valid email.
      </div>
    );
  }
};

const password = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="invalid-feedback d-block">
        password must be between 3 and 50 characters.
      </div>
    );
  }
};





const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const initialValues = { firstName: "", lastName: "", email: "", password: "", cpassword: "", userRole: ""};
  const [formValues, setFormValues] = useState(initialValues);
  const [username, setUsername] = useState("");

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const cpassword = (value) => {

    if (value.length < 3 || value.length > 20) {
      return (
        <div className="invalid-feedback d-block">
          confirm password must be between 3 and 20 characters.
        </div>
      );
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
};

const checkbox =(e)=>{
  if(e.target.checked){
    //const { name, value } = e.target;
    var a = formValues;
    a.userRole=e.target.value;
    setFormValues(a);
  }
}


  const handleRegister = (e) => {

    console.log(formValues)
     e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(formValues).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

            setMessage("Please enter valid inputs");
          setSuccessful(false);
        }
      );
    }
  };

 

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
               <div className="form-group">
                <label htmlFor="username">First Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={formValues.firstName}
                  onChange={handleChange}
                  validations={[required, firstName]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">Last Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={formValues.lastName}
                  onChange={handleChange}
                  validations={[required, lastName]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">Email address</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  validations={[required, email]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                  validations={[required, password]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Confirm Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="cpassword"
                  value={formValues.cpassword}
                  onChange={handleChange}
                  validations={[required, cpassword]}
                />
              </div>

              <div  className="form-check form-check-inline">
             
                <Input
                  type="radio"
                  className="form-check-input" 
                  id="inlineRadio1"
                  name="userRole"
                  value="ROLE_ADMIN"
                  onChange={handleChange}

                />
                 <label  class="form-check-label" htmlFor="email">Admin</label>
                </div>
              
                <div  className="form-check form-check-inline">
             <Input type="radio" className="form-check-input" id="inlineRadio1" name="userRole" value="ROLE_AUTHOR" onChange={handleChange}/>
              <label  class="form-check-label" htmlFor="email">Author</label>
             </div>

             <div  className="form-check form-check-inline">
             
             <Input
               type="radio"
               className="form-check-input" 
               id="inlineRadio1"
               name="userRole"
               value="ROLE_USER"
               onChange={handleChange}

             />
              <label  class="form-check-label" htmlFor="email">Guest</label>

             </div>

              <div className="form-group">
                <button type="submit" onClick={handleRegister} className="btn btn-success btn-block">Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register