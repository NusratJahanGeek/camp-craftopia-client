import { useState } from "react";
import { Button, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react";

const UpdateClassForm = ({ classData, onUpdate }) => {
  const [name, setName] = useState(classData.name);
  const [price, setPrice] = useState(parseInt(classData.price));
  const [availableSeats, setAvailableSeats] = useState(parseInt(classData.availableSeats));
  const [image, setImage] = useState(classData.image);

  const toast = useToast();

  const handleUpdateClass = () => {
    const updatedData = {
      name,
      image,
      price,
      availableSeats,
    };
  
    onUpdate(classData, updatedData);
  
    toast({
      title: "Update Successful",
      description: "The class has been updated successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  

  return (
    <div>
      <FormControl mt={4}>
        <FormLabel>Class Name</FormLabel>
        <Input type="name" value={name} focusBorderColor="#FF6B6B" onChange={(e) => setName(e.target.value)} />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Image URL</FormLabel>
        <Input type="text" value={image} focusBorderColor="#FF6B6B" onChange={(e) => setImage(e.target.value)} />
      </FormControl>

      <FormControl>
        <FormLabel>Price</FormLabel>
        <Input type="number" value={price} focusBorderColor="#FF6B6B" onChange={(e) => setPrice(parseInt(e.target.value))} />
      </FormControl>
      
      <FormControl mt={4}>
        <FormLabel>Available Seats</FormLabel>
        <Input type="number" value={availableSeats} focusBorderColor="#FF6B6B" onChange={(e) => setAvailableSeats(parseInt(e.target.value))} />
      </FormControl>
      <Button mt={4} onClick={handleUpdateClass}>
        Update
      </Button>
    </div>
  );
};

export default UpdateClassForm;
