import { Helmet } from "react-helmet-async"
import Banner from "../../Shared/Banner/Banner";
import bannerImg from "../../../assets/Banner2.jpg";
import { Button, Card, Heading, Text, useToast } from "@chakra-ui/react";
import useClasses from "../../../hooks/useClasses";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useBookings from "../../../hooks/useBookings";

const Classes = () => {
    const [classes] = useClasses();
    const { user } = useContext(AuthContext);
    const [, refetch] = useBookings();
    const navigate = useNavigate();
    const location = useLocation();
    const toast = useToast();

    const handleSelectedClasses = classData => {
      if(user) {
        const bookingItem = {classId: classData._id, name: classData.name, image: classData.image, price: classData.price, totalStudents: classData.totalStudents, instructor: classData.instructor, availableSeats: classData.availableSeats, email: user.email, userName: user.displayName};
      fetch('http://localhost:5000/bookings', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(bookingItem)
      })
      .then(res => res.json())
      .then(data => {
        if(data.insertedId){
          refetch();
          toast({
            title: "YAY, you've got it!",
            description: "Class Selected Successfully",
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
          navigate("/dashboard/selected-classes");
        }
      })
      }
      else{
        Swal.fire({
          title: 'Booking Failed!',
          text: "You need to login first to select the class!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Login'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/login', {state: {from: location}});
          }
        })
      }
    }

    return (
        <div>
            <Helmet>
        <title>Camp Craftopia | Classes</title>
      </Helmet>
      <Banner image={bannerImg} title="Our Arts & Crafts Classes"></Banner>
      <div className="grid md:grid-cols-3 gap-6 p-12 my-20">
        {classes.map((classData) => (
         
             <Card className="grid md:grid-cols-2 items-center justify-center" key={classData._id}>
            <div style={{ borderRadius: "0 100px 0 100px", overflow: "hidden" }}>
              <img src={classData.image} alt={classData.name} />
            </div>
            <div className="space-y-3 text-center p-8">
              <Heading>{classData.name}</Heading>
              <Text fontSize="lg">Instructor: {classData.instructor}</Text>
              <Text fontSize="lg">Price: ${classData.price}</Text>
             <div className="flex gap-4">
             <Text fontSize="lg">Available Seats: {classData.availableSeats}</Text>
             <Text fontSize="lg">|</Text>
              <Text fontSize="lg">Total Students: {classData.totalStudents}</Text>
             </div>
              <Button onClick={() => handleSelectedClasses(classData)}>Select Class</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
    );
};

export default Classes;