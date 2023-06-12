import { useState } from "react";
import { Button, FormControl, FormLabel, Textarea, useToast } from "@chakra-ui/react";

const FeedbackForm = ({ classData, onSubmit }) => {
  const [feedback, setFeedback] = useState('');
  const toast = useToast();

  const handleSubmit = () => {
    if (feedback.trim() === '') {
      toast({
        title: "Feedback cannot be empty",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    onSubmit(classData, feedback);
    setFeedback('');
    toast({
      title: "Feedback Sent",
      description: "You have successfully sent the feedback to instructor.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <div>
      <FormControl>
        <FormLabel>Feedback</FormLabel>
        <Textarea value={feedback} focusBorderColor="#FF6B6B" onChange={(e) => setFeedback(e.target.value)} />
      </FormControl>
      <Button mt={4} onClick={handleSubmit}>
        Send
      </Button>
    </div>
  );
};

export default FeedbackForm;
