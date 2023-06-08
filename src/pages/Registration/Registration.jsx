import { Controller, useForm } from "react-hook-form";
import { useContext, useRef } from "react";
import { Button, FormControl, FormLabel, Input, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";

import SectionTitle from "../../components/SectionTitle";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../providers/AuthProvider";

const Registration = () => {
    const formRef = useRef(null);
    const { control, register, handleSubmit, formState: { errors } } = useForm();
    const { createUser } = useContext(AuthContext);

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
    .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser);
    })
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
            {errors.name && <span className="text-red-600">Name is required</span>}
          </FormControl>
          <FormControl width="50%" className="space-y-2">
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              {...register("email", { required: true })}
              focusBorderColor="#FFD9EC"
            />
            {errors.email && <span className="text-red-600">Email is required</span>}
          </FormControl>
        </Stack>
        <Stack direction="row" spacing={8} marginBottom={4}>
          <FormControl width="50%" className="space-y-2">
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              {...register("password", { required: true, minLength: 6,
            pattern: /(?=.*[A-Z])(?=.*[!@#$&*]).{6}/
        })}
              focusBorderColor="#FFD9EC"
            />
            {errors.password?.type === "required" && <span className="text-red-600">Password is required</span>}
            {errors.password?.type === "minLength" && <span className="text-red-600">Password must be minimum 6 characters long</span>}
            {errors.password?.type === "pattern" && <span className="text-red-600">Password must have one uppercase and one special character</span>}
          </FormControl>
          <FormControl width="50%" className="space-y-2">
            <FormLabel>Confirm Password</FormLabel>
            <Input
              name="confirmPassword"
              type="password"
              {...register("confirmPassword", { required: true })}
              focusBorderColor="#FFD9EC"
            />
            {errors.confirmPassword && <span className="text-red-600">Please Type The Password Again</span>}
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
            {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
          </FormControl>
          <FormControl width="50%" className="space-y-2">
      <FormLabel>Gender</FormLabel>
      <Controller
        name="gender"
        control={control}
       
        render={({ field }) => (
          <RadioGroup {...field}>
            <Stack spacing={5} direction="row">
              <Radio value="male" colorScheme="teal">
                Male
              </Radio>
              <Radio value="female" colorScheme="teal">
                Female
              </Radio>
              <Radio value="other" colorScheme="teal">
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
            <Input name="address" type="text"  {...register("address")} focusBorderColor="#FFD9EC" />
          </FormControl>
          <FormControl width="50%" className="space-y-2">
            <FormLabel>Phone Number</FormLabel>
            <Input name="phone" type="number"  {...register("phone")} focusBorderColor="#FFD9EC" />
          </FormControl>
        </Stack>

        <div className="text-center">
          <Button type="submit" size="lg" width="40%" marginTop={4}>
            Register
          </Button>
          <Text marginTop={8}>
            Already Have An Account?{" "}
            <Link to="/login" className="text-[#FF6B6B]">
              Click Here To Login.
            </Link>
          </Text>
        </div>
      </form> 
    </div>
  );
};

export default Registration;
