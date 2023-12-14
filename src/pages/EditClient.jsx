import { Form, useLoaderData, useNavigate, useActionData, redirect } from "react-router-dom"
import { getClient, updateClient } from "../api/clients"
import ClientForm from "../components/ClientForm"
import Error from "../components/Error"

export async function loader({params}) {
    const client = await getClient(params.clientId)
    if(Object.values(client).length === 0) {
        throw new Response('', {
            status: 404,
            statusText: 'Client Not Found'
        })
    }
    return client
}

export async function action({request, params}) {
    const formData = await request.formData()
    //convierte la respuesta de formData en un array con el valor de los campos en el POST
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
    //update client
    await updateClient(params.clientId, data)

    return redirect('/')
}

function EditClient() {
    
    const client = useLoaderData()
    const navigate = useNavigate()
    const errors = useActionData()
    
    return (
        <>
        <h1 className="font-black text-4xl text-blue-900">Editing Client: {client.id}</h1>
        <p className="mt-3">All Fields must be filled</p>

        <div className="flex justify-end">
            <button
            className="bg-blue-800 text-white px-3 py-1 font-bold uppercase rounded-md"
            onClick={() => navigate(-1)}
            >Back</button>
        </div>

        <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-10"> 
            
            {errors?.length && errors.map((error, i) => <Error key={i}>{error}</Error>) }
            <Form
                method="PUT"
                noValidate
            >
            <ClientForm client={client}/>
            <input 
                className="w-full bg-blue-800 p-3 text-white font-bold uppercase rounded-md text-lg cursor-pointer "
                type="submit"
                value='Save Changes'
                />
            </Form>
        </div>
    </>
  )
}

export default EditClient