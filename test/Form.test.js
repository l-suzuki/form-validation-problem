import './setup-dom'
import Form from '../components/Form'

import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'
Enzyme.configure({ adapter: new Adapter() })

// Test suite setup
test('Test suite working', () => {
  expect(true).toBeTruthy
})

// Initial State
test('initial state returns correctly', () => {
  const expected = {
    email: '',
    password: '',
    colour: '',
    animals: [],
    tiger_type: '',
    errors: [],
    valid: false
  }
  const wrapper = shallow(<Form />)
  const actual = wrapper.instance().state
    expect(actual).toEqual(expected)
})

// User Input
test('handleUserInput adds to state', () => {
  const initialState = {
    email: '',
    errors: []
  }
  const testEvent = {
    target: {
      name: 'email',
      value: 'test@test.com'
    }
  }
  const expected = {
    email: testEvent.target.value,
    errors: []
  }

  const wrapper = shallow(<Form />)
  wrapper.instance().render = () => <div></div>
  wrapper.instance().state = initialState
  wrapper.instance().handleUserInput(testEvent)

  const actual = wrapper.instance().state
  expect(actual).toEqual(expected)
})

test('handleUserInput removes appropriate error from state on change', () => {
  const initialState = {
    email: 'test@',
    errors: ['email']
  }
  const testEvent = {
    target: {
      name: 'email',
      value: 'test@test.com'
    }
  }
  const expected = {
    email: testEvent.target.value,
    errors: []
  }

  const wrapper = shallow(<Form />)
  wrapper.instance().render = () => <div></div>
  wrapper.instance().state = initialState
  wrapper.instance().handleUserInput(testEvent)

  const actual = wrapper.instance().state
  expect(actual).toEqual(expected)
})

test('handleAnimalChoice adds to empty state', () => {
  const initialState = {
    animals: [],
    errors: []
  }

  const testEvent = {
    target: {
      name: 'animals',
      value: 'bear'
    }
  }
  const expected = {
    animals: [...initialState.animals, testEvent.target.value],
    errors: []
  }

  const wrapper = shallow(<Form />)
  wrapper.instance().render = () => <div></div>
  wrapper.instance().state = initialState
  wrapper.instance().handleAnimalChoice(testEvent)

  const actual = wrapper.instance().state
  expect(actual).toEqual(expected)
})

test('handleAnimalChoice filters out unchecked animals', () => {
  const initialState = {
    animals: ['bear'],
    errors: []
  }

  const testEvent = {
    target: {
      name: 'animals',
      value: 'bear'
    }
  }
  const expected = {
    animals: [],
    errors: []
  }

  const wrapper = shallow(<Form />)
  wrapper.instance().render = () => <div></div>
  wrapper.instance().state = initialState
  wrapper.instance().handleAnimalChoice(testEvent)

  const actual = wrapper.instance().state
  expect(actual).toEqual(expected)
})

test('handleAnimalChoice removes animal error from state on change (with animal already in state)', () => {
  const initialState = {
    animals: ['bear'],
    errors: ['animal']
  }

  const testEvent = {
    target: {
      name: 'animals',
      value: 'bear'
    }
  }
  const expected = {
    animals: [],
    errors: []
  }

  const wrapper = shallow(<Form />)
  wrapper.instance().render = () => <div></div>
  wrapper.instance().state = initialState
  wrapper.instance().handleAnimalChoice(testEvent)

  const actual = wrapper.instance().state
  expect(actual).toEqual(expected)
})

test('handleAnimalChoice removes animal error from state on change (no matching animal in state)', () => {
  const initialState = {
    animals: ['snake'],
    errors: ['animal']
  }

  const testEvent = {
    target: {
      name: 'animals',
      value: 'bear'
    }
  }
  const expected = {
    animals: ['snake', 'bear'],
    errors: []
  }

  const wrapper = shallow(<Form />)
  wrapper.instance().render = () => <div></div>
  wrapper.instance().state = initialState
  wrapper.instance().handleAnimalChoice(testEvent)

  const actual = wrapper.instance().state
  expect(actual).toEqual(expected)
})

// onSubmit validation
test('validate recognises valid inputs in state', () => {
  const initialState = {
    email: 'test@test.com',
    password: 'testtesttest',
    colour: 'blue',
    animals: ['bear', 'snake'],
    tiger_type: '',
    errors: [],
    valid: false
  }
  const expected = {
    ...initialState,
    valid: true
  }
  const e = {
    preventDefault: () => ({})
  }
  const wrapper = shallow(<Form />)
  wrapper.instance().render = () => <div></div>
  wrapper.instance().state = initialState
  wrapper.instance().validate(e)

  const actual = wrapper.instance().state
  expect(actual).toEqual(expected)
})

test('validate recognises valid inputs in state with Tiger', () => {
  const initialState = {
    email: 'test@test.com',
    password: 'testtesttest',
    colour: 'blue',
    animals: ['bear', 'tiger'],
    tiger_type: 'cool',
    errors: [],
    valid: false
  }
  const expected = {
    ...initialState,
    valid: true
  }
  const e = {
    preventDefault: () => ({})
  }
  const wrapper = shallow(<Form />)
  wrapper.instance().render = () => <div></div>
  wrapper.instance().state = initialState
  wrapper.instance().validate(e)

  const actual = wrapper.instance().state
  expect(actual).toEqual(expected)
})

test('shows success message when valid is true', () => {
  const state = {
    errors: [],
    valid: true
  }
  const expected = 'Congratulations, you have submitted a valid form!'
  const wrapper = shallow(<Form />)
  wrapper.instance().state = state

  const actual = shallow(wrapper.instance().render())
  expect(actual.find('#success').text()).toBe(expected)
})

