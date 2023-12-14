import { useNavigate, Form, useActionData, redirect } from "react-router-dom"
import ClientForm from "../components/ClientForm"
import Error from "../components/Error"
import { addClient } from "../api/clients"

export async function action({request}) {
    const formData = await request.formData()
    //converite la respuesta de formData en un array con el valor de los campos en el POST
    const data = Object.fromEntries(formData)

    //Form Validation
    const errors = []
    if (Object.values(data).includes('')) {
      errors.push('You must fill out all Fields')
    }
    //regular Expression for email validation
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if(!regex.test(data.email)) {
      errors.push('Invalid email')
    }

    if(Object.keys(errors).length) {
      return errors
    }
    await addClient(data)

    return redirect('/')
}

const NewClient = () => {

  const navigate = useNavigate()
  const errors = useActionData()

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">New Client</h1>
      <p className="mt-3">Fill all inputs for add a new client</p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase rounded-md"
          onClick={() => navigate(-1)}
        >Back</button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-10"> 

        {errors?.length && errors.map((error, i) => <Error key={i}>{error}</Error>) }
        <Form
          method="POST"
          noValidate
        >
          <ClientForm />
          <input 
            className="w-full bg-blue-800 p-3 text-white font-bold uppercase rounded-md text-lg cursor-pointer "
            type="submit"
            value='Register Client'
            />
        </Form>
      </div>
    </>
  )
}

export default NewClient