import { useState } from 'react'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/router'
import { createUserWithEmailAndPassword } from "firebase/auth"
import Link  from 'next/link'


const Signup = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSignup = async (event) => {
    event.preventDefault()

    try {
      await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        // Signed in 
        const uid = userCredential.user.uid;
        router.push('/puzzle')
        // ...
      })
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="signup-container">
  <h1 className="signup-heading">Sign Up</h1>
  <form className="signup-form" onSubmit={handleSignup}>
    <div className="signup-form-item">
      <label htmlFor="email" className="signup-form-label">Email</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="signup-form-input"
      />
    </div>
    <div className="signup-form-item">
      <label htmlFor="password" className="signup-form-label">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="signup-form-input"
      />
    </div>
    <button type="submit" className="signup-form-button">Sign Up</button>
  </form>
  <div className="signup-login">
    <p>Already have an account?</p>
    <Link role="button" className="signup-login-button" href="/login">
      <button>Login</button>
    </Link>
  </div>
  {/* <Link role="button" className="fancy-button"href="/google"><button>Sign in With Google</button></Link> */}
  {error && <p className="signup-error">{error}</p>}
</div>

  )
}

export default Signup
