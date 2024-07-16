import {
  Paper,
  Title,
  Text,
  Button,
  Container,
  PinInput,
  Stack,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import classes from "./ForgotPassword.module.css";
import { usePost } from "@/services/api/useFecth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

export function Activation() {
  const [isLoading, setLoading] = useState(false);
  const [otp, setOtp] = useState(String);
  const location = useLocation();
  const email = location.state?.email ? location.state.email : null;

  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    setLoading(true);
    event.preventDefault();
    if (otp.length < 6) {
      return notifications.show({
        title: "Invalid OTP",
        message: "OTP should be 6 characters",
        color: "red",
        icon: <IconX />,
      });
    }
    try {
      const response: any = await usePost("/activation", { email, otp });
      if (response.status === 200) {
        return navigate("/");
      }
    } catch (error: any) {
      setLoading(false);
      return notifications.show({
        title: "Activation Failed",
        message: `${error.response.data.message}`,
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, []);

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} ta="center">
        Activate your account
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter OTP sent to your email
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <Text ta="center" mb="lg" fw={700}>
          Enter your OTP
        </Text>
        <form onSubmit={handleSubmit}>
          <Stack justify="center" align="center" mt="lg">
            <PinInput
              size="xs"
              length={6}
              onChange={(value) => setOtp(value)}
            />
            <Button type="submit" loading={isLoading}>
              Verify account
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
