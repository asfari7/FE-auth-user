import "@mantine/core/styles.css";
import "./App.css";
import { MantineProvider } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import { SignIn } from "@/pages/auth/SignIn";
import { ForgotPassword } from "@/pages/auth/ForgotPassword";
import { Activation } from "@/pages/auth/Activation";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";
import { Dashboard } from "@/pages/Dashboard/Dashboard";

function App() {
  return (
    <MantineProvider>
      <Notifications position="top-center" />
      {
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/activation" element={<Activation />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      }
    </MantineProvider>
  );
}

export default App;
