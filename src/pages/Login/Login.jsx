import { useForm } from "react-hook-form";
import { useContext, useRef, useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import SectionTitle from "../../components/SectionTitle";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SocialLogin from "../../components/SocialLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const formRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn } = useContext(AuthContext);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    console.log(data);
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast({
          title: "Welcome!",
          description: "You've successfully logged in.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        if (error.message.includes("wrong-password")) {
          setError("You've entered a wrong password.");
        } else if (error.message.includes("user-not-found")) {
          setError(
            "We couldn't find your email address on our database. Please use the correct one."
          );
        } else {
          setError(error.message);
        }
      });
  };

  return (
    <div className="mx-auto my-5 mb-24 px-4 md:w-1/4">
      <Helmet>
        <title>Camp Craftopia | Login</title>
      </Helmet>
      <SectionTitle heading="Login" />
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <FormControl padding={4} className="mx-auto space-y-2">
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            {...register("email", { required: true })}
            focusBorderColor="#FFD9EC"
            id="field-email"
          />
          {errors.email && (
            <span className="text-red-600">Email is required</span>
          )}
          <FormLabel>Password</FormLabel>
          <div className="relative">
            <Flex justifyContent="center" alignItems="center">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*]).{6}/,
                })}
                focusBorderColor="#FFD9EC"
              />
              <Button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute"
                variant="ghost"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </Flex>
          </div>
          {errors.password?.type === "required" && (
            <span className="text-red-600">Password is required</span>
          )}
          {errors.password?.type === "minLength" && (
            <span className="text-red-600">
              Password must be minimum 6 characters long
            </span>
          )}
          {errors.password?.type === "pattern" && (
            <span className="text-red-600">
              Password must have one uppercase and one special character
            </span>
          )}
          <div className="text-center">
            <Button
              type="submit"
              size="lg"
              width="100%"
              maxWidth="320px"
              margin="0 auto"
              marginTop={4}
            >
              Login
            </Button>
            <Text className="text-[#FF6B6B] mt-4">{error}</Text>
            <Text marginTop={8}>
              New Here?{" "}
              <Link to="/register" className="text-[#FF6B6B]">
                Create A New Account.
              </Link>
              <SocialLogin></SocialLogin>
            </Text>
          </div>
        </FormControl>
      </form>
    </div>
  );
};

export default Login;
