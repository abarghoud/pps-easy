import { FC, useCallback, useState } from "react";
import { Button } from '@pps-easy/ui/button';
import { Input } from '@pps-easy/ui/input';
import { SiGooglechrome } from 'react-icons/si';

interface LoginFormProps {
  errors: { email?: string };
  isLogin: boolean;
  onGoogleLogin: () => void;
  onLoginSubmit: (data: { email: string, password: string }) => void;
  onRegisterSubmit: (data: { email: string, password: string }) => void;
}

export const LoginForm: FC<LoginFormProps> = ({
  errors,
  isLogin,
  onGoogleLogin,
  onLoginSubmit,
  onRegisterSubmit
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLogin) {
      onLoginSubmit({ email, password });
    } else {
      onRegisterSubmit({ email, password });
    }
  }, [email, password, isLogin, onLoginSubmit, onRegisterSubmit]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        className="border border-blue-200 rounded-md focus:ring focus:ring-blue-500 focus:border-transparent transition duration-150 text-foreground"
        name="email"
        onChange={(event) => setEmail(event.target.value)}
        placeholder="name@example.com"
        type="email"
        value={email}
      />
      <Input
        className="border border-blue-200 rounded-md focus:ring focus:ring-blue-500 focus:border-transparent transition duration-150 text-foreground"
        name="password"
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Your password"
        type="password"
        value={password}
      />
      {errors.email ? (
        <p className="flex items-center justify-center text-red-500 text-sm">{errors.email}</p>
      ) : null}
      <Button
        className="w-full bg-blue-200 text-blue font-semibold py-2 rounded-md transition duration-200"
        type="submit"
        variant="ghost"
      >
        {isLogin ? "Sign In" : "Create Account"}
      </Button>
      <Button
        className="w-full bg-blue-200 text-blue font-semibold py-2 rounded-md transition duration-200"
        onClick={onGoogleLogin}
        type="button"
        variant="ghost"
      >
        <SiGooglechrome className="h-5 w-5 mr-2" />
        Sign In with Google
      </Button>
    </form>
  );
};
