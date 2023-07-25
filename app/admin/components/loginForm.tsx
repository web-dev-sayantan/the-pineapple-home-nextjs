"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { CredentialsType } from "../page";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const { register, handleSubmit, watch, formState } =
    useForm<CredentialsType>();
  const onSubmit: SubmitHandler<CredentialsType> = async (credentials) => {
    if (credentials.mobile && credentials.password) {
      const res = await signIn("credentials", { ...credentials, redirect: false })
      console.log(res)
      if (!res?.error) {
        router.push("admin/dashboard");
      }   
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center w-full gap-8 p-8 rounded-lg md:w-1/2 bg-secondary/80"
    >
      <div className="relative h-10 w-full min-w-[200px]">
        <input
          type="text"
          className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-background px-3 py-2.5 md:text-sm font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-accent focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          placeholder=" "
          {...register("mobile")}
        />
        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-accent peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-accent peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-accent peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          Mobile No
        </label>
      </div>
      <div className="relative h-10 w-full min-w-[200px]">
        <input
          type="password"
          className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-background px-3 py-2.5 text-sm font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-accent focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          placeholder=" "
          {...register("password")}
        />
        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-accent peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-accent peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-accent peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          Password
        </label>
      </div>
      <div className="flex items-center justify-center w-full md:justify-end">
        <button
          type="submit"
          className="w-full px-8 py-2 font-bold rounded-md bg-accent/80 text-background md:w-auto"
        >
          Login
        </button>
      </div>
    </form>
  );
}
