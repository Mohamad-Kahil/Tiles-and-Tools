import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TempOwnerUserProps {
  onLogin: (userData: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => void;
}

const TempOwnerUser: React.FC<TempOwnerUserProps> = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    const ownerData = {
      name: "Mohamad Kahil",
      email: "owner@owner.com",
      password: "owner1234",
      role: "owner",
    };

    // Store user data in localStorage for persistence
    localStorage.setItem("currentUser", JSON.stringify(ownerData));

    // Call the onLogin function to update auth context
    onLogin(ownerData);

    // Redirect to home page instead of dashboard
    navigate("/");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Temporary Owner Access</CardTitle>
        <CardDescription>
          Use this temporary owner account to access the system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <div className="font-medium">Name:</div>
            <div className="col-span-2">Mohamad Kahil</div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="font-medium">Email:</div>
            <div className="col-span-2">owner@owner.com</div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="font-medium">Password:</div>
            <div className="col-span-2">owner1234</div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="font-medium">Role:</div>
            <div className="col-span-2">Owner (Administrator)</div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleLogin} className="w-full">
          Login as Owner
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TempOwnerUser;
