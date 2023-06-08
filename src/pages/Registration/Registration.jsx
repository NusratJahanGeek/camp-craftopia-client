import { useRef } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import SectionTitle from "../../components/SectionTitle";
import { Link } from "react-router-dom";

const Registration = () => {
  const formRef = useRef(null);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = formRef.current;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
  };

  return (
    <div className="mx-auto my-5 mb-24 px-4 md:px-80">
      <SectionTitle heading="Register" subHeading="Create A New Account" />
      <form ref={formRef} onSubmit={handleLogin}>
        <Stack direction="row" spacing={8} marginBottom={4}>
          <FormControl width="50%" className="space-y-2">
            <FormLabel>Name</FormLabel>
            <Input name="name" type="text" focusBorderColor="#FFD9EC" />
          </FormControl>
          <FormControl width="50%" className="space-y-2">
            <FormLabel>Email</FormLabel>
            <Input name="email" type="email" focusBorderColor="#FFD9EC" />
          </FormControl>
        </Stack>
        <Stack direction="row" spacing={8} marginBottom={4}>
          <FormControl width="50%" className="space-y-2">
            <FormLabel>Password</FormLabel>
            <Input name="password" type="password" focusBorderColor="#FFD9EC" />
          </FormControl>
          <FormControl width="50%" className="space-y-2">
            <FormLabel>Confirm Password</FormLabel>
            <Input name="confirmPassword" type="password" focusBorderColor="#FFD9EC" />
          </FormControl>
        </Stack>
        <Stack direction="row" spacing={8} marginBottom={4}>
          <FormControl width="50%" className="space-y-2">
            <FormLabel>Photo URL</FormLabel>
            <Input name="photoURL" type="text" focusBorderColor="#FFD9EC" />
          </FormControl>
          <FormControl width="50%" className="space-y-2">
          <p style={{lineHeight: "0.7em"}}>&nbsp;</p>
            <FormLabel>Gender</FormLabel>
            <RadioGroup defaultValue="2">
              <Stack spacing={5} direction="row">
                <Radio value="1" name="gender" colorScheme="teal">
                  Male
                </Radio>
                <Radio value="2" name="gender" colorScheme="teal" defaultChecked>
                  Female
                </Radio>
                <Radio value="3" name="gender" colorScheme="teal">
                  Other
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
        </Stack>
        <Stack direction="row" spacing={8} marginBottom={4}>
          <FormControl width="50%" className="space-y-2">
            <FormLabel>Address</FormLabel>
            <Input name="address" type="text" focusBorderColor="#FFD9EC" />
          </FormControl>
          <FormControl width="50%" className="space-y-2">
            <FormLabel>Phone Number</FormLabel>
            <Input name="phone" type="number" focusBorderColor="#FFD9EC" />
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
