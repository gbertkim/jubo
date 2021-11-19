import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import App from './App'

describe(`App`, () => {
    it('renders a App by default', () => {
      const wrapper = shallow(<App />)
      expect(toJson(wrapper)).toMatchSnapshot()
    })
})