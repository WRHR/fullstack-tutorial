import React from 'react';
import { gql, useMutation } from '@apollo/client'

import { LoginForm, Loading} from '../components'
import * as LoginTypes from './__generated__/login'

export const LOGIN_USER = gql`
  mutation login($email:String!){
    login(email: $email)
  }
`

export default function Login() {
  const [login, { loading, error}] = useMutation<
    LoginTypes.login,
    LoginTypes.LoginVariables
  >(
    LOGIN_USER,
    {
      onCompleted({ login }) {
        localStorage.setItem('token', login as string)
      }
    }
  )
  if(loading) return <Loading />
  if(error) return <p>An error occurred</p>

  return <LoginForm login={login} />
}