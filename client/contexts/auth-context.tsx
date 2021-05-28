import { createStandaloneToast } from "@chakra-ui/react";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
  createContext,
} from "react";
import useSWR from "swr";
import { api } from "../services/api";
import { User } from "../types";

type AuthContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User>>;
  setToken: Dispatch<SetStateAction<string>>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>(undefined);

export function AuthProvider(props) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [canFetchProfile, setCanFetchProfile] = useState(false);

  const { data } = useSWR<User>(canFetchProfile && "/users/profile");

  useEffect(() => {
    if (window) {
      const token = window.localStorage.getItem("token");
      setToken(token);

      api.defaults.headers.Authorization = `Bearer ${token}`;

      if (api.defaults.headers.Authorization && token) {
        setCanFetchProfile(true);
      }
    }
  }, [token]);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  const logout = async () => {
    if (window) {
      window.localStorage.removeItem("token");
    }

    setUser(null);
    setToken(null);
    setCanFetchProfile(false);

    delete api.defaults.headers["Authorization"];
    await router.push("/login");
  };

  const onResponse = (response: AxiosResponse): AxiosResponse => {
    // let caller handle response (no need to handle here)
    return response;
  };

  // TODO switch on error messages (-> for default message)
  // JWT expired
  //
  const onResponseError = async (error: AxiosError) => {
    let errorMessage = "Oh no, something went wrong!";

    if (error.response) {
      const errorCode = error.response.data?.code;

      // switch on errors
      // only allow certain error messages
      switch (errorCode) {
        case "SESSION_EXPIRED":
          errorMessage = "Your session expired. Please log in again!";
          await logout();
          break;
      }
    }

    const toast = createStandaloneToast();

    const id = "test-toast";

    if (!toast.isActive(id)) {
      toast({
        id,
        title: errorMessage,

        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    return Promise.reject(error);
  };

  api.interceptors.response.use(onResponse, onResponseError);

  const properties: AuthContextType = {
    user,
    setUser,
    setToken: (token: string) => {
      window.localStorage.setItem("token", token);
      setToken(token);
    },
    logout,
  };

  return <AuthContext.Provider value={properties} {...props} />;
}

export function useAuth() {
  const data = useContext(AuthContext);

  if (!data) {
    throw new Error("AuthProvider is missing");
  }

  return data;
}
