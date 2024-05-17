"use client";
// import { userSchema } from "@/lib/validationSchema";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
// import { useState } from "react";

const Login = () => {
  const { data: session, status } = useSession();
  //   const [data, setData] = useState({
  //     email: "",
  //     password: "",
  //     // callbackUrl: "/users",
  //   });
  const router = useRouter();

  // If user is login and want to go back to login page
  useEffect(() => {
    if (status === "authenticated") {
      // router.replace("/admin/dashboard");
      redirect("/admin/dashboard");
    }
  }, [status, router]);

  // if (status === "authenticated") {
  //   redirect("/admin/dashboard");
  // }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
      //   callbackUrl: "/admin/dashboard",
    };
    console.log(formData);

    try {
      //   userSchema.parse(formData);
      //   console.log("Valid");
      const signInData = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });
      //   console.log(signInData);
      if (signInData?.error) {
        console.log(signInData.error);
      } else {
        router.push("/admin/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mt-20 w-screen flex justify-center items-center sm:mx-auto lg:mx-auto">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="justify-center items-center">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign in to our platform
            </h5>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                // value={data.email}
                // onChange={(e) => setData({ ...data, email: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                // value={data.password}
                // onChange={(e) => setData({ ...data, password: e.target.value })}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div className="flex items-start">
              <Link
                href="/auth/forgottenPassword"
                className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
              >
                Lost Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login to your account
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?{" "}
              <Link
                href="/auth/register"
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Create an account
              </Link>
            </div>
          </form>

          <button
            onClick={() =>
              signIn("google", { callbackUrl: "/admin/dashboard" })
            }
            type="submit"
            className="w-full mt-3 text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login With Google
          </button>
          <button
            onClick={() =>
              signIn("github", { callbackUrl: "/admin/dashboard" })
            }
            type="submit"
            className="w-full mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login With Github
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
