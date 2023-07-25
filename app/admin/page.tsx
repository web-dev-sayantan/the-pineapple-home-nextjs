import NavBar from "../components/navBar";
import LoginForm from "./components/loginForm";

export type CredentialsType = {
  mobile: string;
  password: string;
};

export default function AdminLogin() {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <NavBar>
        <span>
          <span className="text-accent">Admin</span>&nbsp;Login
        </span>
      </NavBar>
      <div className="flex items-center justify-center w-full h-full p-8">
        <LoginForm />
      </div>
    </div>
  );
}
