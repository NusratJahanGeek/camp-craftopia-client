import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle";
import { useContext, useRef } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import DashboardBg from "../../Shared/DashboardBackground/DashboardBg";

const imageHostingToken = import.meta.env.VITE_Image_Upload_Token;

const AddClass = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const formRef = useRef(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const toast = useToast();

  const imageHostingURL = `https://api.imgbb.com/1/upload?key=${imageHostingToken}`;

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(imageHostingURL, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          const { name, price, availableSeats } = data;
          const newClassData = {
            name,
            price: parseFloat(price),
            availableSeats: parseFloat(availableSeats),
            instructor: user.displayName,
            email: user.email,
            image: imgURL,
            status: "Pending",
          };
          console.log(newClassData);
          axiosSecure.post("/classes", newClassData).then((data) => {
            if (data.data.insertedId) {
              reset();
              toast({
                title: "Congratulations!",
                description: "Your Class Has Been Added Successfully!",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
              navigate("/dashboard/my-classes");
            }
          });
        }
      });
  };
  return (
    <div>
      <Helmet>
        <title>Camp Craftopia | Add Class</title>
      </Helmet>

      <DashboardBg applyPadding={false}>
        <SectionTitle heading="Add A Class" />

        <Center>
          <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <FormControl spacing={8} marginBottom={4} className="space-y-2">
              <FormLabel>Class Name</FormLabel>
              <Input
                name="name"
                type="text"
                {...register("name", { required: true })}
                borderColor="#999999"
                focusBorderColor="#FF6B6B"
              />
              {errors.name && (
                <span className="text-red-600">Class Name is required</span>
              )}
            </FormControl>

            <FormControl spacing={8} marginBottom={4} className="space-y-2">
              <FormLabel>Upload Class Image</FormLabel>
              <Input
                marginLeft={-4}
                name="image"
                type="file"
                {...register("image", { required: true })}
                borderColor="transparent"
                _focus={{
                  outline: "none",
                  boxShadow: "none",
                  borderColor: "transparent",
                }}
                _hover={{
                  outline: "none",
                  boxShadow: "none",
                  borderColor: "transparent",
                }}
              />
              {errors.photoURL && (
                <span className="text-red-600">Class Image is required</span>
              )}
            </FormControl>

            <Stack direction="row" spacing={8} marginBottom={4}>
              <FormControl spacing={8} marginBottom={4} className="space-y-2">
                <FormLabel>Instructor Name</FormLabel>
                <Input
                  name="instructor"
                  type="text"
                  value={user.displayName}
                  isReadOnly
                  // {...register("instructor", { required: true })}
                  borderColor="#999999"
                  focusBorderColor="#FF6B6B"
                />
                {errors.name && (
                  <span className="text-red-600">
                    Instructor Name is required
                  </span>
                )}
              </FormControl>
              <FormControl className="space-y-2">
                <FormLabel>Instructor Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={user.email}
                  isReadOnly
                  //{...register("email", { required: true })}
                  borderColor="#999999"
                  focusBorderColor="#FF6B6B"
                />
                {errors.email && (
                  <span className="text-red-600">
                    Instructor Email is required
                  </span>
                )}
              </FormControl>
            </Stack>
            <Stack direction="row" spacing={8} marginBottom={4}>
              <FormControl className="space-y-2">
                <FormLabel>Available Seats</FormLabel>
                <Input
                  name="availableSeats"
                  type="number"
                  {...register("availableSeats", { required: true })}
                  borderColor="#999999"
                  focusBorderColor="#FF6B6B"
                />
                {errors.email && (
                  <span className="text-red-600">
                    Available Seats is required
                  </span>
                )}
              </FormControl>
              <FormControl className="space-y-2">
                <FormLabel>Price</FormLabel>
                <Input
                  name="price"
                  type="number"
                  {...register("price", { required: true })}
                  borderColor="#999999"
                  focusBorderColor="#FF6B6B"
                />
                {errors.email && (
                  <span className="text-red-600">Price is required</span>
                )}
              </FormControl>
            </Stack>

            <div className="text-center">
              <Button type="submit" size="lg" width="40%" marginTop={4}>
                Submit
              </Button>
            </div>
          </form>
        </Center>
      </DashboardBg>
    </div>
  );
};

export default AddClass;
