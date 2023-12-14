import { Form, useNavigate, redirect } from "react-router-dom"
import { deleteClient } from "../api/clients"

export async function action({params}) {
  await deleteClient(params.clientId)
  return redirect('/')
}


const Client = ({client}) => {

  const navigate = useNavigate()
  const {name, phone, email, company, id} = client

  return (
    <tr className="border-b">
        <td className="p-6  space-y-1">
            <p className="text-2xl text-gray-800">{name}</p>
            <p className="">{company}</p>
        </td>

        <td className="p-6">
            <p className="text-gray-600"><span className="text-gray-800 uppercase font-bold">Email: </span>{email}</p>
            <p className="text-gray-600"><span className="text-gray-800 uppercase font-bold">Phone: </span>{phone}</p>
        </td>

        <td className="p-6 flex justify-center gap-3">
          <button
            type="button"
            className="text-blue-600 hover:text-blue-800 uppercase font-bold text-xs"
            onClick={() => navigate(`/clients/${id}/edit`)}
          >Edit</button>
          
          <Form
            method='POST'
            action={`/clients/${id}/delete`}
            onSubmit={ (e) => {
              if(!confirm('Are you sure you want to delete this Client?')) {
                e.preventDefault()
              }
            }}
          >
            <button
              type="submit"
              className="text-red-600 hover:text-red-800 uppercase font-bold text-xs"
              >Delete</button>
          </Form>
        </td>
    </tr>
  )
}

export default Client