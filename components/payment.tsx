"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import axios from "axios";
import { Switch } from "./ui/switch";
import { useSession } from "next-auth/react";
import prisma from "@/app/lib/db";
import PaymentModel from "./payment-model";
import { loader } from "./loader";
import { toast } from "./ui/use-toast";

interface User {
  name: string;
  username: string;
  profilePicture?: string;
  solWallet: {
    publicKey: string;
  };
}
const Payments = ({ publicKey }: { publicKey: string }) => {
  const [users, setUsers] = useState<User[]>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const filteredUsers = useMemo(() => {
    if (!users) return [];
    return users.filter(
      (user) =>
        user.username.includes(searchQuery) || user.name.includes(searchQuery)
    );
  }, [users, searchQuery]);
  useMemo(() => {
    console.log("Payments component mounted");
    try {
      setLoading(true);
      axios
        .get(`${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/api/users`)
        .then((response) => {
          setUsers(response.data);
          setLoading(false);
        });
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }, []);

  const [payMethod, setPayMethod] = useState<boolean>(false);
  const [payPublicKey, setPayPublicKey] = useState<string>();
  const [paying, setPaying] = useState<boolean>(false);
  if (loading) {
    return loader();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">
          {payMethod ? "Pay using public key" : "Pay using email"}
          <Switch
            className="mx-2 py-1"
            checked={!payMethod}
            onChange={() => setPayMethod(!payMethod)}
            onCheckedChange={() => {
              setPayMethod(!payMethod);
            }}
          />
        </CardTitle>
        {!payMethod ? (
          <div className="relative flex-1">
            <div className="absolute left-0 top-2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by email or username"
              className="pl-5 pr-4 mt-4 py-2 rounded-md w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        ) : null}
      </CardHeader>
      <CardContent>
        {!payMethod ? (
          <div className="grid gap-4">
            {filteredUsers.length !== 0 ? (
              filteredUsers.map((user) => (
                <div key={user.username} className="flex items-center gap-2">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={user.profilePicture ?? "/placeholder-user.jpg"}
                      alt="Recipient Avatar"
                    />
                    <AvatarFallback>{user.name.substring(0, 1)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-muted-foreground">{user.username}</div>
                  </div>
                  <Button
                    onClick={() => {
                      const recievingPublicKey = user.solWallet.publicKey;
                      console.log("Paying to", recievingPublicKey);
                      setPayPublicKey(recievingPublicKey);
                      if (!recievingPublicKey) {
                        toast({
                          title: "Error",
                        });
                        return;
                      }
                      setPaying(true);
                    }}
                    variant="outline"
                    size="sm"
                    className="ml-auto "
                  >
                    Pay
                  </Button>
                </div>
              ))
            ) : (
              <div>No users found</div>
            )}
          </div>
        ) : (
          <div className="flex-col justify-center items-center gap-4">
            <Input
              placeholder="Public key"
              value={payPublicKey}
              onChange={(e) => setPayPublicKey(e.target.value)}
            />
            <br></br>

            <Button
              className="w-full"
              onClick={() => {
                console.log("Paying to", payPublicKey);
                if (!payPublicKey) {
                  toast({
                    title: "Error",
                    description: "Please enter a public key",
                  });
                  return;
                }
                setPaying(true);
              }}
            >
              Pay
            </Button>
          </div>
        )}
        <div>
          <div className="text-xs text-red-300 mt-4">
            *Only works for SOL <br />
            *Transaction fee will be charged <br />
          </div>
        </div>
      </CardContent>
      <PaymentModel
        isOpen={paying}
        title={!payMethod ? "Pay using email" : "Pay using public key"}
        recievingPublicKey={payPublicKey}
        name=""
        onClose={() => setPaying(false)}
        sendingPublicKey={publicKey}
      />
    </Card>
  );
};

export default Payments;
