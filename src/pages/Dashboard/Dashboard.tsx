import { useEffect, useState } from "react";
import {
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
  Anchor,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import image from "./image.svg";
import classes from "./HeroBullets.module.css";
import { useGet, useDelete } from "@/services/api/useFecth";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>({});
  const data = async () => {
    try {
      const response = await useGet("/user-data");

      setUser(response.data.data);
    } catch (error: any) {
      if (error.response.status === 401) {
        navigate("/");
      }
      setUser(error.response.data.message);
    }
  };

  const signOut = async () => {
    try {
      await useDelete("/signOut");
      navigate("/");
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    data();
  }, []);

  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title order={3}>Selamat datang</Title>
          <Title className={classes.title}>{user.name}</Title>
          <Text c="dimmed" mt="md">
            Project ini menggunakan Mantine sebagai framework UI
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>TypeScript based</b>
            </List.Item>
            <List.Item>
              <b>Free and open source</b>
            </List.Item>
            <List.Item>
              <b>No annoying focus ring</b>
            </List.Item>
          </List>

          <Group mt={30}>
            <Button radius="xl" size="md" className={classes.control}>
              <Anchor c={"white"} href="https://mantine.dev/" target="_blank">
                Get started
              </Anchor>
            </Button>
            <Button
              variant="filled"
              color="red"
              radius="xl"
              size="md"
              onClick={() => {
                signOut();
              }}
            >
              Logout
            </Button>
          </Group>
        </div>
        <Image src={image} className={classes.image} />
      </div>
    </Container>
  );
}
