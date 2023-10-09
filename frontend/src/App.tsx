import { useAuth0 } from '@auth0/auth0-react'

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Login</button>
}

const LogoutButton = () => {
  const { logout } = useAuth0();

  return <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</button>
}

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }


  return (
    isAuthenticated && user && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
}

function App() {
  return (<div>
    <div>
      <LoginButton />
    </div>
    <div>
      <LogoutButton />
    </div>
    <div>
      <Profile />
    </div>
  </div>)
}

export default App
