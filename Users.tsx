import { useState } from 'react'
import { Button } from "/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "/components/ui/card"
import { Plus, Minus, Trash, Edit } from "lucide-react"

interface User {
  id: number
  username: string
  role: 'admin' | 'user'
  password: string
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [newUser, setNewUser] = useState<User>({
    id: Date.now(),
    username: '',
    role: 'user',
    password: ''
  })

  const addUser = () => {
    if (newUser.username && newUser.password) {
      setUsers([...users, newUser])
      setNewUser({ id: Date.now(), username: '', role: 'user', password: '' })
    }
  }

  const deleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id))
  }

  return (
    <Card className="w-full max-w-4xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>إدارة المستخدمين</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              placeholder="اسم المستخدم"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value as 'admin' | 'user' })}
              className="border p-2 rounded w-full"
            >
              <option value="user">مستخدم</option>
              <option value="admin">مدير</option>
            </select>
            <input
              type="password"
              placeholder="كلمة المرور"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <Button onClick={addUser}>إضافة</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {users.map(user => (
            <div key={user.id} className="bg-gray-100 p-2 rounded mb-2 flex justify-between items-center">
              <div>
                <p className="font-bold">{user.username}</p>
                <p>{user.role === 'user' ? 'مستخدم' : 'مدير'}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => deleteUser(user.id)}><Trash className="h-4 w-4" /></Button>
                <Button variant="outline" onClick={() => {}}><Edit className="h-4 w-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
