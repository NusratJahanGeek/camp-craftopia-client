import { useContext, useRef } from "react";
import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import SectionTitle from "../../components/SectionTitle";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";

const Login = () => {
  const formRef = useRef(null);

  const { signIn } = useContext(AuthContext);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = formRef.current;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password).then((result) => {
      const user = result.user;
      console.log(user);
    });
  };

  return (
    <div className="mx-auto my-5 mb-24 px-4 md:w-1/4">
      <SectionTitle heading="Login" />
      <form ref={formRef} onSubmit={handleLogin}>
        <FormControl padding={4} className="mx-auto space-y-2">
          <FormLabel>Email address</FormLabel>
          <Input name="email" type="email" focusBorderColor="#FFD9EC" />
          <FormLabel>Password</FormLabel>
          <Input name="password" type="password" focusBorderColor="#FFD9EC" />
          <div className="text-center">
            <Button type="submit" size="lg" width="100%" maxWidth="320px" margin="0 auto" marginTop={4}>
              Login
            </Button>
            <Text marginTop={8}>
              New Here?{" "}
              <Link to="/register" className="text-[#FF6B6B]">
                Create A New Account.
              </Link>
            </Text>
          </div>
        </FormControl>
      </form>
    </div>
  );
};

export default Login;
