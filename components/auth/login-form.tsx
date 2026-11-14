"use client";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const result = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          identifier,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await result.json();

      if (!result.ok) {
        setErrorMessage(data.error || "Erro ao realizar login");
        return;
      }

      router.replace("/admin/products");
      router.refresh();
    } catch (error) {
      setErrorMessage("Erro ao realizar login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardContent>
        <form onSubmit={handleSubmit} method="POST" className="flex flex-col gap-4">
          <Input
            name="identifier"
            type="text"
            placeholder="Email ou Telefone"
            className="h-10 border border-gray-300 rounded p-2"
            value={identifier}
            required
            autoComplete="username"
            onChange={(e) => {
              setIdentifier(e.target.value);
              setErrorMessage("");
            }}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            className="h-10 border border-gray-300 rounded p-2"
            value={password}
            required
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMessage("");
            }}
          />
          <div className="text-red-500 text-sm">{errorMessage}</div>
          <div className="h-1 border-b border-gray-300"></div>
          <Button
            type="submit"
            className="h-10 bg-blue-500 text-white rounded p-2 w-full"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
