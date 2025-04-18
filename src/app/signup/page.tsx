"use client";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { User, Mail, Lock } from "lucide-react";
import { signup } from "@/actions/signup.actions";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignUpPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("SignUp", values);
    const res = await signup(values);
    console.log()
    if (!res.success) {
      toast.error(res.message || "Error in SignUp");
      return;
    }
    toast.success("SignUp Successfully");
    reset();
    router.push("/signin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-100 to-pink-100">
      <div className="max-w-md w-full px-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-purple-900 mb-4 font-playfair">
              Create Account
            </h1>
            <p className="text-purple-700">
              Join us to start planning your events
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Full Name"
              icon={<User className="h-5 w-5 text-purple-500" />}
              {...register("name")}
              error={errors.name ? { message: errors.name.message } : undefined}
            />

            <Input
              label="Email"
              icon={<Mail className="h-5 w-5 text-purple-500" />}
              {...register("email")}
              error={
                errors.email ? { message: errors.email.message } : undefined
              }
            />

            <Input
              label="Password"
              type="password"
              icon={<Lock className="h-5 w-5 text-purple-500" />}
              {...register("password")}
              error={
                errors.password
                  ? { message: errors.password.message }
                  : undefined
              }
            />

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 text-lg"
            >
              Create Account
            </Button>

            <p className="text-center text-purple-700">
              Already have an account?{" "}
              <a
                href="/signin"
                className="text-purple-600 font-semibold hover:underline"
              >
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