test('validate recognises invalid email input', () => {
  const initialState = {
    email: 'test',
    password: 'testtesttest',
    colour: 'blue',
    animals: ['bear', 'snake'],
    tiger_type: '',
    errors: [],
    valid: false
  }
  const expected = {
    ...initialState,
    errors: ['email']
  }
  const e = {
    preventDefault: () => ({})
  }
  const wrapper = shallow(<Form />)
  wrapper.instance().render = () => <div></div>
  wrapper.instance().state = initialState
  wrapper.instance().validate(e)

  const actual = wrapper.instance().state
  expect(actual).toEqual(expected)
})

test('validate recognises invalid password input', () => {
  const initialState = {
    email: 'test@test.com',
    password: '',
    colour: 'blue',
    animals: ['bear', 'snake'],
    tiger_type: '',
    errors: [],
    valid: false
  }
  const expected = {
    ...initialState,
    errors: ['password']
  }
  const e = {
    preventDefault: () => ({})
  }
  const wrapper = shallow(<Form />)
  wrapper.instance().render = () => <div></div>
  wrapper.instance().state = initialState
  wrapper.instance().validate(e)

  const actual = wrapper.instance().state
  expect(actual).toEqual(expected)
})

test('validate recognises invalid colour input', () => {
  const initialState = {
    email: 'test@test.com',
    password: 'testtesttest',
    colour: '',
    animals: ['bear', 'snake'],
    tiger_type: '',
    errors: [],
    valid: false
  }
  const expected = {
    ...initialState,
    errors: ['colour']
  }
  const e = {
    preventDefault: () => ({})
  }
  const wrapper = shallow(<Form />)
  wrapper.instance().render = () => <div></div>
  wrapper.instance().state = initialState
  wrapper.instance().validate(e)

  const actual = wrapper.instance().state
  expect(actual).toEqual(expected)
})

test('validate recognises invalid animal input', () => {
  const initialState = {
    email: 'test@test.com',
    password: 'testtesttest',
    colour: 'blue',
    animals: ['bear'],
    tiger_type: '',
    errors: [],
    valid: false
  }
  const expected = {
    ...initialState,
    errors: ['animal']
  }
  const e = {
    preventDefault: () => ({})
  }
  const wrapper = shallow(<Form />)
  wrapper.instance().render = () => <div></div>
  wrapper.instance().state = initialState
  wrapper.instance().validate(e)

  const actual = wrapper.instance().state
  expect(actual).toEqual(expected)
})

test('validate recognises invalid tiger input', () => {
  const initialState = {
    email: 'test@test.com',
    password: 'testtesttest',
    colour: 'blue',
    animals: ['bear', 'tiger'],
    tiger_type: '',
    errors: [],
    valid: false
  }
  const expected = {
    ...initialState,
    errors: ['tiger']
  }
  const e = {
    preventDefault: () => ({})
  }
  const wrapper = shallow(<Form />)
  wrapper.instance().render = () => <div></div>
  wrapper.instance().state = initialState
  wrapper.instance().validate(e)

  const actual = wrapper.instance().state
  expect(actual).toEqual(expected)
})

// Errors

test('email error text appears according to state', () => {
  const state = {
    errors: [
      'email'
    ]
  }
  const expected = '*Please enter a valid email address.'
  const wrapper = shallow(<Form />)
  wrapper.instance().state = state

  const actual = shallow(wrapper.instance().render())
  expect(actual.find('#emailError').text()).toBe(expected)
})

test('password error text appears according to state', () => {
  const state = {
    errors: [
      'password'
    ]
  }
  const expected = '*Your password must contain at least 8 characters.'
  const wrapper = shallow(<Form />)
  wrapper.instance().state = state

  const actual = shallow(wrapper.instance().render())
  expect(actual.find('#passwordError').text()).toBe(expected)
})

test('colour error text appears according to state', () => {
  const state = {
    errors: [
      'colour'
    ]
  }
  const expected = '*Please select a colour.'
  const wrapper = shallow(<Form />)
  wrapper.instance().state = state

  const actual = shallow(wrapper.instance().render())
  expect(actual.find('#colourError').text()).toBe(expected)
})

test('animal error text appears according to state', () => {
  const state = {
    errors: [
      'animal'
    ]
  }
  const expected = '*Please select at least 2 animals.'
  const wrapper = shallow(<Form />)
  wrapper.instance().state = state

  const actual = shallow(wrapper.instance().render())
  expect(actual.find('#animalError').text()).toBe(expected)
})

test('tiger error text appears according to state', () => {
  const state = {
    errors: [
      'tiger'
    ]
  }
  const expected = '*Please enter the type of tiger.'
  const wrapper = shallow(<Form />)
  wrapper.instance().state = state

  const actual = shallow(wrapper.instance().render())
  expect(actual.find('#tigerError').text()).toBe(expected)
})

test('addErrorClass returns "error" on true', () => {
  const error = 'email'
  const state = {
    errors: [
      error
    ]
  }
  const expected = 'error'
  const wrapper = shallow(<Form />)
  wrapper.instance().state = state
  wrapper.instance().render = () => <div></div>

  const actual = wrapper.instance().addErrorClass(error)
  expect(actual).toBe(expected)
})

test('addErrorClass returns empty string on false', () => {
  const error = 'email'
  const state = {
    errors: [
      'password'
    ]
  }
  const expected = ''
  const wrapper = shallow(<Form />)
  wrapper.instance().state = state
  wrapper.instance().render = () => <div></div>

  const actual = wrapper.instance().addErrorClass(error)
  expect(actual).toBe(expected)
})
