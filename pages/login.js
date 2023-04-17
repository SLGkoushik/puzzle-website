import { useState } from 'react'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/router'
import {signInWithEmailAndPassword} from 'firebase/auth'
import Link  from 'next/link'

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await signInWithEmailAndPassword(auth , email, password).then((userCredential) => {
        router.push('/story')
      })
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="login-container">
      <h1 className="login-heading">Login</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="login-form-item">
          <label htmlFor="email" className="login-form-label">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="login-form-input"
          />
        </div>
        <div className="login-form-item">
          <label htmlFor="password" className="login-form-label">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="login-form-input"
          />
        </div>
        <button type="submit" className="login-form-button">Login</button>
      </form>
      <div className="login-signup">
        <p>Don't have an account?</p>
        <Link role="button" className="login-signup-link" href="/signup">
          <button  className="login-signup-button">Sign Up</button>
        </Link>
      </div>
      {error && <p className="login-error">{error}</p>}
    </div>
  )
}

export default Login
