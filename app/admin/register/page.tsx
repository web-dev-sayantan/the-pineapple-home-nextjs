import NavBar from "../../components/navBar";
import RegisterForm from "./components/registerForm";

export default function AdminRegister() {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <NavBar>
        <span>
          <span className="text-accent">Admin</span>&nbsp;Login
        </span>
      </NavBar>
      <div className="flex items-center justify-center w-full h-full p-8">
        <RegisterForm />
      </div>
    </div>
  );
}
