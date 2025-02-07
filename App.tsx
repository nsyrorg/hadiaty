import { useState, useEffect } from 'react'
import { Button } from "/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "/components/ui/card"
import { Menu, User, Settings, Mail, Bell, Calendar, Clock, Heart, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, ArrowRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "/components/ui/avatar"
import Inventory from "./components/Inventory"
import ClientsEmployees from "./components/ClientsEmployees"
import Financials from "./components/Financials"
import Users from "./components/Users"
import AccountTree from "./components/AccountTree"
import ProfitLoss from "./components/ProfitLoss"

const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "admin123"

export default function App() {
  const [logo, setLogo] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<string>("dashboard")
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogo(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLogin = () => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true)
    } else {
      alert("اسم المستخدم أو كلمة المرور غير صحيحة")
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      setCurrentPage("dashboard")
    }
  }, [isLoggedIn])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {logo ? (
              <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-amber-300 to-amber-600 rounded-full flex items-center justify-center text-white">
                Q
              </div>
            )}
            <h1 className="text-2xl font-bold">هديتي</h1>
          </div>
          <nav>
            <ul className="flex space-x-4">
              {isLoggedIn ? (
                <>
                  <li><Button variant="outline" className="hover:underline" onClick={() => setCurrentPage("dashboard")}><Menu className="mr-2 h-4 w-4" /> الرئيسية</Button></li>
                  <li><Button variant="outline" className="hover:underline" onClick={() => setCurrentPage("inventory")}><Users className="mr-2 h-4 w-4" /> المستودعات</Button></li>
                  <li><Button variant="outline" className="hover:underline" onClick={() => setCurrentPage("clients-employees")}><Users className="mr-2 h-4 w-4" /> العملاء والموظفين</Button></li>
                  <li><Button variant="outline" className="hover:underline" onClick={() => setCurrentPage("financials")}><Calendar className="mr-2 h-4 w-4" /> المصاريف والأيرادات</Button></li>
                  <li><Button variant="outline" className="hover:underline" onClick={() => setCurrentPage("profit-loss")}><Calendar className="mr-2 h-4 w-4" /> حساب الارباح والخسائر</Button></li>
                  <li><Button variant="outline" className="hover:underline" onClick={() => setCurrentPage("account-tree")}><Calendar className="mr-2 h-4 w-4" /> شجرة الحسابات</Button></li>
                  <li><Button variant="outline" className="hover:underline" onClick={() => setCurrentPage("users")}><Settings className="mr-2 h-4 w-4" /> إدارة المستخدمين</Button></li>
                </>
              ) : (
                <>
                  <li><Button variant="outline" className="hover:underline" onClick={() => setCurrentPage("login")}><User className="mr-2 h-4 w-4" /> تسجيل الدخول</Button></li>
                </>
              )}
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            {isLoggedIn && (
              <>
                <Button variant="outline" className="hover:underline"><Mail className="mr-2 h-4 w-4" /> الرسائل</Button>
                <Button variant="outline" className="hover:underline"><Bell className="mr-2 h-4 w-4" /> الإشعارات</Button>
                <Avatar>
                  <AvatarImage src="https://github.com/nutlope.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {isLoggedIn ? (
          <>
            {currentPage === "dashboard" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Card for Inventory */}
                <Card>
                  <CardHeader>
                    <CardTitle>إدارة المستودعات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">إدارة المواد الخام والتصنيع.</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <Button variant="outline" onClick={() => setCurrentPage("inventory")}>إدارة المستودعات</Button>
                  </CardFooter>
                </Card>

                {/* Card for Customers */}
                <Card>
                  <CardHeader>
                    <CardTitle>إدارة العملاء</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">إضافة وإدارة العملاء.</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <Button variant="outline" onClick={() => setCurrentPage("clients-employees")}>إدارة العملاء</Button>
                  </CardFooter>
                </Card>

                {/* Card for Employees */}
                <Card>
                  <CardHeader>
                    <CardTitle>إدارة الموظفين</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">إضافة وإدارة الموظفين.</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <Button variant="outline" onClick={() => setCurrentPage("clients-employees")}>إدارة الموظفين</Button>
                  </CardFooter>
                </Card>

                {/* Card for Financials */}
                <Card>
                  <CardHeader>
                    <CardTitle>المصاريف والأيرادات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">حساب المصاريف والأيرادات والتوافقات.</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <Button variant="outline" onClick={() => setCurrentPage("financials")}>المصاريف والأيرادات</Button>
                  </CardFooter>
                </Card>

                {/* Card for Profit and Loss */}
                <Card>
                  <CardHeader>
                    <CardTitle>حساب الارباح والخسائر</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">حساب الارباح والخسائر.</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <Button variant="outline" onClick={() => setCurrentPage("profit-loss")}>حساب الارباح والخسائر</Button>
                  </CardFooter>
                </Card>

                {/* Card for Account Tree */}
                <Card>
                  <CardHeader>
                    <CardTitle>شجرة الحسابات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">إنشاء شجرة حسابات أساسية.</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <Button variant="outline" onClick={() => setCurrentPage("account-tree")}>شجرة الحسابات</Button>
                  </CardFooter>
                </Card>

                {/* Card for Users */}
                <Card>
                  <CardHeader>
                    <CardTitle>إدارة المستخدمين</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">إنشاء مستخدمين متعددين مع صلاحيات مختلفة.</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <Button variant="outline" onClick={() => setCurrentPage("users")}>إدارة المستخدمين</Button>
                  </CardFooter>
                </Card>

                {/* Card for Reports */}
                <Card>
                  <CardHeader>
                    <CardTitle>إنشاء تقارير</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">إنشاء تقارير محاسبية كاملة.</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <Button variant="outline" onClick={() => {}}>إنشاء تقارير</Button>
                  </CardFooter>
                </Card>

                {/* Card for Logo Upload */}
                <Card>
                  <CardHeader>
                    <CardTitle>تحميل لوغو مخصص</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">تحميل لوغو مخصص من قبل المدير.</p>
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" id="logo-upload" />
                    <label htmlFor="logo-upload" className="cursor-pointer">
                      <Button variant="outline">تحميل لوغو</Button>
                    </label>
                  </CardContent>
                </Card>
              </div>
            )}
            {currentPage === "inventory" && <Inventory />}
            {currentPage === "clients-employees" && <ClientsEmployees />}
            {currentPage === "financials" && <Financials />}
            {currentPage === "profit-loss" && <ProfitLoss />}
            {currentPage === "account-tree" && <AccountTree />}
            {currentPage === "users" && <Users />}
          </>
        ) : (
          <div className="w-full max-w-md mx-auto mt-10">
            <Card>
              <CardHeader>
                <CardTitle>تسجيل الدخول</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex flex-col space-y-2 mb-2">
                    <input
                      type="text"
                      placeholder="اسم المستخدم"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="border p-2 rounded w-full"
                    />
                    <input
                      type="password"
                      placeholder="كلمة المرور"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border p-2 rounded w-full"
                    />
                    <Button onClick={handleLogin}>تسجيل الدخول</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-muted mt-8">
        <div className="container mx-auto px-4 py-6 text-center">
          <p>&copy; 2023 هديتي. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
