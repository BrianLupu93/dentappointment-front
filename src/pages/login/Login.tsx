import AppFrame from "@/components/AppFrame";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Title from "@/components/ui/Title";
import { useAuth } from "@/context/auth/authContext";
import { useRef } from "react";
import { handleLogin } from "./handlers/handlers";
import { useNavigate } from "react-router";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const pwdRef = useRef(null);
  return (
    <>
      <Title children='Login' />
      <AppFrame extraClass='w-10/12! sm:w-6/12! mx-auto!'>
        <form
          className='w-full flex flex-col gap-4 items-center p-2 sm:p-4 mb-6'
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin(emailRef, pwdRef, login, navigate);
          }}
        >
          <Input
            placeholder='E-mail'
            name='email'
            type='email'
            autoComplete='on'
            ref={emailRef}
          />
          <Input
            placeholder='Password'
            name='password'
            type='password'
            autoComplete='of'
            ref={pwdRef}
          />
          <Button type='submit'>Login</Button>
        </form>
      </AppFrame>
    </>
  );
};

export default Login;
