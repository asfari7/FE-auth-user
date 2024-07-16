import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Anchor,
  Stack,
  Center,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { GoogleButton } from "./GoogleButton";
import { TwitterButton } from "./TwitterButton";
import { usePost } from "@/services/api/useFecth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export function SignIn(props: PaperProps) {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length < 5 ? "Password should include at least 6 characters" : null,
    },
  });

  const handleSubmit = async (data: any) => {
    if (type === "register") {
      //register
      try {
        setLoading(true);
        await usePost("/signUp", data);
        navigate("/activation", { state: { email: data.email } });
      } catch (error: any) {
        return notifications.show({
          title: "Login Failed",
          message: `${error.response.data.message}`,
          color: "red",
          icon: <IconX />,
        });
      } finally {
        setLoading(false);
      }
    } else {
      //login
      try {
        setLoading(true);
        const response: any = await usePost("/signIn", data);
        if (response.status === 200) {
          return navigate("/dashboard");
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          await usePost("/request-otp", { email: data.email });
          return navigate("/activation", { state: { email: data.email } });
        }
        console.error(error.response.data);
        return notifications.show({
          title: "Login Failed",
          message: `${error.response.data.message}`,
          color: "red",
          icon: <IconX />,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Center h={"100vh"}>
      <Paper radius="md" p="xl" w={"350px"} withBorder {...props}>
        <Stack gap="sm" mb="lg">
          <Text size="lg" fw={500}>
            {upperFirst(type)} to your account
          </Text>
          <Text size="sm" c="gray" lineClamp={4}>
            {type === "register"
              ? "buat akun dengan email aktif untuk mendapatkan OTP"
              : "Login to your account"}
          </Text>
        </Stack>

        <form
          onSubmit={form.onSubmit(() => {
            handleSubmit(form.values);
          })}
        >
          <Stack>
            {type === "register" && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue("name", event.currentTarget.value)
                }
                error={form.errors.name}
                radius="md"
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="user@gmail.com"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email}
              radius="md"
            />
            <Stack gap="xs">
              <PasswordInput
                required
                label="Password"
                placeholder="Your password"
                value={form.values.password}
                onChange={(event) =>
                  form.setFieldValue("password", event.currentTarget.value)
                }
                error={form.errors.password}
                radius="md"
              />
              {type === "login" && (
                <Group justify="flex-end">
                  <Link
                    to={"/forgot-password"}
                    style={{ textDecoration: "none" }}
                  >
                    <Anchor component="button" type="button" size="xs">
                      Forgot password?
                    </Anchor>
                  </Link>
                </Group>
              )}
            </Stack>

            {/* {type === "register" && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue("terms", event.currentTarget.checked)
                }
              />
            )} */}
          </Stack>

          <Stack mt="md">
            <Button type="submit" radius="md" loading={isLoading}>
              {upperFirst(type)}
            </Button>
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
          </Stack>
        </form>

        <Divider label="coming soon" labelPosition="center" my="lg" />

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
          <TwitterButton radius="xl">Twitter</TwitterButton>
        </Group>
      </Paper>
    </Center>
  );
}
