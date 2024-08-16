import { LoginFormData, loginSchema } from "@/types/schemas/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useLoginForm = () =>
  useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
