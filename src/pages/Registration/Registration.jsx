import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import SectionTitle from "../../components/SectionTitle";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../providers/AuthProvider";
import SocialLogin from "../../components/SocialLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Registration = () => {
  const formRef = useRef(null);
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({ defaultValues: { password: "", confirmPassword: "" } });

  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(
        (prevShowConfirmPassword) => !prevShowConfirmPassword
      );
    }
  };

  const navigate = useNavigate();
  const toast = useToast();
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data) => {
    console.log(data);
    const userRole = "student";
    createUser(data.email, data.password)
      .then(() => {
        updateUserProfile(data.name, data.photoURL).then(() => {
          const savedUser = {
            name: data.name,
            email: data.email,
            photo: data.photoURL,
            phone: data.phoneNumber,
            address: data.address,
            gender: data.gender,
            role: userRole,
          };
          fetch("https://camp-craftopia-server.vercel.app/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(savedUser),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                reset();
                toast({
                  title: "YAY, you're in!",
                  description: "Your Account Has Been Created Successfully!",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
              }
            });
          navigate("/");
        });
      })
      .catch((error) => {
        if (error.message.includes("email-already-in-use")) {
          setError(
            "You already have an account with the email address used above. Click below to login instead."
          );
        } else if (error.message.includes("invalid-email")) {
          setError("Your email address in invalid. Please use another one.");
        } else {
          setError(error.message);
        }
      });
  };

  return (
    <div className="mx-auto my-5 mb-24 px-4 md:px-4 lg:px-80">
      <Helmet>
        <title>Camp Craftopia | Register</title>
      </Helmet>
      <SectionTitle heading="Register" subHeading="Create A New Account" />

      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="row" spacing={8} marginBottom={4}>
          <FormControl width="50%" className="space-y-2">
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              type="text"
              {...register("name", { required: true })}
              focusBorderColor="#FFD9EC"
            />
            {errors.name && (
              <span className="text-red-600">Name is required</span>
            )}
          </FormControl>
          <FormControl width="50%" className="space-y-2">
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              {...register("email", { required: true })}
              focusBorderColor="#FFD9EC"
            />
            {errors.email && (
              <span className="text-red-600">Email is required</span>
            )}
          </FormControl>
        </Stack>
        <Stack direction="row" spacing={8} marginBottom={4}>
          <FormControl width="50%" className="space-y-2">
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
                  onClick={() => togglePasswordVisibility("password")}
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
          </FormControl>
          <FormControl width="50%" className="space-y-2">
            <FormLabel>Confirm Password</FormLabel>
            <div className="relative">
              <Flex justifyContent="center" alignItems="center">
                <Input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) => value === password.current,
                  })}
                  focusBorderColor="#FFD9EC"
                />

                <Button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  className="absolute"
                  variant="ghost"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </Flex>
            </div>
            {errors.confirmPassword && (
              <span className="text-red-600">
                Passwords do not match. Please type it again.
              </span>
            )}
          </FormControl>
        </Stack>
        <Stack direction="row" spacing={8} marginBottom={4}>
          <FormControl width="50%" className="space-y-2">
            <FormLabel>Photo URL</FormLabel>
            <Input
              name="photoURL"
              type="text"
              {...register("photoURL", { required: true })}
              focusBorderColor="#FFD9EC"
            />
            {errors.photoURL && (
              <span className="text-red-600">Photo URL is required</span>
            )}
          </FormControl>
          <FormControl width="50%">
            <FormLabel>Gender</FormLabel>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <Stack spacing={5} direction="row">
                    <Radio value="Male" colorScheme="teal">
                      Male
                    </Radio>
                    <Radio value="Female" colorScheme="teal">
                      Female
                    </Radio>
                    <Radio value="Other" colorScheme="teal">
                      Other
                    </Radio>
                  </Stack>
                </RadioGroup>
              )}
            />
          </FormControl>
        </Stack>
        <Stack direction="row" spacing={8} marginBottom={4}>
          <FormControl width="50%" className="space-y-2">
            <FormLabel>Address</FormLabel>
            <Input
              name="address"
              type="text"
              {...register("address")}
              focusBorderColor="#FFD9EC"
            />
          </FormControl>
          <FormControl width="50%" className="space-y-2">
            <FormLabel>Phone Number</FormLabel>
            <Input
              name="phoneNumber"
              type="text"
              {...register("phoneNumber")}
              focusBorderColor="#FFD9EC"
            />
          </FormControl>
        </Stack>

        <div className="text-center">
          <Button type="submit" size="lg" width="40%" marginTop={4}>
            Register
          </Button>
          <Text className="text-[#FF6B6B] mt-4">{error}</Text>
          <Text marginTop={8}>
            Already Have An Account?{" "}
            <Link to="/login" className="text-[#FF6B6B]">
              Click Here To Login.
            </Link>
          </Text>
          <SocialLogin></SocialLogin>
        </div>
      </form>
    </div>
  );
};

export default Registration;
