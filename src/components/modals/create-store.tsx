"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { onClose } from "@/redux/features/modal/modal-slice";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Store name must be at least 2 characters long.",
  }),
});

const CreateStore = () => {
  const isOpen = useAppSelector((state) => state.modal.isOpen);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Create store here
    try {
      setLoading(true);

      const response = await axios.post("/api/stores", values);

      window.location.assign(`/dashboard/${response.data.id}`);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create Store"
      description="There's no store asssociated with your account; please create a store to continue."
      isOpen={isOpen}
      onClose={() => dispatch(onClose())}
    >
      <div className="space-y-4 pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="e.g My Store"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full items-center justify-end space-x-4 pt-6">
              <Button
                type="button"
                disabled={loading}
                variant="outline"
                onClick={() => dispatch(onClose())}
              >
                Cancel
              </Button>
              <Button disabled={loading} type="submit">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
export default CreateStore;
