import { FC, useCallback, useState } from "react";
import { Input } from './Input';
import { Button } from './Button';
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
        error={errors.email}
        label="Email"
        name="email"
        placeholder="name@example.com"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="border border-gray-600 rounded-md focus:ring focus:ring-blue-500 focus:border-transparent transition duration-150"
      />
      <Input
        label="Password"
        name="password"
        placeholder="Your password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="border border-gray-600 rounded-md focus:ring focus:ring-blue-500 focus:border-transparent transition duration-150"
      />
      <Button
        className="w-full bg-blue-600 hover:bg-blue-700 text-blue font-semibold py-2 rounded-md transition duration-200"
        label={isLogin ? "Sign In" : "Create Account"}
        type="submit"
        variant="ghost"
      />
      <Button
        className="w-full bg-blue-600 hover:bg-blue-700 text-blue font-semibold py-2 rounded-md transition duration-200"
        icon={<SiGooglechrome className="h-5 w-5 mr-2" />}
        label="Sign In with Google"
        onClick={onGoogleLogin}
        type="button"
        variant="ghost"
      />
    </form>
  );
};
