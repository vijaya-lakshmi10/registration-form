// Write your JS code here
import './index.css'
import {Component} from'react'
class RegistrationForm extends Component{
    state={firstName:'',lastName:'',showFirstNameErrorMsg:false,showLastNameErrorMsg:false,isFormSubmitted:false}

    onChangeFirstName=event=>{
        this.setState({firstName:event.target.value})
    }

    onChangeLastName=event=>{
        this.setState({lastName:event.target.value})
    }
    
    validFirstName=()=>{
        const {firstName}=this.state
        return firstName !== ''
    }

    validLastName=()=>{
        const {lastName}=this.state
        return lastName !==''
    }

    onBlurFirstName=()=>{
        const isValidFirstName=this.validFirstName()
        this.setState({showFirstNameErrorMsg:!isValidFirstName})
    }

    onBlurLastName=()=>{
        const isValidLastName=this.validLastName()
        this.setState({showLastNameErrorMsg:!isValidLastName})
    }

    onSubmitRegistrationForm = event =>{
        event.preventDefault()
        const isValidFirstName=this.validFirstName()
        const isValidLastName=this.validLastName()
        if(isValidFirstName && isValidLastName){
            this.setState({isFormSubmitted:true})
        }
        else{
            this.setState({isFormSubmitted:false,
            showFirstNameErrorMsg:!isValidFirstName,
            showLastNameErrorMsg:!isValidLastName,})
        }
    }

    firstNameInputText=()=>{
        const {firstName,showFirstNameErrorMsg}=this.state
        const getClassName=showFirstNameErrorMsg ? 'name-input error-message-input' : 'name-input'
        return(
            <div className="input-field-container">
            <label className="input-label" htmlFor="firstname">FIRST NAME</label>
            <input type="text" id="firstname" className={getClassName} value={firstName} onChange={this.onChangeFirstName} onBlur={this.onBlurFirstName} placeholder="First name"/>
            </div>
        )
    }

    lastNameInputText=()=>{
       const {lastName,showLastNameErrorMsg}=this.state
        const getClassName=showLastNameErrorMsg ? ' name-input error-message-input' : 'name-input'
        return(
            <div className="input-field-container">
            <label className="input-label" htmlFor="lastname">LAST NAME</label>
            <input type="text" id="lastname" className={getClassName} value={lastName} onChange={this.onChangeLastName} onBlur={this.onBlurLastName} placeholder="Last name"/>
            </div>
        ) 
    }

    registrationForm=()=>{
        const {showFirstNameErrorMsg,showLastNameErrorMsg}=this.state
        return(
            <form className="registration-form" onSubmit={this.onSubmitRegistrationForm}>
            {this.firstNameInputText()}
            {showFirstNameErrorMsg && <p className="error-message">Required</p>}
            {this.lastNameInputText()}
            {showLastNameErrorMsg && <p className="error-message">Required</p>}
            <button className="submit-btn" type="submit">
            Submit</button>
            </form>
        )
    }

    submitAnotherResponse=()=>{
        this.setState(prevState=>({
            isFormSubmitted:!prevState.isFormSubmitted,
            firstName:'',
            lastName:'',
        }))
    }

    formSuccessfulSubmission=()=>(
        <>
        <img src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png" className="success-img" alt="success"/>
        <p className="desc">Submitted Successfully</p>
        <button type="submit" className="submit-response-btn" onClick={this.submitAnotherResponse}>
        Submit Another Response</button>
        </>
    )

    render(){
        const {isFormSubmitted}=this.state
        return(
            <div className="registration-container">
            <h1 className="heading">Registration</h1>
            <div className="sub-container">
            {isFormSubmitted ? (this.formSuccessfulSubmission()) : (this.registrationForm()) }
            </div>
            </div>
        )
    }
}
export default RegistrationForm
