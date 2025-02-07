import { useState } from 'react'
import { Button } from "/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "/components/ui/card"
import { Plus, Minus, Trash, Edit } from "lucide-react"

interface Account {
  id: number
  name: string
  type: 'asset' | 'liability' | 'equity' | 'income' | 'expense'
}

export default function AccountTree() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [newAccount, setNewAccount] = useState<Account>({
    id: Date.now(),
    name: '',
    type: 'asset'
  })

  const addAccount = () => {
    if (newAccount.name) {
      setAccounts([...accounts, newAccount])
      setNewAccount({ id: Date.now(), name: '', type: 'asset' })
    }
  }

  const deleteAccount = (id: number) => {
    setAccounts(accounts.filter(account => account.id !== id))
  }

  return (
    <Card className="w-full max-w-4xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>شجرة حسابات أساسية</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              placeholder="اسم الحساب"
              value={newAccount.name}
              onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <select
              value={newAccount.type}
              onChange={(e) => setNewAccount({ ...newAccount, type: e.target.value as 'asset' | 'liability' | 'equity' | 'income' | 'expense' })}
              className="border p-2 rounded w-full"
            >
              <option value="asset">الأصول</option>
              <option value="liability">الالتزامات</option>
              <option value="equity">الأسهم</option>
              <option value="income">الإيرادات</option>
              <option value="expense">المصروفات</option>
            </select>
            <Button onClick={addAccount}>إضافة</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {accounts.map(account => (
            <div key={account.id} className="bg-gray-100 p-2 rounded mb-2 flex justify-between items-center">
              <div>
                <p className="font-bold">{account.name}</p>
                <p>{account.type}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => deleteAccount(account.id)}><Trash className="h-4 w-4" /></Button>
                <Button variant="outline" onClick={() => {}}><Edit className="h-4 w-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
