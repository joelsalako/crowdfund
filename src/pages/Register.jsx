import { useAuth } from "../context";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, Banner } from "../components";
import { Link } from "react-router-dom";

const validationSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const SignupPage = () => {
  const { registerWithEmailAndPassword } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleSubmission = async (data) => {
    setIsSubmitting(true);
    await registerWithEmailAndPassword(data);
    setIsSubmitting(false);
  };

  return (
    <main>
      <Banner
        caption="Create an Account"
        imageSrc="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
      />

      <section className="container mx-auto mt-10" id="crowdfunds">
        <div className="w-[90vw] md:w-[50vw] lg:w-[40vw] mx-auto shadow-xl my-24 p-10 rounded-md">
          <form onSubmit={handleSubmit(handleSubmission)}>
            <div className="flex flex-col gap-4">
              <Input
                label="Email Address"
                error={errors.email}
                type="email"
                {...register("email", { required: true })}
              />
              <Input
                label="Password"
                type="password"
                name="password"
                error={errors.password}
                {...register("password", { required: true })}
              />

              <Button
                disabled={isSubmitting}
                type="submit"
                className="mt-3 text-center justify-center"
              >
                {isSubmitting ? "Please wait" : "Submit"}
              </Button>
              <p>
                Already have an account? <Link to="/login">Sign in</Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default SignupPage;
