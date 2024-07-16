import {
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  rem,
  PasswordInput,
  Stack,
  PinInput,
} from "@mantine/core";
import { IconArrowLeft, IconCheck, IconX } from "@tabler/icons-react";
import classes from "./ForgotPassword.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { usePost, usePut } from "@/services/api/useFecth";

export function ForgotPassword() {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      otp: "",
    },
    validate: {
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
      password: (value: string) =>
        value.length < 5
          ? "Password should include at least  6 characters"
          : null,
      otp: (value: string) =>
        value.length === 6 ? null : "OTP should be 6 characters",
    },
  });

  const sendOTP = async (email: string) => {
    try {
      await usePost("/request-otp", { email });
      return notifications.show({
        title: "OTP sent",
        message: "We have sent you an OTP to your email",
        color: "blue",
        icon: <IconCheck />,
      });
    } catch (error: any) {
      return notifications.show({
        title: "OTP failed",
        message: `${error.response.data.message}`,
        color: "red",
        icon: <IconX />,
      });
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      console.log(data);
      await usePut("/reset-password", data);
      notifications.show({
        title: "Reset password",
        message: "Your password has been reset successfully",
        color: "blue",
        icon: <IconCheck />,
      });
      return navigate("/");
    } catch (error: any) {
      console.log(error.response.data);
      return notifications.show({
        title: "Reset password failed",
        message: `${error.response.data.message}`,
        color: "red",
        icon: <IconX />,
      });
    }
  };

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} ta="center">
        Forgot your password?
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your email, new password, and OTP to reset your password
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <form
          onSubmit={form.onSubmit(() => {
            handleSubmit(form.values);
          })}
        >
          <Stack>
            <TextInput
              label="Your email"
              placeholder="user@gmail.com"
              required
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email}
            />
            <Group justify="flex-end">
              <Anchor
                component="button"
                type="button"
                size="xs"
                onClick={() => {
                  sendOTP(form.values.email);
                }}
              >
                Send OTP
              </Anchor>
            </Group>
            <PasswordInput
              label="New password"
              placeholder="new password"
              required
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={form.errors.password}
            />
            <Text ta="left" fw={500}>
              Enter your OTP
            </Text>
            <PinInput
              type={"number"}
              size="xs"
              length={6}
              onChange={(value) => {
                form.setFieldValue("otp", value);
              }}
            />
          </Stack>
          <Group justify="space-between" mt="lg" className={classes.controls}>
            <Link to={"/"}>
              <Anchor c="dimmed" size="sm" className={classes.control}>
                <Center inline>
                  <IconArrowLeft
                    style={{ width: rem(12), height: rem(12) }}
                    stroke={1.5}
                  />
                  <Box ml={5}>Back to the login page</Box>
                </Center>
              </Anchor>
            </Link>
            <Button type="submit" className={classes.control}>
              Reset password
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
