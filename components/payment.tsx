import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'

const Payments = () => {
  return (
    <Card>
          <CardHeader>
            <CardTitle>Payments</CardTitle>
            <div className="relative flex-1">
              <div className="absolute left-2 top-2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by email or public key"
                className="pl-8 pr-4 py-2 rounded-md w-full"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center gap-2">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src="/placeholder-user.jpg"
                    alt="Recipient Avatar"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">John Doe</div>
                  <div className="text-muted-foreground">john@example.com</div>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">
                  Pay
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src="/placeholder-user.jpg"
                    alt="Recipient Avatar"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Jane Doe</div>
                  <div className="text-muted-foreground">jane@example.com</div>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">
                  Pay
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src="/placeholder-user.jpg"
                    alt="Recipient Avatar"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Bob Smith</div>
                  <div className="text-muted-foreground">bob@example.com</div>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">
                  Pay
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
  )
}

export default Payments