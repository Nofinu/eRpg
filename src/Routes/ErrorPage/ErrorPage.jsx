import { Link, useRouteError } from "react-router-dom"


export const ErrorPage =()=>{

  const error = useRouteError()
  return(
  <div className="container">
    <h1>Error {error.status}</h1>
    <p>{error.data}</p>
    <Link className="Link Add" type="button" to="/">Home Page</Link>
  </div>
  )
}