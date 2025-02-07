import { useState } from 'react'
import { Button } from "/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "/components/ui/card"
import { Plus, Minus, Trash, Edit } from "lucide-react"

interface Person {
  id: number
  name: string
  role: 'client' | 'employee'
  contact: string
}

export default function ClientsEmployees() {
  const [people, setPeople] = useState<Person[]>([])
  const [newPerson, setNewPerson] = useState<Person>({
    id: Date.now(),
    name: '',
    role: 'client',
    contact: ''
  })

  const addPerson = () => {
    if (newPerson.name && newPerson.contact) {
      setPeople([...people, newPerson])
      setNewPerson({ id: Date.now(), name: '', role: 'client', contact: '' })
    }
  }

  const deletePerson = (id: number) => {
    setPeople(people.filter(person => person.id !== id))
  }

  return (
    <Card className="w-full max-w-4xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>إدارة العملاء والموظفين</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              placeholder="الاسم"
              value={newPerson.name}
              onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <select
              value={newPerson.role}
              onChange={(e) => setNewPerson({ ...newPerson, role: e.target.value as 'client' | 'employee' })}
              className="border p-2 rounded w-full"
            >
              <option value="client">عميل</option>
              <option value="employee">موظف</option>
            </select>
            <input
              type="text"
              placeholder="اتصال"
              value={newPerson.contact}
              onChange={(e) => setNewPerson({ ...newPerson, contact: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <Button onClick={addPerson}>إضافة</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {people.map(person => (
            <div key={person.id} className="bg-gray-100 p-2 rounded mb-2 flex justify-between items-center">
              <div>
                <p className="font-bold">{person.name}</p>
                <p>{person.role === 'client' ? 'عميل' : 'موظف'}</p>
                <p>{person.contact}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => deletePerson(person.id)}><Trash className="h-4 w-4" /></Button>
                <Button variant="outline" onClick={() => {}}><Edit className="h-4 w-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
