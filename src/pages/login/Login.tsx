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
        <div className='w-full flex flex-col gap-4 items-center p-2 sm:p-4 mb-6'>
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
        </div>
        <Button
          type='button'
          onClick={() => handleLogin(emailRef, pwdRef, login, navigate)}
        >
          Login
        </Button>
      </AppFrame>
    </>
  );
};

export default Login;
