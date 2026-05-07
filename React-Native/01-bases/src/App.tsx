// import { BasicFunctions } from './typescript/BasicFunctions'
// import { ObjectLiterals } from './typescript/ObjectLiterals'
// import { BasicTypes } from './typescript/BasicTypes'
// import { Counter } from "./componentes/Counter"

// import { LoginPage } from "./componentes/LoginPage"
// import { UsersPage } from "./componentes/UsersPage"
import { FormsPage } from "./componentes/FormsPage"
import { AuthProvider } from "./context/AuthContext"

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col justify-center items-center h-svh">
        <h1 className='text-4xl mb-5'>React + TS</h1>
        {/* <BasicTypes /> */}
        {/* <ObjectLiterals /> */}
        {/* <BasicFunctions /> */}
        {/* <Counter /> */}
        {/* <LoginPage /> */}
        {/* <UsersPage /> */}
        <FormsPage />
      </div>
    </AuthProvider>

  )
}

export default App
