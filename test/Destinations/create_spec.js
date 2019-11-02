import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import Login from '../../frontend/src/components/auth/Login'

describe('DestinationNew', () => {
  it('should render two input fields')
  const state = {

    formData: {
      email: '',
      password: ''
    },
    error: ''
  }

  component = shallow(<Login formData={state.formData} errors={state.errors} />)

  expect(component.find('input').length).to.eq(2)

  done()
})

it('should populate the form', done => {
  const state = {
    formData: {
      email: 'alexis@test.com',
      password: 'test'
    },
    errors: ''
  }

  component = shallow(<Login formData={state.formData} errors={state.errors} />)

  expect(component.find({ name: 'email'}).instance().value).to.eq('alexis@test.com')

  expect(component.find({ name: 'password'}).instance().value).to.eq('test')
  done()
})

it ('should display errors', done => {
  const state = {
    formData: { },
    errors: 'Incorrect login details'

  }
})
