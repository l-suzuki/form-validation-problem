import React from 'react'

class Form extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      colour: '',
      animals: [],
      tiger_type: '',
      errors: [],
      valid: false
    }
    this.handleUserInput = this.handleUserInput.bind(this)
    this.handleAnimalChoice = this.handleAnimalChoice.bind(this)
    this.addErrorClass = this.addErrorClass.bind(this)
    this.validate = this.validate.bind(this)
  }

// update state to reflect what the user types into the form fields
  handleUserInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value,
      errors: []
    })
  }

// updates animals array in state
  handleAnimalChoice = (e) => {
    const value = e.target.value
    const {animals} = this.state
    if (animals.includes(value)) {
      this.setState({animals: [...animals].filter(animal => animal != value)})
    } else {
      this.setState({animals: [...animals, value]})
    }
  }

// checks the validation conditions upon submit
  validate = (e) => {
    e.preventDefault()
    const {email, errors, password, colour, animals, tiger_type, valid} = this.state

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) errors.push('email')

    if (password.length < 8) errors.push('password')

    if (colour.length == 0) errors.push('colour')

    if (animals.length < 2) errors.push('animal')

    if (animals.includes('tiger') && tiger_type == '') errors.push('tiger')

    this.setState({
      valid: errors.length == 0,
      errors
    })

  }

// updates the css error class depending on this.state.errors
  addErrorClass = (error) => {
    const {errors} = this.state
    return errors.includes(error)
      ? 'error'
      : ''
  }


  displayErrorMessage = (error) => {
    switch(error) {
      case 'email': return 'Please enter a valid email address.'
      case 'password': return 'Your password must have at least 8 characters.'
      case 'colour': return 'Please select a colour.'
      case 'animal': return 'You must select at least two animals.'
      case 'tiger': return 'You must specify the type of tiger.'
      default: return
    }
  }

  render(){
    const {email, password, colour, errors, valid} = this.state
    return (
      <div>
          <form method='post' action='' onSubmit={this.validate}>
              <h1>Fill Out This Awesome Form!</h1>
              <fieldset>
                  <h3>Your details</h3>
                  <p className={this.addErrorClass('email')}>
                    <div className='details'>
                      <label className='label' htmlFor='email'>
                          Email
                      </label>
                      <input type='text' id='email' name='email' value={email} onChange={this.handleUserInput}></input>
                    </div>
                  </p>
                  <p className={this.addErrorClass('password')}>
                    <div className='details'>
                      <label className='label' htmlFor='password'>
                          Password
                      </label>
                      <input type='password' id='password' name='password' value={password} onChange={this.handleUserInput}></input>
                      <p className='required'>*Your password must contain at least 8 characters.</p>
                    </div>
                  </p>
              </fieldset>

              <fieldset>
                  <h3>Your animal</h3>
                  <p className={this.addErrorClass('colour')}>
                    <div className='animal'>
                      <label className='label' htmlFor='colour'>
                          Colour
                      </label>
                      <select name='colour' id='colour' value={colour} onChange={this.handleUserInput}>
                          <option value=''>Choose colour</option>
                          <option value='blue'>Blue</option>
                          <option value='green'>Green</option>
                          <option value='red'>Red</option>
                          <option value='black'>Black</option>
                          <option value='brown'>Brown</option>
                      </select>
                    </div>
                  </p>
                  <p className={this.addErrorClass('animal')}>
                    <div className='animal'>
                      <span className="label">
                          Animal
                      </span>

                      <input type='checkbox' name='animal' value='bear' id='bear' onClick={this.handleAnimalChoice}></input>
                      <label htmlFor='bear'>
                           Bear
                      </label>

                      <input type='checkbox' name='animal' value='tiger' id='tiger' onClick={this.handleAnimalChoice}></input>
                      <label htmlFor='tiger'>
                          Tiger
                      </label>

                      <input type='checkbox' name='animal' value='snake' id='snake' onClick={this.handleAnimalChoice}></input>
                      <label htmlFor='snake'>
                           Snake
                      </label>

                      <input type='checkbox' name='animal' value='donkey' id='donkey' onClick={this.handleAnimalChoice}></input>
                      <label htmlFor='donkey'>
                           Donkey
                      </label>
                    </div>
                    <p className='required'>*You must select at least 2 animals.</p>

                  </p>
                  <p className={this.addErrorClass('tiger')}>
                    <div className='details'>
                      <label className='label' htmlFor='tiger_type'>
                          Type of tiger
                      </label>
                      <input type='text' name='tiger_type' id='tiger_type' onChange={this.handleUserInput}></input>
                      <p className='required'>*If you choose a tiger, please enter what type it is</p>
                    </div>
                  </p>
              </fieldset>
                {errors.length > 0 && <span id='errorDisplay'>{errors.map((error, i) => <p key={i} className='error'>{this.displayErrorMessage(error)}</p>)}</span>}
              <fieldset>
                  <p>
                      <input type='submit' value='Create account'></input>
                  </p>
                  {valid && <h1 id='success'>Congratulations, you have submitted a valid form!</h1>}
              </fieldset>
          </form>
      </div>
    )
  }

}

// className={this.state.email.length > 0 ? this.state.emailValid != true && 'error': ''}
export default Form
