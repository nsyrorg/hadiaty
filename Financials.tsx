import { useState, useEffect } from 'react'
import { Button } from "/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "/components/ui/card"
import { Plus, Minus, Trash, Edit } from "lucide-react"

interface Transaction {
  id: number
  description: string
  amount: number
  type: 'expense' | 'income'
  date: string
}

export default function Financials() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [newTransaction, setNewTransaction] = useState<Transaction>({
    id: Date.now(),
    description: '',
    amount: 0,
    type: 'expense',
    date: new Date().toISOString().split('T')[0]
  })

  useEffect(() => {
    // Load transactions from local storage or an API
    const savedTransactions = localStorage.getItem('transactions')
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions))
    }
  }, [])

  useEffect(() => {
    // Save transactions to local storage
    localStorage.setItem('transactions', JSON.stringify(transactions))
  }, [transactions])

  const addTransaction = () => {
    if (newTransaction.description && newTransaction.amount > 0) {
      setTransactions([...transactions, newTransaction])
      setNewTransaction({ id: Date.now(), description: '', amount: 0, type: 'expense', date: new Date().toISOString().split('T')[0] })
    }
  }

  const deleteTransaction = (id: number) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id))
  }

  const totalIncome = transactions.reduce((acc, transaction) => transaction.type === 'income' ? acc + transaction.amount : acc, 0)
  const totalExpense = transactions.reduce((acc, transaction) => transaction.type === 'expense' ? acc + transaction.amount : acc, 0)
  const profitLoss = totalIncome - totalExpense

  return (
    <Card className="w-full max-w-4xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>المصاريف والأيرادات</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              placeholder="الوصف"
              value={newTransaction.description}
              onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <input
              type="number"
              placeholder="المبلغ"
              value={newTransaction.amount}
              onChange={(e) => setNewTransaction({ ...newTransaction, amount: parseFloat(e.target.value) })}
              className="border p-2 rounded w-full"
            />
            <select
              value={newTransaction.type}
              onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value as 'expense' | 'income' })}
              className="border p-2 rounded w-full"
            >
              <option value="expense">مصروف</option>
              <option value="income">إيراد</option>
            </select>
            <input
              type="date"
              value={newTransaction.date}
              onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <Button onClick={addTransaction}>إضافة</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {transactions.map(transaction => (
            <div key={transaction.id} className="bg-gray-100 p-2 rounded mb-2 flex justify-between items-center">
              <div>
                <p className="font-bold">{transaction.description}</p>
                <p>{transaction.amount} TRY</p>
                <p>{transaction.type === 'expense' ? 'مصروف' : 'إيراد'}</p>
                <p>{transaction.date}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => deleteTransaction(transaction.id)}><Trash className="h-4 w-4" /></Button>
                <Button variant="outline" onClick={() => {}}><Edit className="h-4 w-4" /></Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <p className="font-bold">إجمالي الإيرادات: {totalIncome} TRY</p>
          <p className="font-bold">إجمالي المصروفات: {totalExpense} TRY</p>
          <p className="font-bold">الربح/الخسارة: {profitLoss >= 0 ? 'ربح' : 'خسارة'} {Math.abs(profitLoss)} TRY</p>
        </div>
      </CardContent>
    </Card>
  )
}
