import Link from "next/link";

const ForgottenPassword = () => {
  return (
    <div className="container mt-24 w-screen flex justify-center items-center sm:mx-auto lg:mx-auto">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="justify-center items-center">
          <form className="space-y-6">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Forgotten Password
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
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Forgotten Password
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Back to{" "}
              <Link
                href="/auth/login"
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Login Page
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgottenPassword;
