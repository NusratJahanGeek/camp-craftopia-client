import { Button, Tooltip, useToast } from "@chakra-ui/react";
import { useContext } from "react";
import { FaGoogle, FaTwitter } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { googleSignIn, twitterSignIn } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    googleSignIn()
    .then(result => {
      const loggedInUser = result.user;
      console.log(loggedInUser);
      const savedUser = { name: loggedInUser.displayName, email: loggedInUser.email, photo: loggedInUser.photoURL }
      fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(savedUser)
      })
      .then(res => res.json())
      .then(() => {
          toast({
            title: "YAY, you're in!",
            description: "You've Logged In Successfully!",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        }
      );
      navigate(from, { replace: true });
    });
  };

  const handleTwitterSignIn = () => {
    twitterSignIn()
    .then(result => {
      const loggedInUser = result.user;
      const savedUser = { name: loggedInUser.displayName, email: loggedInUser.email, photo: loggedInUser.photoURL }
      fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(savedUser)
      })
      .then(res => res.json())
      .then(() => {
          toast({
            title: "YAY, you're in!",
            description: "You've Logged In Successfully!",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        }
      );
      navigate(from, { replace: true });
    });
  };


  return (
    <div className="mt-8">
         <Tooltip label="Login with Google" hasArrow bg='gray.300' color='black' fontSize='md'>
      <Button
        variant="outline"
        borderColor="#FF6B6B"
        color="#FF6B6B"
        _hover={{
          backgroundColor: "#FF6B6B",
          color: "white"
        }}
        onClick={handleGoogleSignIn}
      >
        <FaGoogle />
      </Button>
    </Tooltip>
    <Tooltip label="Login with Twitter" hasArrow bg='gray.300' color='black' fontSize='md'>
      <Button onClick={handleTwitterSignIn}
        variant="outline" marginLeft={4}
        sx={{
          border: "2px solid #FF6B6B",
          color: "#FF6B6B",
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: "#FF6B6B",
            color: "white",
          },
        }}
      >
        <FaTwitter />
      </Button>
      </Tooltip>
    </div>
  );
};

export default SocialLogin;
