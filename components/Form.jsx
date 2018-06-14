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
    const {errors} = this.state
    const value = e.target.value
    this.setState({
      [name]: value,
      errors: errors.filter(error => error != name)
    })
  }

// updates animals array in state
  handleAnimalChoice = (e) => {
    const value = e.target.value
    const {animals, errors} = this.state
    if (animals.includes(value)) {
      this.setState({
        animals: [...animals].filter(animal => animal != value),
        errors: errors.filter(error => error != 'animal')
      })
    } else {
      this.setState({
        animals: [...animals, value],
        errors: errors.filter(error => error != 'animal')
      })
    }
  }

// checks the validation conditions upon submit
  validate = (e) => {
    e.preventDefault()
    const {email, errors, password, colour, animals, tiger_type, valid} = this.state

    // the below regex caters to contemporary email standards: personal info up to 64 chars and domain names up to 253 characters.
    // accepts formats such as my.email.address@email.website, or my.email@this.site.domain
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

  render(){
    const {email, password, colour, errors, valid} = this.state
    return (
      <div>
          <form method='post' action='' onSubmit={this.validate}>
              <div className='h1'>Fill Out This Awesome Form!</div>
              <fieldset className='fieldset'>
                  <div className='h3'>Your Details</div>
                  <p className={this.addErrorClass('email')}>
                    <div className='details'>
                      <label className='label' htmlFor='email'>
                          Email
                      </label>
                      <input type='text' id='email' name='email' value={email} onChange={this.handleUserInput}></input>
                      {errors.includes('email') && <p className='required' id='emailError'>*Please enter a valid email address.</p>}
                    </div>
                  </p>
                  <p className={this.addErrorClass('password')}>
                    <div className='details'>
                      <label className='label' htmlFor='password'>
                          Password
                      </label>
                      <input type='password' id='password' name='password' placeholder='Include at least 8 characters' value={password} onChange={this.handleUserInput}></input>
                      {errors.includes('password') && <p className='required' id='passwordError'>*Your password must contain at least 8 characters.</p>}
                    </div>
                  </p>
              </fieldset>

              <fieldset className='fieldset'>
                  <div className='h3'>Your Animals</div>
                  <p className={this.addErrorClass('colour')}>
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
                      {errors.includes('colour') && <p className='required' id='colourError'>*Please select a colour.</p>}
                  </p>
                  <p className={this.addErrorClass('animal')}>
                      <span className="label">
                          Animals
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
                    {errors.includes('animal') && <p className='required' id='animalError'>*Please select at least 2 animals.</p>}
                  </p>
                  <p className={this.addErrorClass('tiger')}>
                    <div className='details'>
                      <label className='label' htmlFor='tiger_type'>
                          Type of tiger
                      </label>
                      <input type='text' name='tiger_type' id='tiger_type' placeholder='If you selected "tiger", please describe it here.' onChange={this.handleUserInput}></input>
                      {errors.includes('tiger') && <p className='required' id='tigerError'>*Please enter the type of tiger.</p>}
                    </div>
                  </p>
              </fieldset>
                <div>
                  {errors.length > 0 && <div className='error'>Oops! Something went wrong. Please ensure you have filled in everything correctly.</div>}
                  {valid && <div id='success' className='h3'>Congratulations, you have submitted a valid form!</div>}
                </div>
              <fieldset>
                  <p>
                      <input type='submit' value='CREATE ACCOUNT'></input>
                  </p>
              </fieldset>
          </form>
      </div>
    )
  }

}

export default Form
