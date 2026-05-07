import { useAuthContext } from "../context/AuthContext";

export const LoginPage = () => {
    const {isChecking, isAuthenticated, loginWithEmailPassword, user, logout} = useAuthContext();

    if(isChecking) {
        return <h3>Checking authentication...</h3>
    }
  return (
    <>
    {
        isAuthenticated ? (
            <>
            <h3>Bienvenido!</h3>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <button className="bg-blue-500 p-2 text-white rounded-2xl mt-2" onClick={() => logout()}>Salir</button>
            </>
        ) : (
            <>
            <h3>Ingresar a la aplicación</h3>
            <button className="bg-green-500 p-2 text-white rounded-2xl mt-2" onClick={() => loginWithEmailPassword('fernando@domain.com', '123456')}>Login</button>
            </>
        )
    }
    </>
  )
}
