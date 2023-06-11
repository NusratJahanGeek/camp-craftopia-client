import { useState } from "react";
import { Button, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react";

const UpdateClassForm = ({ classData, onUpdate }) => {
  const [name, setName] = useState(classData.name);
  const [price, setPrice] = useState(classData.price);
  const [availableSeats, setAvailableSeats] = useState(classData.availableSeats);
  const [image, setImage] = useState(classData.image);

  const toast = useToast();

  const handleUpdateClass = () => {
    const updatedData = {
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
        <Input type="name" value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Image URL</FormLabel>
        <Input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
      </FormControl>

      <FormControl>
        <FormLabel>Price</FormLabel>
        <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      </FormControl>
      
      <FormControl mt={4}>
        <FormLabel>Available Seats</FormLabel>
        <Input type="number" value={availableSeats} onChange={(e) => setAvailableSeats(e.target.value)} />
      </FormControl>
      <Button mt={4} onClick={handleUpdateClass}>
        Update
      </Button>
    </div>
  );
};

export default UpdateClassForm;
