import { useState } from 'react'
import { Button } from "/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "/components/ui/card"
import { Plus, Minus, Trash, Edit } from "lucide-react"

interface Item {
  id: number
  name: string
  quantity: number
  type: 'raw' | 'finished'
}

export default function Inventory() {
  const [items, setItems] = useState<Item[]>([])
  const [newItem, setNewItem] = useState<Item>({
    id: Date.now(),
    name: '',
    quantity: 0,
    type: 'raw'
  })

  const addItem = () => {
    if (newItem.name && newItem.quantity > 0) {
      setItems([...items, newItem])
      setNewItem({ id: Date.now(), name: '', quantity: 0, type: 'raw' })
    }
  }

  const deleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  return (
    <Card className="w-full max-w-4xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>إدارة المستودعات</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              placeholder="اسم المادة"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <input
              type="number"
              placeholder="الكمية"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
              className="border p-2 rounded w-full"
            />
            <select
              value={newItem.type}
              onChange={(e) => setNewItem({ ...newItem, type: e.target.value as 'raw' | 'finished' })}
              className="border p-2 rounded w-full"
            >
              <option value="raw">خام</option>
              <option value="finished">منتهي التصنيع</option>
            </select>
            <Button onClick={addItem}>إضافة</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {items.map(item => (
            <div key={item.id} className="bg-gray-100 p-2 rounded mb-2 flex justify-between items-center">
              <div>
                <p className="font-bold">{item.name}</p>
                <p>{item.quantity} {item.type === 'raw' ? 'خام' : 'منتهي التصنيع'}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => deleteItem(item.id)}><Trash className="h-4 w-4" /></Button>
                <Button variant="outline" onClick={() => {}}><Edit className="h-4 w-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
