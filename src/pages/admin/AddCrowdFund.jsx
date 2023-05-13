import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, Textarea } from "../../components";
import { useData } from "../../context";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  amountNeeded: yup.string().required("Amount needed is required"),
  roi: yup.string().required("ROI is required"),
  dueDate: yup.date().required("Due date is required"),
  period: yup.string().required("Period is required"),
  description: yup
    .string()
    .required("Description is required")
    .min(250, "Description must be at least 250 characters"),
});

const AddCrowdFund = () => {
  const { saveCrowdfund } = useData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleSubmission = async (data) => {
    setIsSubmitting(true);
    await saveCrowdfund(data); // save the crowdfund to the database
    setIsSubmitting(false);
    navigate("/admin"); // navigate to the crowdfunds page
    toast.success("Crowdfund added successfully");
  };

  return (
    <main>
      <section className="container mx-auto mt-10" id="crowdfunds">
        <div className="w-[90vw] md:w-[50vw] lg:w-[40vw] mx-auto shadow-xl my-24 p-10 rounded-md">
          <form onSubmit={handleSubmit(handleSubmission)}>
            <div className="flex flex-col gap-4">
              <Input
                label="Title"
                error={errors.title}
                {...register("title", { required: true })}
              />
              <Input
                label="Amount Needed"
                type="number"
                name="amountNeeded"
                error={errors.amountNeeded}
                {...register("amountNeeded", { required: true })}
              />
              <Input
                label="ROI (In Percentage)"
                type="number"
                name="roi"
                error={errors.roi}
                {...register("roi", { required: true })}
              />
              <Input
                label="Due Date"
                name="dueDate"
                type="date"
                error={errors.dueDate}
                {...register("dueDate", { required: true })}
              />

              <Input
                label="Period (In Months)"
                name="period"
                type="number"
                error={errors.period}
                {...register("period", { required: true })}
              />
              <Textarea
                label="Description"
                name="description"
                error={errors.description}
                {...register("description", { required: true })}
              />

              <Button
                disabled={isSubmitting}
                type="submit"
                className="text-center justify-center"
              >
                {isSubmitting ? "Please wait" : "Add Crowdfund"}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default AddCrowdFund;
