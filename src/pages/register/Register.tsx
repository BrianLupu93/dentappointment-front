// Register.tsx
import AppFrame from "@/components/AppFrame";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Title from "@/components/ui/Title";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { showToast } from "@/lib/utils";
import { validateInviteToken } from "./handlers/handlers";
import { handleRegister } from "./handlers/handlers";

const Register = () => {
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const pwdRef = useRef<HTMLInputElement | null>(null);
  const repeatPwdRef = useRef<HTMLInputElement | null>(null);

  const [inviteToken, setInviteToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("invite");

    if (!token) {
      showToast("Missing invite token", "error");
      setLoading(false);
      return;
    }

    setInviteToken(token);
    validateInviteToken(token, setValid, setInviteEmail, setLoading);
  }, []);

  if (loading) {
    return <p className='text-center mt-10'>Checking invite...</p>;
  }

  if (!valid) {
    return (
      <div className='mx-auto h-full w-full mt-20 text-center'>
        <div className='text-2xl font-semibold'>REGISTER ERROR!</div>
        <p className='mt-6 text-orange-600'>Invalid or expired invite link.</p>
      </div>
    );
  }

  return (
    <>
      <Title children='Register' />
      <AppFrame extraClass='w-10/12! sm:w-6/12! mx-auto!'>
        <form
          className='w-full flex flex-col gap-4 items-center p-2 sm:p-4 mb-6'
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister(
              nameRef,
              emailRef,
              pwdRef,
              repeatPwdRef,
              inviteToken,
              navigate,
            );
          }}
        >
          <Input placeholder='Full Name' type='text' ref={nameRef} />

          <Input
            placeholder='E-mail'
            type='email'
            defaultValue={inviteEmail}
            ref={emailRef}
          />

          <Input placeholder='Password' type='password' ref={pwdRef} />

          <Input
            placeholder='Repeat Password'
            type='password'
            ref={repeatPwdRef}
          />

          <Button type='submit'>Create Account</Button>
        </form>
      </AppFrame>
    </>
  );
};

export default Register;
